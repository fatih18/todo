import PushNotification from 'react-native-push-notification';

const showNotification = (id, title, message) => {
  PushNotification.localNotification({
    id: 123,
    title,
    message,
  });
};

const handleScheduleNotification = (title, message) => {
  PushNotification.localNotificationSchedule({
    id: 123,
    title,
    message,
    date: new Date(Date.now() + 3 * 1000),
  });
};

export {showNotification, handleScheduleNotification};
