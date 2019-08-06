import React, { useState, useEffect, useRef, EffectCallback } from "react";
import NotificationMessage from "./NotificationMessage";
import { IMessage } from "../../../interfaces/message";
import styled from "styled-components";
import { useWindowSize } from "../../hooks/useWindowSize";
const uuid = require("uuid");

interface AllNotificationWrapperProps {
  windowHeight: number;
  os: number;
}
const AllNotificationsWrapper = styled.div<AllNotificationWrapperProps>`
  height: 0;
  top: 0px;
  font-size: calc(0.35vw + 16px);
  width: 100%;
  position: absolute;
  z-index: 1000;
`;
interface PropTypes {
  children: React.ReactChild;
}
const Notification: React.FunctionComponent<PropTypes> = (
  props,
): JSX.Element => {
  const [notifications, setNotifications] = useState<IMessage[]>([]);
  const windowSize = useWindowSize();
  const delay = 5000;
  const id = useRef<number[]>([]);
  useEffect((): EffectCallback => {
    return (): void => {
      id.current.forEach(clearTimeout);
    };
  }, []);
  const removeNotification = (notificationId: string): void => {
    setNotifications((prevState): IMessage[] => {
      console.log("Removing Notification");
      return prevState.filter((n): boolean => n.id !== notificationId);
    });
  };
  const pushNotification = (message = "Lol", status: boolean): IMessage => {
    const notification = {
      message,
      success: status,
      id: uuid(),
      delay,
    };
    console.log("Setting up the timer");
    const timerId = setTimeout((): void => {
      console.log("Now removing the notification");
      removeNotification(notification.id);
      id.current.splice(id.current.indexOf(timerId), 1);
    }, delay);
    id.current.push(timerId);
    setNotifications((allNotification): IMessage[] =>
      allNotification.concat(notification),
    );
    return notification;
  };

  const children = React.Children.map(
    props.children,
    (child): React.ReactElement => {
      return React.cloneElement(child, {
        pushNotification,
        removeNotification,
      });
    },
  );
  if (notifications) {
    return (
      <React.Fragment>
        <AllNotificationsWrapper
          windowHeight={windowSize.size.windowHeight}
          os={notifications.length * 54}
        >
          {notifications.map(
            (notification: IMessage): React.ReactElement => {
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
            },
          )}
        </AllNotificationsWrapper>
        {children}
      </React.Fragment>
    );
  } else {
    return <React.Fragment>{children}</React.Fragment>;
  }
};

export default React.memo(Notification);
