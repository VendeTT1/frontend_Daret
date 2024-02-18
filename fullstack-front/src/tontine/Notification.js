import React from 'react';
import { useToasts } from 'react-toast-notifications';

const Notification = ({ content }) => {
  const { addToast } = useToasts();

  React.useEffect(() => {
    if (content) {
      addToast(content, { appearance: 'success', autoDismiss: true });
    }
  }, [content, addToast]);

  return null;
};

export default Notification;
