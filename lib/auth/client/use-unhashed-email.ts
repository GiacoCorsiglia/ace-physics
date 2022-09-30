import { isValidEmail, safeLocalStorage } from "@/helpers/client";
import { asyncResult } from "@/result";
import { useEffect, useState } from "react";

const localStorageKey = "ace-unhashed-email";

export const useUnhashedEmail = (
  hash: string | null | undefined
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

export const saveUnhashedEmail = (email: string) =>
  safeLocalStorage.setItem(localStorageKey, email);

export const clearSavedUnhashedEmail = () =>
  safeLocalStorage.removeItem(localStorageKey);

const getEmailForHash = async (hash: string): Promise<null | string> => {
  if (isValidEmail(hash)) {
    // Already unhashed!
    return hash;
  }

  const stored = safeLocalStorage.getItem(localStorageKey);
  if (!stored) {
    return null;
  }

  const storedHash = await asyncResult(hashEmail(stored));
  if (storedHash.failed) {
    return null;
  }
  if (storedHash.value === hash) {
    return stored;
  }
  return null;
};

// Re-implement the hashing function for calculation in the browser.
const hashEmail = async (email: string): Promise<string> => {
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
