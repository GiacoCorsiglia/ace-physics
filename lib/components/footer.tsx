import * as urls from "@/urls";
import Link from "next/link";
import styles from "./footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        <Link href="/">Home</Link>
        &nbsp; · &nbsp;
        <Link href={urls.Privacy.link}>Privacy</Link>
        &nbsp; · &nbsp;
        <a
          href="https://www.physport.org/curricula/ACEQM/"
          target="_blank"
          rel="noopener noreferrer"
        >
          ACEQM on PhysPort
        </a>
      </p>

      <p>
        &copy; 2020–{new Date().getFullYear()}&nbsp;Giaco&nbsp;Corsiglia,
        Benjamin&nbsp;P.&nbsp;Schermerhorn, Gina&nbsp;Passante,
        Homeyra&nbsp;Sadaghiani, and Steven&nbsp;Pollock
      </p>
    </footer>
  );
};
