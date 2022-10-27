/** https://github.com/vercel/next.js/blob/canary/examples/with-sentry/pages/_error.js */
import * as Sentry from "@sentry/nextjs";
import { NextPageContext } from "next";
import NextErrorComponent, { ErrorProps } from "next/error";

const AceError = (props: ErrorProps) => {
  return <NextErrorComponent {...props} />;
};

AceError.getInitialProps = async (contextData: NextPageContext) => {
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  await Sentry.captureUnderscoreErrorException(contextData);

  // This will contain the status code of the response
  return NextErrorComponent.getInitialProps(contextData);
};

export default AceError;
