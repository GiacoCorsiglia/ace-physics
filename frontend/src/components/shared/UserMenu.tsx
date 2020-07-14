import React, { useState } from "react";
import styles from "./UserMenu.module.scss";

export function UserMenu() {
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
        This will hold the menu that lets you log in, etc.
      </div>
    </div>
  );
}
