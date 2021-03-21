import * as urls from "@/urls";
import Link from "next/link";
import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <hr />

      <p>
        &copy; {new Date().getFullYear()}&nbsp;Giaco&nbsp;Corsiglia,
        Benjamin&nbsp;P.&nbsp;Schermerhorn, Steven&nbsp;Pollock,
        Gina&nbsp;Passante, and Homeyra&nbsp;Sadaghiani
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
};
