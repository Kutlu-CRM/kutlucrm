import { useState } from 'react';
import { Search, Users, FileText, ChevronDown } from 'lucide-react';
import type { Meeting } from '../App';

interface MeetingsListProps {
  meetings: Meeting[];
  onViewDetail: (meetingId: string) => void;
}

export function MeetingsList({ meetings, onViewDetail }: MeetingsListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedMeetings, setExpandedMeetings] = useState<Set<string>>(new Set());

  const filteredMeetings = meetings.filter(meeting =>
    meeting.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    meeting.contacts.some(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    meeting.ourAttendees.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = (meetingId: string) => {
    const newExpanded = new Set(expandedMeetings);
    if (newExpanded.has(meetingId)) {
      newExpanded.delete(meetingId);
    } else {
      newExpanded.add(meetingId);
    }
    setExpandedMeetings(newExpanded);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.89 20.11 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="#4F46E5"/>
            </svg>
          </div>
          <div>
            <h1>Tüm Görüşmeler</h1>
            <p className="text-gray-600">Toplam {filteredMeetings.length} görüşme kaydı</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Şirket, yetkili veya katılımcı ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Meetings List */}
      <div className="space-y-4">
        {filteredMeetings.map((meeting) => {
          const isExpanded = expandedMeetings.has(meeting.id);
          
          return (
            <div
              key={meeting.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M19 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.89 20.11 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="#4F46E5"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900 mb-1">{meeting.companyName}</h3>
                      <div className="text-sm text-gray-500">
                        {formatDate(meeting.date)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {meeting.proposalGiven && (
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
                        Teklif Verildi
                      </span>
                    )}
                    {meeting.followUpDone && (
                      <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                        Takip Yapıldı
                      </span>
                    )}
                    <button
                      onClick={() => toggleExpand(meeting.id)}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ChevronDown 
                        size={20} 
                        className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </div>
                </div>

                {/* Participants */}
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <Users size={16} className="mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Katılımcılar:</span>{' '}
                    {meeting.contacts.map(c => c.name).join(', ')}
                  </span>
                </div>

                {/* Content Preview */}
                <div className="flex items-start gap-2 text-sm text-gray-600 mt-2">
                  <FileText size={16} className="mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-2">{meeting.content}</span>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="border-t border-gray-100 bg-gray-50 p-5">
                  <div className="grid grid-cols-2 gap-6 mb-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-2">Görüşülen Yetkililer</div>
                      <div className="space-y-3">
                        {meeting.contacts.map(contact => (
                          <div key={contact.id} className="bg-white p-3 rounded-lg border border-gray-200">
                            <div className="font-medium text-gray-900">{contact.name}</div>
                            <div className="text-sm text-gray-600">{contact.title}</div>
                            <div className="text-sm text-gray-600 mt-1">{contact.phone}</div>
                            <div className="text-sm text-gray-600">{contact.email}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-2">Şirketimizden Katılanlar</div>
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        {meeting.ourAttendees}
                      </div>
                      
                      {meeting.proposalRejectionReason && (
                        <>
                          <div className="text-sm text-gray-500 mb-2 mt-4">Red Sebebi</div>
                          <div className="bg-white p-3 rounded-lg border border-gray-200">
                            {meeting.proposalRejectionReason}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 mb-2">Görüşme İçeriği</div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200 mb-4">
                    {meeting.content}
                  </div>

                  <button
                    onClick={() => onViewDetail(meeting.id)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Detaylı Görüntüle / Düzenle
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {filteredMeetings.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <FileText size={48} className="mx-auto mb-4 text-gray-300" />
            <p>Görüşme kaydı bulunamadı</p>
          </div>
        )}
      </div>
    </div>
  );
}
