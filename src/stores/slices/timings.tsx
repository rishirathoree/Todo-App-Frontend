import { createSlice } from "@reduxjs/toolkit";

const MAX_DIFF_IDLE =
  Number(import.meta.env.VITE_MAX_DIFF_IDLE ?? 1) * 60 * 1000;

const INCREASE_IDLE_BY =
  Number(import.meta.env.VITE_INCREASE_IDLE_TIME_BY ?? 1) * 60 * 1000;

const initialState = {
  showPopup: localStorage.getItem("showPopup") === "true",
  idleTime: Number(localStorage.getItem("idleTime")) || Date.now(),
  popupTimer: Number(localStorage.getItem("popupTimer")) || 60,
};

const timingSlice = createSlice({
  name: "timings",
  initialState,
  reducers: {
    setInitialTime: (state) => {
      state.idleTime = Date.now();
      localStorage.setItem("idleTime", String(state.idleTime));
    },

    setIdleTime: (state, action) => {
      state.idleTime = action.payload;
      localStorage.setItem("idleTime", String(action.payload));
    },

    increaseIdleTime: (state) => {
      const now = Date.now();
      const diff = now - state.idleTime;
      const isUnderMint = 60 * 1000

    //   adding a comment to explain condition: if the idle time is under 60 second then we need to register the time increment
      if (diff < isUnderMint || diff >= MAX_DIFF_IDLE) {
        state.idleTime = now + INCREASE_IDLE_BY;
        localStorage.setItem("idleTime", String(state.idleTime));
      }
    },

    setShowPopup: (state, action) => {
      state.showPopup = action.payload;
      localStorage.setItem("showPopup", String(action.payload));

      if (action.payload) {
        state.popupTimer = 60;
        localStorage.setItem("popupTimer", "60");
      }
    },

    decrementPopupTimer: (state) => {
      if (state.popupTimer > 0) {
        state.popupTimer -= 1;
        localStorage.setItem("popupTimer", String(state.popupTimer));
      }
    },

    resetPopup: (state) => {
      state.showPopup = false;
      state.popupTimer = 60;
      localStorage.setItem("showPopup", "false");
      localStorage.setItem("popupTimer", "60");
    },
  },
});

export const {
  setIdleTime,
  setInitialTime,
  increaseIdleTime,
  setShowPopup,
  decrementPopupTimer,
  resetPopup,
} = timingSlice.actions;

export default timingSlice.reducer;
