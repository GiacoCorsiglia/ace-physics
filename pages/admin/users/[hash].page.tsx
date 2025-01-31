import { useUpdateUser, useUser } from "@/api/client";
import { UserMenu, useAuth, useUnhashedEmail } from "@/auth/client";
import {
  AuthGuard,
  Breadcrumb,
  Button,
  Callout,
  DropdownControl,
  Header,
  Horizontal,
  LabelsLeft,
  LoadingAnimation,
  MainContentBox,
  Page,
  Prose,
  Vertical,
} from "@/components";
import { User } from "@/schema/api";
import {
  CheckCircleIcon,
  PersonFillIcon,
  PersonIcon,
} from "@primer/octicons-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { AccountLookupForm } from "../components";

export default function UserView() {
  // Extract hash from URL.
  const router = useRouter();
  const { hash } = router.query as { hash?: string };

  const auth = useAuth({
    required: true,
  });

  const { data: user, error } = useUser(hash ? { hash } : null);

  return (
    <Page title="Admin">
      <Header title="Admin" popovers={<UserMenu />} />

      <MainContentBox>
        <Breadcrumb
          items={[Breadcrumb.home, { link: "/admin", label: "Admin" }]}
        />

        <Prose>
          <h1>Account Lookup</h1>
        </Prose>

        <AuthGuard
          auth={auth}
          allowed={
            auth.status === "authenticated" && auth.user.role === "admin"
          }
          loading={!user && !error}
        >
          {error && error.type !== "404 NOT FOUND" && (
            <Callout color="red">
              We encountered an error loading this page.
            </Callout>
          )}

          {/* If we get a 404, it's because this user doesn't yet exist */}
          {error && error.type === "404 NOT FOUND" && !!hash && (
            <LoadedUser
              key={hash}
              user={{
                isPersisted: false,
                isEmailVerified: false,
                email: hash,
              }}
            />
          )}

          {user && (
            <LoadedUser
              key={hash}
              user={{
                ...user,
                isPersisted: true,
              }}
            />
          )}
        </AuthGuard>
      </MainContentBox>
    </Page>
  );
}

type PossibleUser =
  | ({ isPersisted: true } & User)
  | ({ isPersisted: false } & Pick<User, "isEmailVerified" | "email">);

const LoadedUser = ({ user }: { user: PossibleUser }) => {
  const email = useUnhashedEmail(user.email);

  // If we can't find the email address in local storage, force you to start
  // over, since this might be a nonsense URL.
  if (!user.isPersisted && email === null) {
    return (
      <Callout as="section" color="red">
        <Vertical space={50}>
          <Prose>Please start over by searching for an email address.</Prose>

          <AccountLookupForm />
        </Vertical>
      </Callout>
    );
  }

  return (
    <Vertical>
      <Callout as="section" color="green" autoProse={false}>
        {email === undefined ? (
          <LoadingAnimation size="small" />
        ) : (
          <AccountLookupForm originalEmail={email || user.email || ""} />
        )}
      </Callout>

      <Callout
        as="section"
        color="neutral"
        iconLeft={
          user.isEmailVerified ? (
            <PersonFillIcon size="medium" />
          ) : (
            <PersonIcon size="medium" />
          )
        }
      >
        {user.isEmailVerified
          ? "User has logged in at least once."
          : "User has never logged in."}
      </Callout>

      <Callout as="section" color="neutral">
        <UserPrivilegesForm user={user} />
      </Callout>
    </Vertical>
  );
};

const UserPrivilegesForm = ({ user }: { user: PossibleUser }) => {
  const mutation = useUpdateUser();

  // If the user exists, their role is "student" regardless of whether that is
  // saved.  This is important so the "Save" button isn't immediately active for
  // every existing student.
  const originalRole = user.isPersisted ? user.role || "student" : undefined;

  const [role, setRole] = useState<"student" | "instructor" | "admin">(
    originalRole || "student",
  );

  const isDirty = role !== originalRole;

  const disabled = !isDirty || mutation.status === "loading";

  const submit = async () => {
    if (disabled) {
      return;
    }

    if (!user.email) {
      throw new Error("Expected user to have email address");
    }

    await mutation.mutate(
      {
        hash: user.email,
      },
      {
        role: role,
      },
    );
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      autoComplete="off"
    >
      <Vertical>
        <Horizontal>
          <LabelsLeft style={{ flex: 1 }}>
            <DropdownControl
              label="Privileges:"
              choices={
                [
                  [
                    "student",
                    <>
                      Student <span style={{ opacity: 0.5 }}>(default)</span>
                    </>,
                  ],
                  ["instructor", "Instructor"],
                  ["admin", "Admin"],
                ] as const
              }
              value={role}
              onChange={(p) => setRole(p || "instructor")}
            />
          </LabelsLeft>

          <Button
            color="green"
            type="submit"
            disabled={disabled}
            loading={mutation.status === "loading"}
          >
            Save
          </Button>
        </Horizontal>

        {mutation.status === "success" && !isDirty && (
          <Callout color="green" iconLeft={<CheckCircleIcon size="medium" />}>
            User privileges updated.
          </Callout>
        )}

        {mutation.status === "error" && (
          <Callout color="red">Could not update user privileges.</Callout>
        )}

        <Prose size="ui-small">
          <p>
            <strong>Students</strong> can do tutorials and access their courses.
            All users are students by&nbsp;default.
          </p>

          <p>
            <strong>Instructors</strong> can create courses, and they can do
            tutorials in “instructor mode”, which allows them to see every
            question and guidance element all at once. They can see the answers!
          </p>

          <p>
            <strong>Admins</strong>, like you, also have instructor privileges.
            In addition, admins can grant these privileges.
          </p>
        </Prose>
      </Vertical>
    </form>
  );
};
