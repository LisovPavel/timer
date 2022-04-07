import React from "react";
import { Layout, Navbar, Main } from "@timer/ui";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { routes } from "./configs";
import { Main as MainPage, Timer } from "./pages";

export const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Navbar />
        <Main>
          <Routes>
            <Route path={routes.main} element={<MainPage />} />
            <Route path={routes.timer} element={<Timer />} />
          </Routes>
        </Main>
      </Layout>
    </BrowserRouter>
  );
};
