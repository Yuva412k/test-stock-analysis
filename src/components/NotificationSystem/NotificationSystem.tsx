import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { fetchNotifications } from '../../utils/api';
import { Loader } from '../Loader/Loader';
import { useQuery } from 'react-query';

interface Notification {
  id: string;
  message: string;
  read: boolean;
  timestamp: string;
}

export const NotificationSystem: React.FC = () => {
  const { data, isLoading } = useQuery('notifications', fetchNotifications);


  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);


  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="relative"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <Bell className="h-5 w-5 text-white" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </Button>
      {showNotifications && (
        <Card className="absolute right-0 mt-2 w-64 z-10">
          <CardContent className="py-2">
            {notifications.length === 0 ? (
              <p className="text-center text-gray-500">No notifications</p>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-2 border-b last:border-b-0 ${notification.read ? 'bg-gray-100' : 'bg-white'}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
