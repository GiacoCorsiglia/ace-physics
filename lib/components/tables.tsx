import { cx } from "@/helpers/css";
import { forwardRef } from "react";
import styles from "./tables.module.scss";

type TableProps = {
  /** Width of each column, in fr units. */
  columns?: readonly number[];
} & JSX.IntrinsicElements["table"];

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  { columns, children, ...props },
  ref
) {
  const columnWidthSum = columns
    ? columns.reduce((sum, cur) => sum + cur, 0)
    : 0;

  return (
    <table className={cx(styles.table, props.className)} ref={ref}>
      {columns && (
        <colgroup>
          {columns.map((width, i) => (
            <col
              key={i}
              style={{ width: `${(width / columnWidthSum) * 100}%` }}
            />
          ))}
        </colgroup>
      )}

      {children}
    </table>
  );
});
