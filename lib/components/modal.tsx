import { Html, useBodyScrollLock, useUniqueId } from "@/helpers/client";
import { createPortal } from "react-dom";
import styles from "./modal.module.scss";

const portalElement =
  typeof window !== "undefined" ? document.getElementById("ace-modal") : null;

export const Modal = ({
  children,
  title,
  actions,
}: {
  children?: Html;
  title: Html;
  actions?: Html;
}) => {
  const id = useUniqueId();

  useBodyScrollLock();

  if (!portalElement) {
    // Should just be in SSR.
    return null;
  }

  const headerId = `${id}-header`;
  const contentId = `${id}-content`;

  return createPortal(
    <div>
      <div className={styles.background} />

      <div className={styles.container}>
        <section
          className={styles.modal}
          role="dialog"
          tabIndex={-1}
          aria-modal="true"
          aria-labelledby={headerId}
          aria-describedby={contentId}
        >
          <header id={headerId} className={styles.title}>
            {title}
          </header>

          <main id={contentId} className={styles.content}>
            {children}
          </main>

          {actions && <footer className={styles.actions}>{actions}</footer>}
        </section>
      </div>
    </div>,
    portalElement,
  );
};
