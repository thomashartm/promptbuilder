interface NotificationFieldProps {
  notification: string | null;
}

export default function NotificationField({ notification }: NotificationFieldProps) {
  if (!notification) return null;

  return (
    <div className="notification">
      {notification}
    </div>
  );
}
