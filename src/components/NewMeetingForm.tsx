import { useState } from 'react';
import { Plus, X, ArrowLeft } from 'lucide-react';
import type { Meeting, Contact } from '../App';

interface NewMeetingFormProps {
  onSave: (meeting: Omit<Meeting, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  initialData?: Meeting;
}

export function NewMeetingForm({ onSave, onCancel, initialData }: NewMeetingFormProps) {
  const [companyName, setCompanyName] = useState(initialData?.companyName || '');
  const [date, setDate] = useState(initialData?.date || '');
  const [ourAttendees, setOurAttendees] = useState(initialData?.ourAttendees || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [proposalGiven, setProposalGiven] = useState(initialData?.proposalGiven || false);
  const [proposalRejectionReason, setProposalRejectionReason] = useState(initialData?.proposalRejectionReason || '');
  const [followUpDone, setFollowUpDone] = useState(initialData?.followUpDone || false);
  const [contacts, setContacts] = useState<Contact[]>(initialData?.contacts || [
    { id: Date.now().toString(), name: '', title: '', phone: '', email: '' }
  ]);

  const addContact = () => {
    setContacts([...contacts, { id: Date.now().toString(), name: '', title: '', phone: '', email: '' }]);
  };

  const removeContact = (id: string) => {
    if (contacts.length > 1) {
      setContacts(contacts.filter(c => c.id !== id));
    }
  };

  const updateContact = (id: string, field: keyof Contact, value: string) => {
    setContacts(contacts.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const meeting: Omit<Meeting, 'id' | 'createdAt'> = {
      companyName,
      date,
      contacts: contacts.filter(c => c.name.trim() !== ''),
      ourAttendees,
      content,
      proposalGiven,
      proposalRejectionReason: proposalGiven ? proposalRejectionReason : undefined,
      followUpDone
    };

    onSave(meeting);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={20} />
          <span>Geri Dön</span>
        </button>
        
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.89 20.11 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="#4F46E5"/>
            </svg>
          </div>
          <div>
            <h1>{initialData ? 'Görüşmeyi Düzenle' : 'Yeni Görüşme Kaydı'}</h1>
            <p className="text-gray-600">Müşteri görüşme bilgilerini kaydedin</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">Şirket Bilgileri</h2>
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Ziyaret Edilen Şirket <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Şirket adını girin"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
            />
          </div>
        </div>

        {/* Contacted Officials */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900">Görüşülen Yetkililer</h2>
            <button
              type="button"
              onClick={addContact}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              <Plus size={16} />
              Yetkili Ekle
            </button>
          </div>

          <div className="space-y-4">
            {contacts.map((contact, index) => (
              <div key={contact.id} className="relative">
                {contacts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeContact(contact.id)}
                    className="absolute -top-2 -right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors z-10"
                  >
                    <X size={16} />
                  </button>
                )}
                
                <div className="grid grid-cols-2 gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">İsim Soyisim</label>
                    <input
                      type="text"
                      value={contact.name}
                      onChange={(e) => updateContact(contact.id, 'name', e.target.value)}
                      placeholder="Yetkili adı"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Ünvan</label>
                    <input
                      type="text"
                      value={contact.title}
                      onChange={(e) => updateContact(contact.id, 'title', e.target.value)}
                      placeholder="Görev ünvanı"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Telefon</label>
                    <input
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => updateContact(contact.id, 'phone', e.target.value)}
                      placeholder="Telefon numarası"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">E-posta</label>
                    <input
                      type="email"
                      value={contact.email}
                      onChange={(e) => updateContact(contact.id, 'email', e.target.value)}
                      placeholder="E-posta adresi"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Meeting Details */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">Görüşme Detayları</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Toplantı Tarihi <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="gg.aa.yyyy"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Bizden Katılanlar <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={ourAttendees}
                onChange={(e) => setOurAttendees(e.target.value)}
                placeholder="Örn: Ahmet Yılmaz, Ayşe Kaya"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Görüşme İçeriği <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Görüşmede neler konuşuldu, hangi konular ele alındı..."
              rows={5}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 resize-none"
            />
          </div>
        </div>

        {/* Proposal Status */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">Teklif Durumu</h2>
          
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={proposalGiven}
              onChange={(e) => setProposalGiven(e.target.checked)}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span className="text-gray-700">Teklif verildi</span>
          </label>

          {proposalGiven && (
            <div className="mt-4">
              <label className="block text-sm text-gray-700 mb-2">
                İş Alınamadıysa Sebebi
              </label>
              <textarea
                value={proposalRejectionReason}
                onChange={(e) => setProposalRejectionReason(e.target.value)}
                placeholder="Teklifin kabul edilmeme sebebini açıklayın..."
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 resize-none"
              />
            </div>
          )}
        </div>

        {/* Follow-up Status */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">Takip Durumu</h2>
          
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={followUpDone}
              onChange={(e) => setFollowUpDone(e.target.checked)}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span className="text-gray-700">Firma ile tekrar temasa geçildi</span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            İptal
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M17 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3ZM12 19C10.34 19 9 17.66 9 16C9 14.34 10.34 13 12 13C13.66 13 15 14.34 15 16C15 17.66 13.66 19 12 19ZM15 9H5V5H15V9Z" fill="currentColor"/>
            </svg>
            Görüşmeyi Kaydet
          </button>
        </div>
      </form>
    </div>
  );
}
