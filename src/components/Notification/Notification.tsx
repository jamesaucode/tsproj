import React, { useState, useEffect, useRef, useMemo } from "react";
import NotificationMessage from "./NotificationMessage";
import { MessageType } from "../../../typings/message";
import styled from "styled-components";
import { useWindowSize } from "../../hooks/useWindowSize";
const uuid = require("uuid");

interface AllNotificationWrapperProps {
  windowHeight: number;
  os: number;
}
const AllNotificationsWrapper = styled.div<AllNotificationWrapperProps>`
  height: 0;
  top: ${({ windowHeight, os }) =>
    "calc(" + windowHeight + "px" + " - " + os + "px)"};
  left: 50%; /* position the left edge of the element at the middle of the parent */
  transform: translate(-50%, -50%);
  font-size: calc(0.35vw + 16px);
  width: fit-content;
  position: absolute;
  z-index: 1000;
`;
const Notification = (props: any) => {
  const [notifications, setNotifications] = useState<MessageType[]>([]);
  const windowSize = useWindowSize();
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
      delay
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
      removeNotification
    });
  });
  if (notifications) {
    return (
      <React.Fragment>
        <AllNotificationsWrapper
          windowHeight={windowSize.size.windowHeight}
          os={notifications.length * 54}
        >
          {notifications.map((notification: MessageType) => {
            return (
              <NotificationMessage
                key={notification.id}
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
