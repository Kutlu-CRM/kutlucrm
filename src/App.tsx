import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { MeetingsList } from './components/MeetingsList';
import { NewMeetingForm } from './components/NewMeetingForm';
import { MeetingDetail } from './components/MeetingDetail';

export interface Contact {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
}

export interface Meeting {
  id: string;
  companyName: string;
  date: string;
  contacts: Contact[];
  ourAttendees: string;
  content: string;
  proposalGiven: boolean;
  proposalRejectionReason?: string;
  followUpDone: boolean;
  createdAt: string;
}

type View = 'list' | 'new' | 'detail';

function App() {
  const [currentView, setCurrentView] = useState<View>('list');
  const [selectedMeetingId, setSelectedMeetingId] = useState<string | null>(null);
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: '1',
      companyName: 'Delta Endüstri Ürünleri',
      date: '2025-11-28',
      contacts: [
        {
          id: '1',
          name: 'Zeynep Şahin',
          title: 'Genel Müdür',
          phone: '+90 532 111 2233',
          email: 'zeynep@delta.com'
        },
        {
          id: '2',
          name: 'Murat Arslan',
          title: 'Satın Alma Müdürü',
          phone: '+90 532 444 5566',
          email: 'murat@delta.com'
        }
      ],
      ourAttendees: 'Ahmet Yılmaz, Ayşe Kaya',
      content: 'Mevcut makinelerin bakım ve yedek parça desteği konusunda görüşme yapıldı. Aynelik işleme makinesi için teknik destek talebi.',
      proposalGiven: false,
      followUpDone: false,
      createdAt: '2025-11-28'
    },
    {
      id: '2',
      companyName: 'XYZ Metal İşleme A.Ş.',
      date: '2025-11-25',
      contacts: [
        {
          id: '3',
          name: 'Ahmet Kaya',
          title: 'Üretim Müdürü',
          phone: '+90 532 777 8899',
          email: 'ahmet@xyzmetal.com'
        }
      ],
      ourAttendees: 'Mehmet Demir',
      content: 'Yeni açılacak olan tesisleri için kapsamlı makine parkuru ihtiyaçları değerlendirildi.',
      proposalGiven: true,
      followUpDone: false,
      createdAt: '2025-11-25'
    },
    {
      id: '3',
      companyName: 'ABC Makine San. Tic. Ltd. Şti.',
      date: '2025-11-20',
      contacts: [
        {
          id: '4',
          name: 'Ahmet Kaya',
          title: 'Genel Müdür',
          phone: '+90 532 123 4567',
          email: 'ahmet@abcmakine.com'
        },
        {
          id: '5',
          name: 'Zeynep Şahin',
          title: 'Teknik Müdür',
          phone: '+90 532 987 6543',
          email: 'zeynep@abcmakine.com'
        }
      ],
      ourAttendees: 'Mehmet Yıldız, Can Öztürk',
      content: 'CNC torna makinesi ihtiyaçları hakkında detaylı görüşme yapıldı. Şirket mevcut 3 farklı tedarikçiden de teklif almış durumda.',
      proposalGiven: true,
      followUpDone: true,
      createdAt: '2025-11-20'
    }
  ]);

  const handleNewMeeting = () => {
    setCurrentView('new');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedMeetingId(null);
  };

  const handleSaveMeeting = (meeting: Omit<Meeting, 'id' | 'createdAt'>) => {
    const newMeeting: Meeting = {
      ...meeting,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setMeetings([newMeeting, ...meetings]);
    setCurrentView('list');
  };

  const handleViewDetail = (meetingId: string) => {
    setSelectedMeetingId(meetingId);
    setCurrentView('detail');
  };

  const handleUpdateMeeting = (updatedMeeting: Meeting) => {
    setMeetings(meetings.map(m => m.id === updatedMeeting.id ? updatedMeeting : m));
    setCurrentView('list');
  };

  const handleDeleteMeeting = (meetingId: string) => {
    setMeetings(meetings.filter(m => m.id !== meetingId));
    setCurrentView('list');
  };

  const selectedMeeting = meetings.find(m => m.id === selectedMeetingId);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        currentView={currentView} 
        onNewMeeting={handleNewMeeting}
        onHome={handleBackToList}
      />
      <main className="flex-1 overflow-y-auto">
        {currentView === 'list' && (
          <MeetingsList 
            meetings={meetings} 
            onViewDetail={handleViewDetail}
          />
        )}
        {currentView === 'new' && (
          <NewMeetingForm 
            onSave={handleSaveMeeting}
            onCancel={handleBackToList}
          />
        )}
        {currentView === 'detail' && selectedMeeting && (
          <MeetingDetail 
            meeting={selectedMeeting}
            onBack={handleBackToList}
            onUpdate={handleUpdateMeeting}
            onDelete={handleDeleteMeeting}
          />
        )}
      </main>
    </div>
  );
}

export default App;
