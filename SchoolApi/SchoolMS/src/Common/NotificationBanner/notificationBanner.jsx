import { useEffect, useState } from 'react';
import {
    FaCheckCircle,
    FaInfoCircle,
    FaTimesCircle
} from 'react-icons/fa';
import './NotificationBanner.css';

function NotificationBanner({ message, type = 'info', onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const timeout = setTimeout(() => {
      setVisible(false);
      onClose && onClose();
    }, 5000);

    return () => clearTimeout(timeout);
  }, [message]);

  if (!message || !visible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="icon success-icon" />;
      case 'error':
        return <FaTimesCircle className="icon error-icon" />;
      default:
        return <FaInfoCircle className="icon info-icon" />;
    }
  };

  return (
    <div className={`notification-banner serious ${type}`}>
      <div className="icon-container">{getIcon()}</div>
      <div className="text-container">{message}</div>
      <div className="close-icon" onClick={() => { setVisible(false); onClose && onClose(); }}>×</div>
    </div>
  );
}

export default NotificationBanner;
