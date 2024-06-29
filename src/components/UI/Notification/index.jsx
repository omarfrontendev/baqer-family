import React, { 
  // useContext,
   useEffect,
    // useState
   } from "react";
import { onMessageListener } from "../../../firebase";
import { toast } from "react-toastify";
// import { ModalContext } from "../../../context/ModalContext";
// import Popup from "../Popup";

const Notification = () => {

  // const { setIdModal, idModal } = useContext(ModalContext);
  // const [notification, setNotification] = useState(null);

  useEffect(() => {
    onMessageListener()
      .then((payload) => {
        toast.success(`${payload?.notification?.title}: ${payload?.notification?.body}`)
        // setNotification(payload?.notification);
        // if(payload?.notification?.title) {
        //   setIdModal("show-notification")
        // }
      })
      .catch((err) => console.log("Failed: ", err));
  }, []);


  return (
    <>
      {/* {idModal === "show-notification" && (
        <Popup>
          <h4>{notification?.title}</h4>
          <p>{notification?.body}</p>
        </Popup>
      )} */}
    </>
  );
};

export default Notification;
