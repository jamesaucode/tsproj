import React, { useState, useEffect, useRef } from "react";
import NotificationMessage from "./NotificationMessage";
import { MessageType } from "../../../typings/message";

const uuid = require('uuid');

const Notification = (props: any) => {
    const [notifications, setNotifications] = useState<MessageType[]>([]);
    const id = useRef<number[]>([]);
    useEffect(() => {
      return () => {
        id.current.forEach(clearTimeout);
      }
    }, []);
    const removeNotification = (notification: MessageType) => {
      setNotifications(prevState => {
        console.log("Removing Notification")
        return prevState.filter(n => n.id !== notification.id);
      })
    }
    const pushNotification = (message  = "Lol", status: boolean) => {
        const notification = {
          message,
          success: status,
          id: uuid()
        }
        console.log("Setting up the timer");
        const timerId = setTimeout(() => {
          console.log('Now removing the notification')
          removeNotification(notification);
          id.current.splice(id.current.indexOf(timerId), 1);
        }, 3000);
        id.current.push(timerId);
        setNotifications(allNotification => allNotification.concat(notification))
        return notification;
    }

  const children = React.Children.map(props.children, child => {
      return React.cloneElement(child, {
          pushNotification,
          removeNotification 
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
              id={notification.id}
            />
          );
        })}
        <button onClick={() => { pushNotification("HAHAHAHAHAH", true)}}>Test Button</button>
        {children}
      </React.Fragment>
    );
  } else {
    return <React.Fragment>{children}</React.Fragment>;
  }
};

export default React.memo(Notification);
