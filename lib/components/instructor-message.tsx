import { useAuth } from "@/auth/client";
import { Html, isInstructor } from "@/helpers/client";
import { Callout } from "./callouts";

export const InstructorMessage = ({
  children,
  title = "Message for instructors",
}: {
  children?: Html;
  title?: Html;
}) => {
  const auth = useAuth({ required: false });
  const canView = auth.status === "authenticated" && isInstructor(auth.user);
  if (!canView) {
    return null;
  }

  return (
    <Callout color="blue" title={title}>
      {children}
    </Callout>
  );
};
