import React, { useState, useEffect, useRef } from "react";
import NotificationMessage from "./NotificationMessage";
import { MessageType } from "../../typings/message";

const Notification = (props: any) => {
    const [notifications, setNotifications] = useState();
    const popNotification = () => {
        setNotifications(notifications.slice(0, -1));
    }
    const pushNotification = (message  = "lmaooooo", status: boolean) => {
        setNotifications(notifications.concat({
            message,
            success: status
        }))
    }

  const children = React.Children.map(props.children, child => {
      return React.cloneElement(child, {
          popNotification,
          pushNotification 
      })
  })
  if (notifications) {
    return (
      <React.Fragment>
        {notifications.map((notification: MessageType) => {
          return (
            <NotificationMessage
              message={notification.message}
              success={notification.success}
            />
          );
        })}
        {children}
      </React.Fragment>
    );
  } else {
    return <button onClick={popNotification}>Test Button</button>;
  }
};

export default React.memo(Notification);
