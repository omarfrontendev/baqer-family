import React, { useEffect } from "react";
import { onMessageListener, requestPermission } from "../../../firebase";
import { toast } from "react-toastify";

const Notification = () => {

  useEffect(() => {
    requestPermission();
    onMessageListener()
      .then((payload) => {
        console.log("Message received. ", payload);
        toast.success(
          `${payload.notification.title}: ${payload.notification.body}`
        );
      })
      .catch((err) => console.log("Failed: ", err));
  }, []);


  return <div></div>;
};

export default Notification;
