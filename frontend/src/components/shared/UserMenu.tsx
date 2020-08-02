import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatId, useAccount, useLogout } from "src/account";
import { Login } from "src/urls";
import { Prose } from "..";
import styles from "./UserMenu.module.scss";

export function UserMenu() {
  const account = useAccount();
  const logout = useLogout();

  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className={styles.userIcon} onClick={() => setOpen((o) => !o)}>
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
          />
        </svg>
      </div>

      <div
        className={styles.userMenu}
        style={{ display: open ? "block" : "none" }}
      >
        {account.isLoggedIn && (
          <Prose noMargin>
            <p>
              You’re currently logged in with the account code:{" "}
              <strong>{formatId(account.learner.learnerId)}</strong>
            </p>

            {!account.isForCredit && (
              <p>
                Your work will <strong>not</strong> count for any course credit
              </p>
            )}

            <p>
              <Link to={`${Login.link}?logout=yes`} onClick={logout}>
                Log out
              </Link>
            </p>
          </Prose>
        )}

        {!account.isLoggedIn && (
          <Prose noMargin>
            <Link to={Login.link}>Log in</Link>
          </Prose>
        )}
      </div>
    </div>
  );
}
