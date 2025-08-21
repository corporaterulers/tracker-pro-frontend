importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyATMiR8CS4AnakWH1OiEgTAerz_3enZlI0",
  authDomain: "tasktrackerapp-53ff4.firebaseapp.com",
  projectId: "tasktrackerapp-53ff4",
  storageBucket: "tasktrackerapp-53ff4.appspot.com",
  messagingSenderId: "81679096125",
  appId: "1:81679096125:web:2226e278e5d7ce6944cd54"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Background message received:', payload);

  const notificationTitle = payload.notification?.title || 'Task Reminder';
  const notificationOptions = {
    body: payload.notification?.body || 'A task is due soon!',
    icon: '/save-earth.jpg',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('http://localhost:5173')
  );
});
