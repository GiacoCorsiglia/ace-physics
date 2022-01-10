import { useUpdateUserPrivileges } from "@/api/client";
import { useAuth, UserMenu } from "@/auth/client";
import {
  AuthGuard,
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
  TextInputControl,
  Vertical,
} from "@/components";
import { Breadcrumb } from "@/components/breadcrumb";
import { isValidEmail } from "@/helpers/function-helpers";
import { useState } from "react";

export default function Courses() {
  const auth = useAuth({
    required: true,
  });

  return (
    <Page title="Courses">
      <Header title="Your Courses" popovers={<UserMenu />} />

      <MainContentBox>
        <Breadcrumb items={[{ link: "/", label: "Home" }]} />

        <AuthGuard
          auth={auth}
          allowed={
            auth.status === "authenticated" && auth.user.role === "admin"
          }
        >
          <Prose>
            <h1>Admin</h1>

            <p>
              You can grant “instructor privileges”. Instructors can create
              courses, and they can also do tutorials in “instructor mode”,
              which allows them to see every question and every guidance
              element, without requiring them to input any answers. In short,
              instructors can see the answers to every tutorial
            </p>

            <p>
              Admins also have instructor privileges. In addition, admins can
              grant other people these privileges. If you’re seeing this page,
              you’re an admin!
            </p>
          </Prose>

          <Callout color="neutral">
            <UserPrivilegesForm />
          </Callout>

          <Prose>
            <strong>Additional info:</strong> Instructors can add other
            instructors to their courses. However, those users will not be able
            to access “instructor mode” or create new courses. Their instructor
            privileges will be limited to the course they were added to: for
            example, they can edit the course and can also download student
            responses. This feature exists primarily for graders.
          </Prose>
        </AuthGuard>
      </MainContentBox>
    </Page>
  );
}

const UserPrivilegesForm = () => {
  const mutation = useUpdateUserPrivileges();

  const [email, setEmail] = useState("");
  const [privileges, setPrivileges] = useState<
    "student" | "instructor" | "admin"
  >("instructor");

  const disabled =
    !email.trim() || !isValidEmail(email) || mutation.status === "loading";

  const submit = async () => {
    if (disabled) {
      return;
    }

    const result = await mutation.mutate({
      unhashedUserEmail: email,
      role: privileges,
    });

    if (!result.failed) {
      setEmail("");
      // Don't reset privileges.
    }
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
        <LabelsLeft>
          <DropdownControl
            label="Privileges:"
            choices={
              [
                ["instructor", "Instructor privileges"],
                ["admin", "Admin privileges"],
                ["student", "Revoke instructor/admin privileges"],
              ] as const
            }
            value={privileges}
            onChange={(p) => setPrivileges(p || ("instructor" as const))}
          />

          <TextInputControl
            label="Email:"
            value={email}
            onChange={setEmail}
            placeholder="instructor@example.com"
            autoComplete="off"
          />
          <Prose size="small" faded>
            An account will be created automatically if one does not exist.
          </Prose>
        </LabelsLeft>

        {mutation.status === "success" && (
          <Callout color="green">Updated user privileges.</Callout>
        )}

        {mutation.status === "error" && (
          <Callout color="red">Could not update user privileges.</Callout>
        )}

        <Horizontal justify="end">
          {mutation.status === "loading" && (
            <LoadingAnimation size="small" message={null} />
          )}

          <Button
            color="green"
            type="submit"
            disabled={disabled}
            disabledExplanation="Please enter a valid email address"
          >
            Set user privileges
          </Button>
        </Horizontal>
      </Vertical>
    </form>
  );
};
