import { notification } from "antd";
import React, { createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rootActions } from "../../../Redux/Root/rootActions";
import { notificationSelector } from "../../../Redux/Root/rootSelector";
// Create a context for using notifications
const NotificationContext = createContext(null);
/**
 * Hook for using the notification context.
 *
 * @returns {Object} The notification context.
 */
export const useNotification = () => useContext(NotificationContext);
/**
 * Notification component provides a context for handling notifications.
 *
 * @component
 * @param {ReactNode} children - The children components.
 */
export const Notification = ({ children }) => {
  // Use the notification API from antd
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();
  const notifyType = useSelector(notificationSelector.type);
  const notifyMessage = useSelector(notificationSelector.message);
  /**
   * Handle closing the notification.
   */
  const handleClose = () => {
    dispatch(
      rootActions.notificationActions.storeNotification({
        type: "",
        message: null,
      })
    );
  };
  // Display notification if there's a type and message
  if (notifyType && notifyMessage) {
    api[notifyType]({
      description: notifyMessage,
      onClose: handleClose,
      placement: "top",
      style: {
        borderBottom:
          notifyType === "success"
            ? "5px solid #16FF00"
            : notifyType === "error"
            ? "5px solid red"
            : null,
        fontWeight: "bold",
      },
    });
  }

  return (
    <div>
      {contextHolder}
      {children}
    </div>
  );
};
