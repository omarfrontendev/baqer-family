/* eslint-disable no-undef */
// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDi80ddjmq0ineWLqyk7q4NyiAm6ask2iM",
  authDomain: "familyapp-24bc7.firebaseapp.com",
  projectId: "familyapp-24bc7",
  storageBucket: "familyapp-24bc7.appspot.com",
  messagingSenderId: "732378295296",
  appId: "1:732378295296:web:1efe55ef72256d7d973ce5",
  measurementId: "G-Y3FJKRMSBH",
  databaseURL: "https://familyapp-24bc7-default-rtdb.firebaseio.com/",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload?.notification?.title;
  const notificationOptions = {
    body: payload?.notification?.body,
    icon: payload?.notification?.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});