import { useAppDispatch, type RootState } from "@/stores/stores";
import { Badge } from "./ui/badge";
import {
  decrementPopupTimer,
  resetPopup,
  setInitialTime,
  setShowPopup,
} from "@/stores/slices/timings";
import { logout } from "@/stores/slices/auth";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

const TimerCalculator: React.FC = () => {
  const dispatch = useAppDispatch();
  const { idleTime, showPopup, popupTimer } = useSelector(
    (state: RootState) => state.timings
  );

  const MAX_IDLE_SECONDS =
    Number(import.meta.env.VITE_CHECK_UPTO ?? 1) * 60;

  const [remainingSeconds, setRemainingSeconds] =
    useState<number>(MAX_IDLE_SECONDS);

  useEffect(() => {
    if (showPopup) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const diffSeconds = Math.floor((now - idleTime) / 1000);
      const remaining = Math.max(0, MAX_IDLE_SECONDS - diffSeconds);

      setRemainingSeconds(remaining);

      if (remaining === 0) {
        dispatch(setShowPopup(true));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [idleTime, showPopup, dispatch, MAX_IDLE_SECONDS]);

  // ---------- POPUP COUNTDOWN ----------
  useEffect(() => {
    if (!showPopup) return;

    const interval = setInterval(() => {
      dispatch(decrementPopupTimer());
    }, 1000);

    return () => clearInterval(interval);
  }, [showPopup, dispatch]);

  // ---------- LOGOUT ----------
  useEffect(() => {
    if (!showPopup) return;
    if (popupTimer > 0) return;

    dispatch(setShowPopup(false));
    dispatch(logout());
  }, [popupTimer, showPopup, dispatch]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <>
      <Badge variant="success" className="px-2 py-1 flex gap-2">
        <span className="size-1 rounded-full bg-green-500" />
        Session will expire in {formatTime(remainingSeconds)}
      </Badge>

      <Dialog open={showPopup} onOpenChange={(open) => !open && dispatch(resetPopup())}>
        <DialogContent showCloseButton={false} className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Session Expired</DialogTitle>
            <DialogDescription>
              You were inactive for a while, so we logged you out to keep your account secure.
            </DialogDescription>

          </DialogHeader>
          <DialogFooter>
            <DialogClose >
              <Button
                onClick={() => {
                  dispatch(logout())
                }}
                variant="outline">Logout</Button>
            </DialogClose>
            <Button variant={"destructive"}
              onClick={() => {
                dispatch(setInitialTime());
                dispatch(setShowPopup(false))
              }}
              type="submit">Stag Login {popupTimer}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </>
  );
};

export default TimerCalculator;
