import { Button, HeaderPopover, Prose, Vertical } from "@/components";
import { Login } from "@/urls";
import { PersonIcon } from "@primer/octicons-react";
import { useRouter } from "next/router";
import { formatId } from "./helpers";
import { useAuth } from "./service";

export const UserMenu = () => {
  const { auth, logout } = useAuth();
  const router = useRouter();

  return (
    <HeaderPopover icon={<PersonIcon aria-label="My Account Menu" />}>
      {auth.isLoggedIn && (
        <Vertical>
          <Prose>
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
            color="blue"
            onClick={() => {
              logout();
              router.push(`${Login.link}?logout=yes`);
            }}
          >
            Log out
          </Button>
        </Vertical>
      )}

      {!auth.isLoggedIn && (
        <Button color="blue" link={Login.link}>
          Log in
        </Button>
      )}
    </HeaderPopover>
  );
};
