import React from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import { Prose } from "./components";
import { Content } from "./components/layout";
import * as urls from "./urls";

export const route = <Route path={urls.Privacy.path} element={<Privacy />} />;

function Privacy() {
  return (
    <Content>
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
          track of any and all of your interactions with ACEPhysics.net, and to
          store that information within the ACEPhysics.net system.
        </p>

        <p>
          We are intent on protecting our users' privacy on ACEPhysics.net. For
          this reason, your account is identified exclusively by a random
          six-digit code. Your account is linked to the answers you input into
          the online tutorial worksheets, or anywhere else on the site that asks
          for your input. We currently do not ask you to input your name, email
          address, professor's name, the name of your school, or any other
          identifying information like that.
        </p>

        <p>
          You should note that if you are using ACEPhysics.net as part of a
          class, and if your instructor gave you your account code, then they
          will have access to everything you input on ACEPhysics.net, and will
          be able to associate your input with your name (even though your name
          is not stored anywhere on the ACEPhysics.net system).
        </p>

        <p>
          <Link to="/">Return to the acephysics.net homepage</Link>
        </p>
      </Prose>
    </Content>
  );
}
