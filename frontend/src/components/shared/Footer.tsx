import React from "react";
import { Link } from "react-router-dom";
import * as urls from "src/urls";
import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        &copy; {new Date().getFullYear()} Giaco Corsiglia, Benjamin P.
        Schermerhorn, Steven Pollock, Gina Passante, and Homeyra Sadaghiani
      </p>

      <p>
        <Link to={urls.Privacy.link}>Privacy</Link>
      </p>
    </footer>
  );
}
