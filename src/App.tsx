// src/App.tsx

import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskTable from './components/TaskTable';
import { enableNotifications } from './firebase';
import { getMessaging, onMessage } from 'firebase/messaging';

const messaging = getMessaging();

function App(): React.ReactElement {
  const [refresh, setRefresh] = useState(false);

  function handleTaskAdded(): void {
    setRefresh(prev => !prev); 
  }

  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log('📨 Message received: ', payload);
      const { title, body } = payload.notification || {};

      if (Notification.permission === 'granted') {
        new Notification(title || 'Task Reminder', {
          body: body || 'You have a task due soon!',
        });
      }
    });
  }, []);
  const [email, setEmail] = useState("");

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Welcome To Task Tracker Pro</h1>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: '8px', width: '250px' }}
      />
      <button
  onClick={() => enableNotifications(email)}
  style={{ padding: '8px', marginLeft: '8px' }}
>
  Enable Notifications
</button>

    </div>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskTable refresh={refresh} />
    </div>
  );
}

export default App;
