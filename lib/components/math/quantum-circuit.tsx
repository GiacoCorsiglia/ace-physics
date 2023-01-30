import {
  combineRefs,
  cx,
  Html,
  styled,
  useActualSiblingCheck,
  useAncestorBackgroundColor,
} from "@/helpers/client";
import { memo } from "react";
import { M } from "./m";
import styles from "./quantum-circuit.module.scss";

/**
 * A shitty implementation of the QCircuit LaTeX package using KaTeX plus custom
 * HTML/CSS.
 *
 * https://mirror2.sandyriver.net/pub/ctan/graphics/qcircuit/qcircuit.pdf
 */
export const QuantumCircuit = memo(function QuantumCircuit({
  t: tex,
}: {
  t: string;
}) {
  const [siblingRef, classes] = useActualSiblingCheck<HTMLTableElement>(
    () => true,
    []
  );

  const [bgRef, backgroundColor] =
    useAncestorBackgroundColor<HTMLTableElement>();

  const cells = parse(tex);

  // TODO: Using a real <table> produces invalid DOM nesting when used inside
  // <Prose>...but we want <td rowspan> so there's not much we can do.  Maybe we
  // could switch to grid?
  return (
    <table
      className={cx(styles.quantumCircuit, classes)}
      ref={combineRefs(siblingRef, bgRef)}
      style={
        backgroundColor
          ? ({
              "--circuit-ancestor-background": backgroundColor,
            } as React.CSSProperties)
          : undefined
      }
    >
      {cells.map((row, i) => (
        <tr key={i}>
          {row.map((cell, j) => (
            <Cell key={j} cell={cell} />
          ))}
        </tr>
      ))}
    </table>
  );
});

const CellType = <U extends object>(o: CellType<U>) => o;
interface CellType<U extends object> {
  pattern: RegExp;

  create(match: RegExpMatchArray): U;

  sharedOptions?(
    options: U,
    sharedOptions: SharedCellOptions
  ): SharedCellOptions;

  render(options: U): {
    rowSpan?: number;
    tableElement?: JSX.Element | null;
    element?: JSX.Element | null;
    gridElement?: JSX.Element;

    tex?: string;
    content?: Html;
    hasWireRight?: boolean;
    hasWireLeft?: boolean;
    align?: "left" | "right";
  };
}

const Ctrl = CellType({
  pattern: /\\ctrl\{\s*(-?\d+)\s*\}/,

  create(match) {
    return {
      rows: parseInt(match[1], 10),
    };
  },

  sharedOptions(options, sharedOptions) {
    if (options.rows > 0) {
      sharedOptions.verticalWireBelow = options.rows;
    } else {
      sharedOptions.verticalWireAbove = Math.abs(options.rows);
    }
    return sharedOptions;
  },

  render() {
    return {
      content: <span className={styles.ctrl} />,
    };
  },
});

const Gate = CellType({
  pattern: /\\gate\{(.*)\}/,

  create(match) {
    return {
      tex: match[1].trim(),
    };
  },

  render(options) {
    return {
      content: (
        <span className={styles.gate}>
          <M t={options.tex} />
        </span>
      ),
    };
  },
});

const Ghost = CellType({
  pattern: /\\ghost(?:$|\s*|\{.*\})?/,

  create() {
    return {};
  },

  render(options) {
    return {
      tableElement: null,
    };
  },
});

const MultiGate = CellType({
  pattern: /\\multigate\{\s*(-?\d+)\s*\}\{(.*)\}/,

  create(match) {
    return {
      rows: parseInt(match[1]) + 1,
      tex: match[2].trim(),
    };
  },

  render(options) {
    return {
      rowSpan: options.rows,
      element: (
        <>
          <span className={styles.multiGateLines}>
            <span />
            <span className={styles.multiGateBorder} />
            <span />
          </span>

          <span className={cx(styles.multiGateContent)}>
            <M t={options.tex} />
          </span>
        </>
      ),
    };
  },
});

const Qw = CellType({
  pattern: /\\qw(?:\s|$)/,

  create() {
    return {};
  },

  render() {
    return {
      gridElement: <HorizontalWireGrid />,
    };
  },
});

const Stick = CellType({
  pattern: /\\(l|r)stick\{(.*)\}/,

  create(match) {
    return {
      where: match[1] as "l" | "r",
      tex: match[2].trim(),
    };
  },

  render(options) {
    return {
      tex: options.tex,
      hasWireLeft: options.where !== "l",
      hasWireRight: options.where !== "r",
      align: options.where === "l" ? "right" : "left",
    };
  },
});

const Targ = CellType({
  pattern: /\\targ(?:\s|$)/,

  create() {
    return {};
  },

  render() {
    return {
      content: <span className={styles.targ} />,
    };
  },
});

const Unknown = CellType({
  pattern: /.*/,

  create(match) {
    return {
      tex: match[0],
    };
  },

  render(options) {
    return options;
  },
});

const cellTypes = {
  Ctrl,
  Gate,
  Ghost,
  MultiGate,
  Qw,
  Stick,
  Targ,
  Unknown,
}; // TODO: satisfies Record<string, CellType<any>>

interface SharedCellOptions {
  verticalWireAbove: number;
  verticalWireBelow: number;

  borderTop: boolean;
  borderRight: boolean;
  borderBottom: boolean;
  borderLeft: boolean;
}
interface ICell<T extends string, U extends object> extends SharedCellOptions {
  type: T;
  options: U;
}
type CellTypes = typeof cellTypes;
type Cells = {
  [K in keyof CellTypes]: CellTypes[K] extends CellType<infer T>
    ? ICell<K, T>
    : never;
};
type Cell = Cells[keyof Cells];

const knownCellTypes = Object.entries(cellTypes).filter(
  ([, cellType]) => cellType !== Unknown
);

const parseTypedCell = (
  tex: string,
  sharedOptions: SharedCellOptions
): Cell => {
  for (const [type, cellType] of knownCellTypes) {
    const match = tex.match(cellType.pattern);
    if (match) {
      const options = cellType.create(match);
      sharedOptions =
        cellType.sharedOptions?.(options as any, sharedOptions) ??
        sharedOptions;

      return {
        type: type,
        options,
        ...sharedOptions,
      } as Cell;
    }
  }

  return {
    type: "Unknown",
    options: Unknown.create([tex]),
    ...sharedOptions,
  };
};

const qwx = /\\qwx(?:\[\s*(-?\d+)\s*\])?(?:\s|$)/g;

const parseCell = (tex: string): Cell => {
  tex = tex.trim();

  // Parse \qwx commands (and remove them from the tex).
  let verticalWireAbove = 0;
  let verticalWireBelow = 0;
  tex = tex.replace(qwx, (_, rowsString) => {
    const rows = parseInt(rowsString || -1);
    if (rows < 0) {
      verticalWireAbove = Math.abs(rows);
    } else {
      verticalWireBelow = rows;
    }
    return "";
  });

  return parseTypedCell(tex.trim(), {
    borderTop: false,
    borderRight: false,
    borderBottom: false,
    borderLeft: false,
    verticalWireAbove,
    verticalWireBelow,
  });
};

const parseCells = (tex: string): Cell[][] =>
  // Split on new line command, \\, then on new column command, &.
  tex.split("\\\\").map((line) =>
    line
      .split("&")
      .filter((line) => !!line.trim())
      .map(parseCell)
  );

/**
 * Finds the cell that will be actually rendered at (row, col), accounting for
 * \ghost and \multigate.
 */
const findCell = (
  cells: Cell[][],
  row: number,
  col: number
): Cell | undefined => {
  let cell = cells[row]?.[col];

  while (cell?.type === "Ghost") {
    cell = cells[row - 1]?.[col];
  }

  return cell;
};

const attachRows = (cells: Cell[][]): void => {
  for (let row = 0; row < cells.length; row++) {
    for (let col = 0; col < cells[row].length; col++) {
      const cell = cells[row][col];

      if (cell.verticalWireAbove > 0) {
        const end = Math.max(row - cell.verticalWireAbove - 1, 0);
        for (let i = row - 1; i > end; i--) {
          const aboveCell = findCell(cells, i, col);

          if (!aboveCell) {
            continue;
          }

          aboveCell.verticalWireBelow = Math.max(
            1,
            aboveCell.verticalWireBelow
          );

          if (i > end + 1) {
            aboveCell.verticalWireAbove = Math.max(
              1,
              aboveCell.verticalWireAbove
            );
          }
        }
      }

      if (cell.verticalWireBelow > 0) {
        const end = Math.min(row + cell.verticalWireBelow + 1, cells.length);
        for (let i = row + 1; i < end; i++) {
          const belowCell = findCell(cells, i, col);

          if (!belowCell) {
            continue;
          }

          belowCell.verticalWireAbove = Math.max(
            1,
            belowCell.verticalWireAbove
          );

          if (i < end - 1) {
            belowCell.verticalWireBelow = Math.max(
              1,
              belowCell.verticalWireBelow
            );
          }
        }
      }
    }
  }
};

// \gategroup{#1: row 1}{#2: row 2}{#3: col 1}{#4: col 2}{#5: space}{#6: style}
// We currently ignore space and style options.
const gateGroup =
  /\\gategroup\{(\d+)\}\{(\d+)\}\{(\d+)\}\{(\d+)\}\{(.*)\}\{(.*)\}/g;

interface GateGroup {
  fromRow: number;
  toRow: number;
  fromCol: number;
  toCol: number;
}

// TODO: This doesn't work correctly with multi-gates, because the wrong
// adjacent horizontal wire <td> elements get borders.
const handleGateGroups = (cells: Cell[][], gateGroups: GateGroup[]) => {
  for (const gateGroup of gateGroups) {
    for (let row = gateGroup.fromRow; row <= gateGroup.toRow; row++) {
      const leftCell = findCell(cells, row, gateGroup.fromCol);
      if (leftCell) {
        leftCell.borderLeft = true;
      }
      const rightCell = findCell(cells, row, gateGroup.toCol);
      if (rightCell) {
        rightCell.borderRight = true;
      }
    }

    for (let col = gateGroup.fromCol; col <= gateGroup.toCol; col++) {
      const topCell = findCell(cells, gateGroup.fromRow, col);
      if (topCell) {
        topCell.borderTop = true;
      }
      const bottomCell = findCell(cells, gateGroup.toRow, col);
      if (bottomCell) {
        bottomCell.borderBottom = true;
      }
    }
  }
};

// TODO: Match "% foo" but not "\% foo" via negative lookbehind.
// /(?<!\\)\%.*/g
// but this isn't supported in safari.
const comment = /\%.*/g;

const parse = (tex: string): Cell[][] => {
  // Remove comments.
  tex = tex.replace(comment, "");

  const gateGroups: GateGroup[] = [];

  tex = tex.replace(gateGroup, (_, fromRow, toRow, fromCol, toCol) => {
    gateGroups.push({
      // Convert from 1-indexing to 0-indexing.
      fromRow: parseInt(fromRow) - 1,
      toRow: parseInt(toRow) - 1,
      fromCol: parseInt(fromCol) - 1,
      toCol: parseInt(toCol) - 1,
    });

    return "";
  });

  const cells = parseCells(tex);

  attachRows(cells);

  handleGateGroups(cells, gateGroups);

  return cells;
};

const Cell = ({ cell }: { cell: Cell }) => {
  const cellType = cellTypes[cell.type];

  const renderOptions = cellType.render(cell.options as any);

  const { hasWireLeft = true, hasWireRight = true } = renderOptions;
  const hasWireAbove = cell.verticalWireAbove > 0;
  const hasWireBelow = cell.verticalWireBelow > 0;

  const gridElement = renderOptions.gridElement ?? (
    <span>
      {renderOptions.tex ? (
        <span className={styles.renderedTex}>
          <M t={renderOptions.tex} />
        </span>
      ) : (
        renderOptions.content
      )}
    </span>
  );

  const element =
    "tableElement" in renderOptions ? (
      renderOptions.tableElement
    ) : (
      <td
        rowSpan={renderOptions.rowSpan}
        className={cx(
          styles.cell,
          hasWireAbove && styles.hasWireAbove,
          hasWireBelow && styles.hasWireBelow,
          cell.borderTop && styles.borderTop,
          cell.borderBottom && styles.borderBottom
        )}
      >
        {renderOptions.element || (
          <span
            className={cx(
              styles.cellContent,
              renderOptions.align === "left" && styles.alignLeft,
              renderOptions.align === "right" && styles.alignRight
            )}
          >
            {hasWireLeft ? <HorizontalWireGrid /> : <span />}
            {gridElement}
            {hasWireRight ? <HorizontalWireGrid /> : <span />}
          </span>
        )}
      </td>
    );

  return (
    <>
      {hasWireLeft ? (
        <HorizontalWireCell
          className={cx(
            cell.borderLeft && styles.borderLeft,
            cell.borderTop && styles.borderTop,
            cell.borderBottom && styles.borderBottom
          )}
        />
      ) : (
        <td />
      )}

      {element}

      {hasWireRight ? (
        <HorizontalWireCell
          className={cx(
            cell.borderRight && styles.borderRight,
            cell.borderTop && styles.borderTop,
            cell.borderBottom && styles.borderBottom
          )}
        />
      ) : (
        <td />
      )}
    </>
  );
};

const HorizontalWireCell = ({ className }: { className?: string }) => (
  <td className={cx(styles.horizontalWireCell, className)}>
    <HorizontalWire />
  </td>
);

const HorizontalWireGrid = () => (
  <span className={styles.horizontalWireGrid}>
    <HorizontalWire />
  </span>
);

const HorizontalWire = styled.span(styles.horizontalWire);
const VerticalWire = styled.span(styles.verticalWire);
