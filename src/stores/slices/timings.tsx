import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showPopup: false,
    idleTime: 0,
    isStaySignedIn: false,
    popupTimer: 60,
};

const timingSlice = createSlice({
    name: "timings",
    initialState,
    reducers: {
        setIdleTime: (state, action) => {
            state.idleTime = action.payload;
            localStorage.setItem("idleTime", JSON.stringify(action.payload));
        },
        setShowPopup: (state, action) => {
            state.showPopup = action.payload;
            if (action.payload) {
                state.popupTimer = 60;
            }
        },
        decrementPopupTimer: (state) => {
            if (state.popupTimer > 0) {
                state.popupTimer -= 1;
            }
        },
        resetPopup: (state) => {
            state.showPopup = false;
            state.popupTimer = 60;
        },
        increaseIdleTime: (state) => {

            const increaseByMinutes =
                Number(import.meta.env.VITE_INCREASE_IDLE_TIME_BY) || 1;

                // if i alsways move my mouse it can go upto miliioons trillion value so we only make changes if the diff of idle time is less than max diff
            const maxDiffMinutes =
                Number(import.meta.env.VITE_MAX_DIFF_IDLE) + increaseByMinutes || 1;

            const now = Date.now();
            const maxDiffMs = maxDiffMinutes * 60_000;
            const increaseMs = increaseByMinutes * 60_000;

            if (state.idleTime && state.idleTime - now > maxDiffMs) {
                return;
            }

            const baseTime =
                state.idleTime && state.idleTime > now
                    ? state.idleTime
                    : now;

            state.idleTime = baseTime + increaseMs;

            localStorage.setItem(
                "idleTime",
                JSON.stringify(state.idleTime)
            );

        }
    },
});

export const {
    setIdleTime,
    setShowPopup,
    decrementPopupTimer,
    resetPopup,
    increaseIdleTime,
} = timingSlice.actions;

export default timingSlice.reducer;
