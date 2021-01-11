import { Prose } from "@/design";
import { Button } from "@/inputs";
import { Login } from "@/urls";
import { classes, useToggle } from "@/util";
import { PersonIcon } from "@primer/octicons-react";
import { useRouter } from "next/router";
import { formatId } from "./helpers";
import { useAuth } from "./service";
import styles from "./UserMenu.module.scss";

export default function UserMenu() {
  const { auth, logout } = useAuth();
  const router = useRouter();

  const [toggled, setToggled, menuElRef] = useToggle<HTMLDivElement>();

  return (
    <>
      <div
        className={classes(styles.toggle, [styles.toggled, toggled])}
        onClick={() => setToggled((o) => !o)}
      >
        <PersonIcon aria-label="My Account Menu" />
      </div>

      <div
        className={classes(styles.popup, [styles.toggled, toggled])}
        ref={menuElRef}
      >
        {auth.isLoggedIn && (
          <>
            <Prose noMargin>
              <p>You’re currently logged in with the account code:</p>

              <p className="success text-center">
                <strong>{formatId(auth.learner.learnerId)}</strong>
              </p>

              {!auth.isForCredit && (
                <p>
                  This is an anonymous account. Your work will{" "}
                  <strong>not</strong> count for any course credit.
                </p>
              )}
            </Prose>

            <Button
              className="margin-top-1"
              onClick={() => {
                logout();
                router.push(`${Login.link}?logout=yes`);
              }}
              kind="secondary"
            >
              Log out
            </Button>
          </>
        )}

        {!auth.isLoggedIn && (
          <Button link={Login.link} kind="secondary">
            Log in
          </Button>
        )}
      </div>
    </>
  );
}
