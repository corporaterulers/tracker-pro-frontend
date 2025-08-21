import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyATMiR8CS4AnakWH1OiEgTAerz_3enZlI0",
  authDomain: "tasktrackerapp-53ff4.firebaseapp.com",
  projectId: "tasktrackerapp-53ff4",
  storageBucket: "tasktrackerapp-53ff4.appspot.com",
  messagingSenderId: "81679096125",
  appId: "1:81679096125:web:2226e278e5d7ce6944cd54",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const enableNotifications = async (email: String) => {
  if (!email) {
    console.error("No email found — cannot send token.");
    return;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("Notification permission denied");
      return;
    }

    const token = await getToken(messaging, {
      vapidKey: "BMyHEmzxmISlozljwBjB0hO8YcaQA-i-ez1LoFi4Ge77NRtL1JGpZ8odDvzOlallomkH9qoo-EGYhH3HovinTwc",
    });

    if (!token) {
      console.warn("No registration token available");
      return;
    }

    console.log("FCM Token:", token);

    await axios.post("http://localhost:8080/api/users/update-token", {
      email,
      fcmToken: token,
    });

    console.log("Token sent to backend successfully");
  } catch (err) {
    console.error(" Error getting/sending token:", err);
  }
};
