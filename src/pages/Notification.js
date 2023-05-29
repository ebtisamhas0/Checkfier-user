import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../components/UserContext';
import { NotificationContext } from '../components/NotificationContext';
import { useStore } from "../components/StoreContext";
import helpTranslations from '../translations/help';
import { LanguageContext } from '../components/LanguageContext';
import { serverUrl } from '../config';

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
      // Initialize the read status of each notification
      const readStatus = JSON.parse(localStorage.getItem('notificationReadStatus')) || {};
      const updatedNotifications = storedNotifications.map(notification => {
        const isRead = readStatus[notification.id] || false;
        return { ...notification, read: isRead };
      });
      setNotifications(updatedNotifications);
  
      // Update the count of unread notifications
      const updatedUnreadCount = updatedNotifications.filter(notification => !notification.read).length;
      setUnreadCount(updatedUnreadCount);
      localStorage.setItem('unreadNotificationsCount', updatedUnreadCount);
    } else {
      fetch(`${serverUrl}/notifications?userPhone=${userPhone}`)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            const notifications = data.notifications;
            setNotifications(notifications);
  
            // Initialize the read status of each notification
            const readStatus = {};
            notifications.forEach(notification => {
              readStatus[notification.id] = notification.read || false;
            });
            localStorage.setItem('notificationReadStatus', JSON.stringify(readStatus));
  
            // Update the count of unread notifications
            const updatedUnreadCount = notifications.filter(notification => !notification.read).length;
            setUnreadCount(updatedUnreadCount);
            localStorage.setItem('unreadNotificationsCount', updatedUnreadCount);
  
            // Store the notifications array and read status in local storage
            localStorage.setItem('notifications', JSON.stringify(notifications));
            localStorage.setItem('notificationReadStatus', JSON.stringify(readStatus));
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
  
      // Store the read status of the notification in local storage
      const updatedReadStatus = { ...JSON.parse(localStorage.getItem('notificationReadStatus')) };
      updatedReadStatus[notification.id] = true;
      localStorage.setItem('notificationReadStatus', JSON.stringify(updatedReadStatus));
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
