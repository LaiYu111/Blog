import { useState, useEffect } from 'react';
import {NOTIFICATION} from "@/config.js";

const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = (message, type = NOTIFICATION.INFORMATION) => {
    const id = Date.now();
    setNotifications([...notifications, { message, type, id }]);
  };

  const hideNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  useEffect(() => {
    const timers = notifications.map(notification =>
      setTimeout(() => {
        hideNotification(notification.id);
      }, 1000000)
    );

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [notifications]);

  return { notifications, showNotification, hideNotification };
};

export default useNotification;
