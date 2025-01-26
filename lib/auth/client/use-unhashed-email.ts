import { isValidEmail, safeLocalStorage } from "@/helpers/client";
import { useEffect, useState } from "react";

// We will preserve in local storage a map from hashes to unhashed emails.
const localStoragePrefix = "ace-hash:";
const makeKey = (hash: string) => `${localStoragePrefix}${hash}`;

// We used to just store a single email.
const legacyLocalStorageKey = "ace-unhashed-email";

export const useUnhashedEmail = (
  hash: string | null | undefined,
): string | null => {
  const [unhashed, setUnhashed] = useState<string | null>(null);

  useEffect(() => {
    setUnhashed(null); // Clear previous.
    if (hash) {
      getEmailForHash(hash).then((newUnhashed) => setUnhashed(newUnhashed));
    }
  }, [hash]);

  return unhashed;
};

/**
 * Saves an association of this email with its hash in local storage, so that we
 * can always display the email to the user locally.
 */
export const saveUnhashedEmail = (email: string): void => {
  // Suppress the promise; this is supposed to be a "set it and forget it
  // operation".  It's always assumed that storage might fail!
  hashEmail(email).then((hash) =>
    safeLocalStorage.setItem(makeKey(hash), email),
  );
};

/**
 * Clears all saved unhashed emails from local storage.
 *
 * It's necessary to do this on explicit logout for privacy.
 */
export const clearSavedUnhashedEmails = (): void => {
  // Remove the legacy key, if any.
  safeLocalStorage.removeItem(legacyLocalStorageKey);

  // Iterate through the storage and delete any other hash-related keys.  Save
  // keys in an array and delete after this loop because I don't know what
  // mutating local storage during this loop will do to its length.
  const keysToRemove: string[] = [];
  for (let i = 0; i < safeLocalStorage.length; i++) {
    const key = safeLocalStorage.key(i);
    if (key?.startsWith(localStoragePrefix)) {
      keysToRemove.push(key);
    }
  }
  for (const key of keysToRemove) {
    safeLocalStorage.removeItem(key);
  }
};

const getEmailForHash = async (hash: string): Promise<null | string> => {
  if (isValidEmail(hash)) {
    // Already unhashed!
    return hash;
  }

  // Find an email address in storage.
  const storedEmail =
    safeLocalStorage.getItem(makeKey(hash)) ||
    safeLocalStorage.getItem(legacyLocalStorageKey);

  // If there's nothing stored then we don't know!
  if (!storedEmail) {
    return null;
  }

  // NOTE: The following is necessary for the legacy logic, because in legacy
  // mode, we only have an email address in the storage without knowing the
  // corresponding hash.  However, the following is also useful for the new
  // logic, because it validates that whatever email address is stored in local
  // storage for this hash _actually_ correctly matches this hash.

  // Hash that stored email address.
  const hashOfStoredEmail = await hashEmail(storedEmail);
  // Does it match the hash we're checking?  If so, we're good!
  if (hashOfStoredEmail === hash) {
    return storedEmail;
  }
  // If not, we still don't know.
  return null;
};

// Re-implement the hashing function for calculation in the browser.
export const hashEmail = async (email: string): Promise<string> => {
  if (!email.includes("@")) {
    // It appears to be hashed already!
    return email;
  }

  email = email.toLowerCase();
  const msgBuffer = new TextEncoder().encode(email);
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgBuffer);
  let binary = "";
  for (const byte of new Uint8Array(hashBuffer)) {
    binary += String.fromCharCode(byte);
  }
  const base64 = window.btoa(binary);
  const base64url = base64
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  return base64url;
};
