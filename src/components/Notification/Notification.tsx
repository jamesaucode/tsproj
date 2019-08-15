import React, { useState, useEffect, useRef, EffectCallback } from "react";
import NotificationMessage from "./NotificationMessage";
import { IMessage } from "../../../interfaces/message";
import styled from "styled-components";
import { useWindowSize } from "../../hooks/useWindowSize";
import uuid from "uuid";

interface PropTypes {
  children: React.ReactChild;
}

interface AllNotificationWrapperProps {
  windowHeight: number;
  os: number;
}

interface NotificationContextProps {
  pushNotification: (message: string, success: boolean) => void;
  removeNotification: (message: string, success: boolean) => void;
}
const AllNotificationsWrapper = styled.div<AllNotificationWrapperProps>`
  height: 0;
  top: 0px;
  font-size: calc(0.35vw + 16px);
  width: 100%;
  position: absolute;
  z-index: 1000;
`;
const NotificationContext = React.createContext<NotificationContextProps | null>(
  null,
);
export const NotificationProvider: React.FunctionComponent<PropTypes> = ({
  children,
}): JSX.Element => {
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
      return prevState.filter((n): boolean => n.id !== notificationId);
    });
  };
  const pushNotification = (message = "", status: boolean): IMessage => {
    const notification = {
      message,
      success: status,
      id: uuid(),
      delay,
    };
    const timerId = setTimeout((): void => {
      removeNotification(notification.id);
      id.current.splice(id.current.indexOf(timerId), 1);
    }, delay);
    id.current.push(timerId);
    setNotifications((allNotification): IMessage[] =>
      allNotification.concat(notification),
    );
    return notification;
  };

  const value = {
    pushNotification,
    removeNotification,
  };
  if (notifications) {
    return (
      <NotificationContext.Provider value={value}>
        <AllNotificationsWrapper
          windowHeight={windowSize.size.windowHeight}
          os={notifications.length * 54}
        >
          {notifications.map(
            (notification: IMessage): React.ReactElement => {
              return (
                <NotificationMessage
                  key={notification.id}
                  {...notification}
                  removeNotification={removeNotification}
                />
              );
            },
          )}
        </AllNotificationsWrapper>
        {children}
      </NotificationContext.Provider>
    );
  } else {
    return <React.Fragment>{children}</React.Fragment>;
  }
};

export const useNotification = (): NotificationContextProps =>
  React.useContext(NotificationContext);
