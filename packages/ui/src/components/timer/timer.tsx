import React, { FC } from "react";
import cn from "classnames";

type TimerProps = {
  time: string;
  isActive?: boolean;
};

export const Timer: FC<TimerProps> = ({ time, isActive }) => {
  return (
    <time
      className={cn(
        "block text-[200px] text-primary-100 leading-none font-bold font-mono text-center drop-shadow-md",
        isActive && "animate-tick"
      )}
    >
      {time}
    </time>
  );
};
