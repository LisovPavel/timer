import React, { useEffect } from "react";
import { Timer as UITimer } from "@timer/ui";

import { useTimer } from "../../hooks/use-timer";

export const Timer = () => {
  const { leftTime, start, stop } = useTimer({ duration: 25 * 1000 });
  useEffect(() => {
    start();
    return stop;
  }, []);

  return (
    <div>
      <UITimer time={new Date(leftTime).toLocaleTimeString()} />
    </div>
  );
};
