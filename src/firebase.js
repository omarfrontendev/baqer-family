// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);

export const requestPermission = async () => {
  console.log("Requesting permission...");
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    console.log("Notification permission granted.");
    try {
      const token = await getToken(messaging, {
        vapidKey:
          "BAzW0F8tBvVH1FgdKhDfaPOI_Bq_VgDxJmCM9REgNdBleltpBGbV0Mbh46UYVxtgeVJBThUyF6toZ43zsxpR8Zs",
      });
      console.log("FCM Token:", token);
      return token;
    } catch (error) {
      console.error("Error getting FCM token", error);
    }
  } else {
    console.log("Notification permission denied.");
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log(payload)
      resolve(payload);
    });
  });
  
