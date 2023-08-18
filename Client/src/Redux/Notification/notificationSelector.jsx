import { createSelector } from "reselect";

const NotificationState = (state) => state.Notify;

export const message = createSelector(
  [NotificationState],
  (notify) => notify.Notification.message
);

export const type = createSelector(
  [NotificationState],
  (notify) => notify.Notification.type
);
