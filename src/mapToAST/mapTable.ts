import type { BasicElement } from "~/gdocToAST";

type GdocTableElement = GoogleAppsScript.Document.Table;
type GdocTableRowElement = GoogleAppsScript.Document.TableRow;
type GdocTableCellElement = GoogleAppsScript.Document.TableCell;
type TableElement = BasicElement<"table">;
type TableRowElement = BasicElement<"tableRow"> & {
  first: boolean;
  last: boolean;
};
type TableCellElement = BasicElement<"tableCell"> & {
  monoCell: boolean;
};

const mapTable: (el: GdocTableElement) => TableElement = (el) => {
  return { type: "table" };
};

const mapTableRow: (el: GdocTableRowElement) => TableRowElement = (el) => {
  const first =
    el.getPreviousSibling()?.getType().toString() !== "TABLE_ROW" ?? false;
  const last =
    el.getNextSibling()?.getType().toString() !== "TABLE_ROW" ?? false;
  return { type: "tableRow", first, last };
};
const mapTableCell: (el: GdocTableCellElement) => TableCellElement = (el) => {
  const row = el?.getParent();
  const monoRow =
    row?.getPreviousSibling()?.getType().toString() !== "TABLE_ROW" &&
    row?.getNextSibling()?.getType().toString() !== "TABLE_ROW";
  const monoCell =
    el.getPreviousSibling()?.getType().toString() !== "TABLE_CELL" &&
    el.getNextSibling()?.getType().toString() !== "TABLE_CELL";
  return { type: "tableCell", monoCell: monoRow && monoCell };
};
export { mapTable, mapTableRow, mapTableCell };
export type { TableCellElement, TableElement, TableRowElement };
