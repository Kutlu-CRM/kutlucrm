import { useState } from 'react';
import { ArrowLeft, Edit2, Trash2, Building2, Calendar, Users, FileText, CheckCircle2, XCircle } from 'lucide-react';
import { NewMeetingForm } from './NewMeetingForm';
import type { Meeting } from '../App';

interface MeetingDetailProps {
  meeting: Meeting;
  onBack: () => void;
  onUpdate: (meeting: Meeting) => void;
  onDelete: (meetingId: string) => void;
}

export function MeetingDetail({ meeting, onBack, onUpdate, onDelete }: MeetingDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const handleUpdate = (updatedMeeting: Omit<Meeting, 'id' | 'createdAt'>) => {
    onUpdate({
      ...updatedMeeting,
      id: meeting.id,
      createdAt: meeting.createdAt
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(meeting.id);
  };

  if (isEditing) {
    return (
      <NewMeetingForm
        initialData={meeting}
        onSave={handleUpdate}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={20} />
          <span>Görüşme Listesine Dön</span>
        </button>
        
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Building2 size={24} className="text-indigo-600" />
            </div>
            <div>
              <h1>{meeting.companyName}</h1>
              <p className="text-gray-600">{formatDate(meeting.date)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Edit2 size={18} />
              Düzenle
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 text-red-600 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
            >
              <Trash2 size={18} />
              Sil
            </button>
          </div>
        </div>
      </div>

      {/* Status Badges */}
      <div className="flex gap-2 mb-6">
        {meeting.proposalGiven && (
          <span className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg flex items-center gap-2">
            <CheckCircle2 size={18} />
            Teklif Verildi
          </span>
        )}
        {meeting.followUpDone && (
          <span className="px-4 py-2 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
            <CheckCircle2 size={18} />
            Takip Yapıldı
          </span>
        )}
        {!meeting.proposalGiven && (
          <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg flex items-center gap-2">
            <XCircle size={18} />
            Teklif Verilmedi
          </span>
        )}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Meeting Details */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={20} className="text-indigo-600" />
            <h2 className="text-gray-900">Görüşme Bilgileri</h2>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-gray-500 mb-1">Toplantı Tarihi</div>
              <div className="text-gray-900">{formatDate(meeting.date)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Kayıt Tarihi</div>
              <div className="text-gray-900">{formatDate(meeting.createdAt)}</div>
            </div>
          </div>
        </div>

        {/* Contacted Officials */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users size={20} className="text-indigo-600" />
            <h2 className="text-gray-900">Görüşülen Yetkililer</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {meeting.contacts.map((contact) => (
              <div key={contact.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="font-medium text-gray-900 mb-1">{contact.name}</div>
                <div className="text-sm text-gray-600 mb-3">{contact.title}</div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-600">📞 {contact.phone}</div>
                  <div className="text-sm text-gray-600">✉️ {contact.email}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Attendees */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users size={20} className="text-indigo-600" />
            <h2 className="text-gray-900">Şirketimizden Katılanlar</h2>
          </div>
          <div className="text-gray-900">{meeting.ourAttendees}</div>
        </div>

        {/* Meeting Content */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={20} className="text-indigo-600" />
            <h2 className="text-gray-900">Görüşme İçeriği</h2>
          </div>
          <div className="text-gray-700 whitespace-pre-wrap">{meeting.content}</div>
        </div>

        {/* Proposal Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">Teklif ve Takip Durumu</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              {meeting.proposalGiven ? (
                <CheckCircle2 size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle size={20} className="text-gray-400 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <div className="font-medium text-gray-900">
                  {meeting.proposalGiven ? 'Teklif Verildi' : 'Teklif Verilmedi'}
                </div>
                {meeting.proposalGiven && meeting.proposalRejectionReason && (
                  <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="text-sm text-amber-900 font-medium mb-1">Red Sebebi</div>
                    <div className="text-sm text-amber-800">{meeting.proposalRejectionReason}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              {meeting.followUpDone ? (
                <CheckCircle2 size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle size={20} className="text-gray-400 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <div className="font-medium text-gray-900">
                  {meeting.followUpDone ? 'Firma ile Tekrar Temasa Geçildi' : 'Takip Yapılmadı'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-gray-900 mb-2">Görüşmeyi Sil</h3>
            <p className="text-gray-600 mb-6">
              Bu görüşme kaydını silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Evet, Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
