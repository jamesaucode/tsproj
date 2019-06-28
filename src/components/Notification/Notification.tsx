import React, { useState, useEffect, useRef, useMemo } from "react";
import NotificationMessage from "./NotificationMessage";
import { MessageType } from "../../../typings/message";
import styled from "styled-components";

const uuid = require("uuid");

const AllNotificationsWrapper = styled.div`
  height: 0; // Hacky ?
  top: 20px;
  position: sticky;
  z-index:10;
`;
const Notification = (props: any) => {
  const [notifications, setNotifications] = useState<MessageType[]>([]);
  const delay = 5000;
  const id = useRef<number[]>([]);
  useEffect(() => {
    return () => {
      id.current.forEach(clearTimeout);
    };
  }, []);
  const removeNotification = (notificationId: string) => {
    setNotifications(prevState => {
      console.log("Removing Notification");
      return prevState.filter(n => n.id !== notificationId);
    });
  };
  const pushNotification = (message = "Lol", status: boolean) => {
    const notification = {
      message,
      success: status,
      id: uuid(),
      delay,
    };
    console.log("Setting up the timer");
    const timerId = setTimeout(() => {
      console.log("Now removing the notification");
      removeNotification(notification.id);
      id.current.splice(id.current.indexOf(timerId), 1);
    }, delay);
    id.current.push(timerId);
    setNotifications(allNotification => allNotification.concat(notification));
    return notification;
  };

  const children = React.Children.map(props.children, child => {
    return React.cloneElement(child, {
      pushNotification,
      removeNotification,
    });
  });
  if (notifications) {
    return (
      <React.Fragment>
        <AllNotificationsWrapper>
          {notifications.map((notification: MessageType) => {
            return (
              <NotificationMessage
                message={notification.message}
                success={notification.success}
                id={notification.id}
                delay={notification.delay}
                removeNotification={removeNotification}
              />
            );
          })}
        </AllNotificationsWrapper>
        {children}
      </React.Fragment>
    );
  } else {
    return <React.Fragment>{children}</React.Fragment>;
  }
};

export default React.memo(Notification);
