import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as account from "./account";
import ComponentsTest from "./components/ComponentsTest";
import { Footer } from "./components/shared/Footer";
import footerStyles from "./components/shared/Footer.module.scss";
import * as globalParams from "./globalParams";
import * as Generate from "./pages/Generate";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import * as Privacy from "./pages/Privacy";
import * as Tutorials from "./tutorials";

export default function App() {
  return (
    <Router>
      <globalParams.GlobalParamsProvider>
        <div className={footerStyles.bodyContent}>
          <account.AccountProvider>
            <Routes>
              <Route path="/" element={<Home />} />

              {Tutorials.route}

              {account.createAccountRoute}
              {account.loginRoute}

              {Generate.route}

              {Privacy.route}

              <Route path="test" element={<ComponentsTest />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </account.AccountProvider>
        </div>

        <Footer />
      </globalParams.GlobalParamsProvider>
    </Router>
  );
}
