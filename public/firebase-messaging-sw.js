// public/firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDi80ddjmq0ineWLqyk7q4NyiAm6ask2iM",
  authDomain: "familyapp-24bc7.firebaseapp.com",
  projectId: "familyapp-24bc7",
  storageBucket: "familyapp-24bc7.appspot.com",
  messagingSenderId: "732378295296",
  appId: "1:732378295296:web:1efe55ef72256d7d973ce5",
  measurementId: "G-Y3FJKRMSBH",
  databaseURL: "https://familyapp-24bc7-default-rtdb.firebaseio.com/",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  // const notificationTitle = payload.notification.title;
  // const notificationOptions = {
  //   body: payload.notification.body,
  //   icon: "/firebase-logo.png",
  // };

  // self.registration.showNotification(notificationTitle, notificationOptions);
});