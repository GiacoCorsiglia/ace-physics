/// <reference types="react-scripts" />

declare const MathJax: any;
declare const ACE__MathJax: any;

declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_ACE_API: "yes" | "no" | undefined;
  }
}
