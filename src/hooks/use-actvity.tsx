import { useEffect } from "react";
import { useAppDispatch } from "@/stores/stores";
import { increaseIdleTime } from "@/stores/slices/timings";

const UseActivity = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleActivity = () => {
      dispatch(increaseIdleTime());
    };

    const events = ["mousemove", "mousedown", "keydown", "scroll"];

    events.forEach((event) =>
      window.addEventListener(event, handleActivity)
    );

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
    };
  }, [dispatch]);

  return null;
};

export default UseActivity;
