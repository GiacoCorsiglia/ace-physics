/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_ACE_API: "yes" | "no" | undefined;
    readonly REACT_APP_ACE_ENV: "production" | "staging" | "development";
  }
}
