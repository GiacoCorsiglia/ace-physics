import styles from "./macros.module.scss";

// This removes the need for double backslashes in the macro definitions below.
const t = String.raw;

export const macros = {
  "\\e": t`{\rm e}`,
  "\\and": t`\;\, \text{and} \;\;`,
  // Units:
  "\\unit": t`\,\text{#1}`,
  "\\expval": t`\langle#1\rangle`,

  // Matrices.
  "\\pmatrix": t`\!\begin{pmatrix}#1\end{pmatrix}`,

  // Some exports from the physics package:
  "\\vu": t`\mathbf{\hat{#1}}`,
  "\\vb": t`\mathbf{#1}`,
  // The braces around {#3} here seem to improve the spacing.  An alternative is
  // to use the `\!` command for negative space as in \brasub.
  "\\prescript": t`{}_{#1}^{#2}{#3}`,
  "\\brasub": t`{}_{#1}\!`,

  // From the quantum mouse tutorial:
  "\\smalleye": t`\htmlClass{${styles.smalleye}}{\tiny \bull}`,
  "\\wideye": t`\htmlClass{${styles.wideye}}{\large \ast}`,
  "\\smiley": t`\htmlClass{${styles.smiley}}{\mathbf{\footnotesize \ddot \smile}}`,
  "\\frownie": t`\htmlClass{${styles.smiley}}{\mathbf{\footnotesize \ddot \frown}}`,

  // Formatting:

  // Puts the contained elements on their own line if the screen is narrow.
  //
  // NOTE: Because of KaTeX behavior, you must wrap the preceding and following
  // TeX in curly braces for this to work properly.  For example:
  // {left side} \breakIfNarrow{=} {right side}
  "\\breakIfNarrow": t`\htmlClass{${styles.breakIfNarrow}}{#1}`,
};
