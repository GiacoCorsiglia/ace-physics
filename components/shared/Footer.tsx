import Link from "next/link";
import * as urls from "services/urls";
import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <hr />

      <p>
        &copy; {new Date().getFullYear()} Giaco Corsiglia, Benjamin P.
        Schermerhorn, Steven Pollock, Gina Passante, and Homeyra Sadaghiani
      </p>

      <p>
        <Link href={urls.Privacy.link}>Privacy</Link>
        &nbsp; · &nbsp;
        <a
          href="https://www.physport.org/curricula/ACEQM/"
          target="_blank"
          rel="noopener noreferrer"
        >
          ACEQM
        </a>
      </p>
    </footer>
  );
}
