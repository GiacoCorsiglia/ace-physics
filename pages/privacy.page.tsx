import { UserMenu } from "@/auth/client";
import { Header, MainContentBox, Page, Prose } from "@/components";
import Link from "next/link";

export default function Privacy() {
  return (
    <Page title="Privacy">
      <Header title="Privacy on ACE Physics" popovers={<UserMenu />} />

      <MainContentBox>
        <Prose>
          <h1>Privacy on ACEPhysics.net</h1>

          <p>
            By viewing and using ACEPhysics.net, such as by inputting responses
            into text boxes, you agree to share your data and input with the
            ACEPhysics.net team. It is your responsibility to not include any
            identifying information in those responses. If you do input such
            identifying information—or any other information—anywhere on
            ACEPhysics.net, you have therefore agreed to share that information
            with the ACEPhysics.net team, and to have that information stored
            within the ACEPhysics.net system. We also reserve the right to keep
            track of any and all of your interactions with ACEPhysics.net, and
            to store that information within the ACEPhysics.net system.
          </p>

          <p>
            We are intent on protecting our users’ privacy on ACEPhysics.net.
            For this reason, your account is identified exclusively by
            cryptographic hash of your email address. Your account is linked to
            the answers you input anywhere on the site that asks for your input,
            including the online tutorial worksheets. We currently do not ask
            you to input your name, professor’s name, the name of your school,
            or any other identifying information like that.
          </p>

          <p>
            You should be aware that if you are using ACEPhysics.net as part of
            a class, then your instructor will have access to everything you
            input on ACEPhysics.net, and will be able to associate your input
            with your name (even though your name is not stored anywhere on the
            ACEPhysics.net system).
          </p>

          <p>
            <Link href="/">Return to the ACEPhysics.net homepage</Link>
          </p>
        </Prose>
      </MainContentBox>
    </Page>
  );
}
