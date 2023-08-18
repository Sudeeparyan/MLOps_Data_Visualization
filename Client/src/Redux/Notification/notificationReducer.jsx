import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Notification: {
    message: null,
    type: "",
  },
};

const Notification = createSlice({
  name: "notification",
  initialState,
  reducers: {
    storeNotification: (state, action) => {
      state.Notification.message = action.payload.message;
      state.Notification.type = action.payload.type;
    },
  },
});

export const { storeNotification } = Notification.actions;
export default Notification.reducer;
