/// <reference types="next" />
/// <reference types="next/types/global" />

////////////////////////////////////////////////////////////////////////////////
// Everything above this is Next's default setup.
// Everything below are extra global types.
////////////////////////////////////////////////////////////////////////////////

// Declare environment variables.
declare namespace NodeJS {
  interface ProcessEnv {
    // Private.
    readonly ACE_AWS_ACCESS_KEY: string;
    readonly ACE_AWS_SECRET_KEY: string;
    readonly ACE_AWS_REGION: string;
    readonly ACE_TABLE_NAME: string;
    // Public.
    readonly NEXT_PUBLIC_ACE_ENV: "production" | "staging" | "development";
    // Public, for local.
    readonly NEXT_PUBLIC_LOCAL_API: "yes" | "no" | undefined;
  }
}

// Declare asset modules.

declare module "*.jpg" {
  const src: string;
  export default src;
}
declare module "*.gif" {
  const src: string;
  export default src;
}
declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  import * as React from "react";

  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  // const src: string;
  export default ReactComponent;
}

// Redux Dev Tools
interface Window {
  __REDUX_DEVTOOLS_EXTENSION__?: any;
}
