import React, { FC } from "react";
import "./layout.css";

export const Layout: FC = ({ children }) => {
  return (
    <div
      className="
        layout
        box-sizing-border-box
        overflow-hidden
        rounded-md
        shadow-lg
        items-stretch
        flex
        bg-gradient-to-br
        from-primary-300
        to-primary-400"
    >
      {children}
    </div>
  );
};
