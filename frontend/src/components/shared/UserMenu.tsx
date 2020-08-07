import { PersonIcon } from "@primer/octicons-react";
import { default as React, useState } from "react";
import { formatId, useAccount, useLogout } from "src/account";
import { Login } from "src/urls";
import { classes } from "src/util";
import { Prose } from "..";
import { Button } from "../inputs";
import styles from "./UserMenu.module.scss";

export function UserMenu() {
  const account = useAccount();
  const logout = useLogout();

  const [toggled, setToggled] = useState(false);

  return (
    <>
      <div
        className={classes(styles.toggle, [styles.toggled, toggled])}
        onClick={() => setToggled((o) => !o)}
      >
        <PersonIcon aria-label="My Account Menu" />
      </div>

      <div className={classes(styles.popup, [styles.toggled, toggled])}>
        {account.isLoggedIn && (
          <>
            <Prose noMargin>
              <p>You’re currently logged in with the account code:</p>

              <p className="success text-center">
                <strong>{formatId(account.learner.learnerId)}</strong>
              </p>

              {!account.isForCredit && (
                <p>
                  This is an anonymous account. Your work will{" "}
                  <strong>not</strong> count for any course credit.
                </p>
              )}
            </Prose>

            <Button
              className="margin-top-1"
              link={`${Login.link}?logout=yes`}
              onClick={logout}
              kind="secondary"
            >
              Log out
            </Button>
          </>
        )}

        {!account.isLoggedIn && (
          <Button link={Login.link} kind="secondary">
            Log out
          </Button>
        )}
      </div>
    </>
  );
}
