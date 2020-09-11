import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.scss";

Sentry.init({
  enabled: process.env.NODE_ENV !== "development",
  environment: process.env.REACT_APP_ACE_ENV,
  dsn:
    "https://b08fd44c934c4c7cb31f6387c858f722@o446424.ingest.sentry.io/5424848",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.render(<App />, document.getElementById("root"));
