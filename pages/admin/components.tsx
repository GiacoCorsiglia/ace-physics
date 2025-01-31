import { hashEmail, saveUnhashedEmail } from "@/auth/client";
import { Button, Horizontal, TextInputControl } from "@/components";
import { isValidEmail } from "@/helpers/client";
import { ArrowRightIcon } from "@primer/octicons-react";
import { useRouter } from "next/router";
import { useState } from "react";

export const AccountLookupForm = ({
  originalEmail = "",
}: {
  originalEmail?: string;
}) => {
  const router = useRouter();

  const [email, setEmail] = useState(originalEmail);

  const disabled =
    email === originalEmail || !email.trim() || !isValidEmail(email);

  const submit = async () => {
    if (disabled) {
      return;
    }

    // Preserve this email so we can display it on future pages, where we will
    // only know its hash.
    saveUnhashedEmail(email);

    // Redirect to the account page once we have the email hash.
    const hash = await hashEmail(email);
    router.push(`/admin/users/${encodeURIComponent(hash)}`);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      autoComplete="off"
    >
      <Horizontal>
        <div style={{ flex: "1" }}>
          <TextInputControl
            aria-label="Email"
            value={email}
            onChange={setEmail}
            placeholder="email@example.com"
            autoComplete="off"
          />
        </div>

        <Button
          color="green"
          type="submit"
          disabled={disabled}
          disabledExplanation={
            email === originalEmail
              ? null
              : "Please enter a valid email address"
          }
          iconRight={<ArrowRightIcon />}
        >
          Look up
        </Button>
      </Horizontal>
    </form>
  );
};
