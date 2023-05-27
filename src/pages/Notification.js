import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../components/UserContext';
import { NotificationContext } from '../components/NotificationContext';
import { useStore } from "../components/StoreContext";
import helpTranslations from '../translations/help';
import { LanguageContext } from '../components/LanguageContext';

export function Notification() {
  const [notifications, setNotifications] = useState([]);
  const { userPhone } = useContext(UserContext);
  const { unreadCount, setUnreadCount } = useContext(NotificationContext);
  const { store } = useStore();
  const { language } = useContext(LanguageContext);
  const translations = helpTranslations[language];


  useEffect(() => {
    const storedNotifications = JSON.parse(localStorage.getItem('notifications'));
    if (storedNotifications && storedNotifications.length > 0) {
      setNotifications(storedNotifications);
      // Update the count of unread notifications
      const updatedUnreadCount = storedNotifications.filter(notification => !notification.read).length;
      setUnreadCount(updatedUnreadCount);
      localStorage.setItem('unreadNotificationsCount', updatedUnreadCount);
    } else {
      fetch(`http://localhost:8080/notifications?userPhone=${userPhone}`)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            const notifications = data.notifications;
            setNotifications(notifications);
            // Update the count of unread notifications
            const updatedUnreadCount = notifications.filter(notification => !notification.read).length;
            setUnreadCount(updatedUnreadCount);
            localStorage.setItem('unreadNotificationsCount', updatedUnreadCount);
            localStorage.setItem('notifications', JSON.stringify(notifications)); // Store the notifications array in local storage
          } else {
            console.log(`Error: ${data.message}`);
          }
        })
        .catch(error => console.error('Error fetching notifications:', error));
    }
  }, [userPhone]); 

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      // Mark the notification as read
      notification.read = true;
      const updatedNotifications = [...notifications];
      setNotifications(updatedNotifications);

      // Update the count of unread notifications
      const updatedUnreadCount = unreadCount - 1;
      setUnreadCount(updatedUnreadCount);
      localStorage.setItem('unreadNotificationsCount', updatedUnreadCount);
    }
  };

  return (
    <div className="Container" style={{backgroundColor:store.color}}>
      <div className='notif-container'>
        {notifications.length > 0 ? (
          <div>
            <h4>{translations.notification}: <span id="noti_number">{unreadCount}</span></h4>
            <div id="notifications">
              {notifications.map(notification => (
                <div key={notification.id} className={`notification ${notification.read ? 'read' : 'unread'}`} onClick={() => handleNotificationClick(notification)}>
                  <div id='notif-content'>
                    <h5>{notification.title} {notification.type === 'question' ? notification.answer : notification.reply}</h5>
                  </div>
                  <hr/>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>{translations.noNotif}</p>
        )}
      </div>
    </div> 
  );
}
