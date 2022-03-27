import React, { FC } from "react";

export const IconButton: FC = (props) => {
  return (
    <button
      className="
      text-9xl
      grow-0
      p-2
      text-primary-100
      drop-shadow-sm
      drop-shadow-orange-500
      hover:text-primary-50
      cursor-pointer
      duration-300
      hover:drop-shadow-md
      select-none
      active:drop-shadow-none
      active:text-white"
      {...props}
    />
  );
};
