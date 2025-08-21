if (Notification.permission !== "granted" && Notification.permission !== "denied") {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      getFCMToken();
    } else {
      console.log("Notification permission not granted");
    }
  });
}
