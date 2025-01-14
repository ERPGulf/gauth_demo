// src/components/Notification.tsx
import { useEffect } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase";
import { toast, Toaster } from "sonner";

const Notification = () => {
  useEffect(() => {
    console.log("useEffect triggered");

    if (window.Notification) {
      console.log(
        "Notification permission status:",
        window.Notification.permission,
      );

      if (window.Notification.permission === "granted") {
        console.log("Requesting Firebase Cloud Messaging Token...");

        getToken(messaging, { vapidKey: import.meta.env.VITE_APP_VAPID_KEY })
          .then((currentToken) => {
            if (currentToken) {
              console.log("FCM Token:", currentToken);
            } else {
              console.log("No registration token available.");
              toast("No registration token available.");
            }
          })
          .catch((err) => {
            console.error("An error occurred while retrieving token:", err);
            toast.error(`Error retrieving token: ${err.message}`);
          });
      }

      // Listen for foreground messages
      onMessage(messaging, (payload) => {
        // Display the message body in a toast
        if (payload.notification) {
          toast(`New message: ${payload.notification.body}`);
        }
      });
    } else {
      console.log("Browser doesn't support notifications.");
      toast("Browser doesn't support notifications.");
    }
  }, []);

  return (
    <div>
      <Toaster />
    </div>
  );
};

export default Notification;
