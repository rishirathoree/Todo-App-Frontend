import { useAppDispatch, type RootState } from "@/stores/stores";
import { Badge } from "./ui/badge";
import { resetPopup, setIdleTime, setShowPopup } from "@/stores/slices/timings";
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
} from "@/components/ui/dialog"
import { Button } from "./ui/button";

const TimerCalculator: React.FC = () => {

  const dispatch = useAppDispatch();

  const { idleTime, showPopup } = useSelector((state: RootState) => state.timings);

  const [popupSecond, setPopupSecond] = useState<number>(60);

  const MAX_IDLE_SECONDS = Number(import.meta.env.VITE_CHECK_UPTO ?? 1) * 60;

  const [remainingSeconds, setRemainingSeconds] = useState<number>(MAX_IDLE_SECONDS);

  useEffect(() => {
    if (showPopup) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const idleStartTime = new Date(idleTime).getTime();
      const idleSecondsMinusss = Math.floor((now - idleStartTime) / 1000);
      const remaining = Math.max(0, MAX_IDLE_SECONDS - idleSecondsMinusss);

      console.log('remaining seconds',remaining)

      setRemainingSeconds(remaining);

      if (remaining <= 0) {
        dispatch(setShowPopup(true));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [idleTime, showPopup, dispatch, MAX_IDLE_SECONDS]);

  const formatTime = (seconds: number) => {
    if (seconds <= 0) return "0s";
    return `${seconds}s`;
  };

  useEffect(() => {
    if (popupSecond > 0) {
      setTimeout(() => {
        setPopupSecond(popupSecond - 1);
      }, 1000);
    } else {
      dispatch(logout())
      setShowPopup(false)
    }
  }, [popupSecond])

  return (
    <>
      {remainingSeconds < 60 ? (
        <Badge variant="warning" className="px-2 py-1 flex gap-2">
          <span className="size-1 rounded-full bg-yellow-500" />
          {Number(formatTime(remainingSeconds)) > 0 ? `Session will expire in ${formatTime(remainingSeconds)}` : "Session expired"}
        </Badge>
      ) : (
        <Badge variant="success" className="px-2 py-1 flex gap-2">
          <span className="size-1 rounded-full bg-green-500" />
          Session running
        </Badge>
      )}

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
              onClick={()=>{
                dispatch(logout())
              }}
              variant="outline">Logout</Button>
            </DialogClose>
            <Button variant={"destructive"}
              onClick={() => {
                dispatch(setIdleTime(Date.now() + 2 * 60 * 1000));
                dispatch(setShowPopup(false))
              }}
              type="submit">Stag Login {popupSecond}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TimerCalculator;