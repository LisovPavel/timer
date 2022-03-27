import React, { FC } from "react";

type TimerProps = {
  time: string;
};

export const Timer: FC<TimerProps> = ({ time }) => {
  return (
    <time
      className="
        text-[200px]
        text-primary-100
        leading-none
        font-bold
        text-center
        drop-shadow-md"
    >
      {time}
    </time>
  );
};
