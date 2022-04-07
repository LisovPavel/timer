import React from "react";
import { Navigate } from "react-router-dom";

import { routes } from "../../configs/routes";

export const Main = () => {
  return <Navigate to={routes.timer} />;
};
