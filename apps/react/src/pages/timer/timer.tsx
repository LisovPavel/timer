import React, { useEffect } from "react";
import { Timer as UITimer } from "@timer/ui";

import { parseMs } from "../../utils/time";
import { useTimer } from "../../hooks/use-timer";

export const Timer = () => {
  const { leftTime, start, stop, isActive, init } = useTimer();
  useEffect(() => {
    init([1000 * 60]);
    start();
    return stop;
  }, []);

  return (
    <div>
      <UITimer isActive={isActive} time={parseMs(Math.abs(leftTime))} />
    </div>
  );
};
