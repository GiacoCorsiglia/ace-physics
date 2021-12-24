import { MainContentBox, Page, Prose } from "@/components";
import { MailIcon } from "@primer/octicons-react";

export default function VerifyRequest() {
  return (
    <Page title="Check Your Email to Sign In">
      <MainContentBox marginTop="small" className="text-center">
        <Prose>
          <h1>Check your email</h1>

          <p>
            <MailIcon size="large" />
          </p>

          <p>A sign in link has been sent to your email address.</p>
        </Prose>

        <Prose size="small" faded>
          Feel free to close this page.
        </Prose>
      </MainContentBox>
    </Page>
  );
}
