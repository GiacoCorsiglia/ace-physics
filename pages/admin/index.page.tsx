import { useAuth, UserMenu } from "@/auth/client";
import {
  AuthGuard,
  Breadcrumb,
  Callout,
  Header,
  MainContentBox,
  Page,
  Prose,
} from "@/components";
import { LockIcon } from "@primer/octicons-react";
import { AccountLookupForm } from "./components";

export default function Admin() {
  const auth = useAuth({
    required: true,
  });

  return (
    <Page title="Admin">
      <Header title="Admin" popovers={<UserMenu />} />

      <MainContentBox>
        <Breadcrumb items={[Breadcrumb.home]} />

        <AuthGuard
          auth={auth}
          allowed={
            auth.status === "authenticated" && auth.user.role === "admin"
          }
        >
          <Prose>
            <h1>Admin</h1>

            <Callout color="neutral" iconLeft={<LockIcon size="medium" />}>
              Most users can’t see this page.
            </Callout>

            <p>
              As an ACE Physics admin, you can access student work from any
              course and grant “instructor privileges” to other users.
            </p>

            <p>Look up an account by email address to get started.</p>
          </Prose>

          <Callout color="green">
            <AccountLookupForm />
          </Callout>
        </AuthGuard>
      </MainContentBox>
    </Page>
  );
}
