import React, { FC } from "react";

export const Main: FC = (props) => {
  return (
    <main
      className="
        w-full
        p-4
        shadow-primary-500
        shadow-md
        flex
        flex-col
        justify-center"
      {...props}
    />
  );
};
