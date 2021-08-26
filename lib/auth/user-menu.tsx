import {
  Button,
  Callout,
  HeaderPopover,
  Horizontal,
  Prose,
  Vertical,
} from "@/components";
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
          <Prose size="small">
            You’re currently logged in with the account code:
          </Prose>

          <Callout color="green" className="text-center">
            <strong>{formatId(auth.learner.learnerId)}</strong>
          </Callout>

          {!auth.isForCredit && (
            <Prose size="small">
              This is an anonymous account. Your work will <strong>not</strong>{" "}
              count for any course credit.
            </Prose>
          )}

          <Button
            color="blue"
            size="small"
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
        <Horizontal justify="center">
          <Button color="blue" link={Login.link}>
            Log in
          </Button>
        </Horizontal>
      )}
    </HeaderPopover>
  );
};
