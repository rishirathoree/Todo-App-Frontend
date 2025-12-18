import { useEffect } from "react";
import { useAppDispatch, } from "@/stores/stores";
import { increaseIdleTime,  } from "@/stores/slices/timings";

const UseAcitivty = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const updateLastActivity = () => {
      dispatch(increaseIdleTime());
    };

    const events = [
      "mousemove",
      "mousedown",
      "mouseup",
    ];

    events.forEach((event) =>
      window.addEventListener(event, updateLastActivity)
    );

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, updateLastActivity)
      );
    };
  }, [dispatch]);
  return null
};

export default UseAcitivty;
