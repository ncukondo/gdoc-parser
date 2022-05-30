import type { BasicElement } from "~/gdocToAST";

type GdocTableElement = GoogleAppsScript.Document.Table;
type GdocTableRowElement = GoogleAppsScript.Document.TableRow;
type GdocTableCellElement = GoogleAppsScript.Document.TableCell;
type TableElement = BasicElement<"table", GdocTableElement>;
type TableRowElement = BasicElement<"tableRow", GdocTableRowElement> & {
  first: boolean;
  last: boolean;
};
type TableCellElement = BasicElement<"tableCell", GdocTableCellElement> & {
  monoCell: boolean;
};

const mapTable: (el: GdocTableElement) => TableElement = (el) => {
  const gdocElm = el;
  return { type: "table", gdocElm };
};

const mapTableRow: (el: GdocTableRowElement) => TableRowElement = (el) => {
  const gdocElm = el;
  const first =
    el.getPreviousSibling()?.getType().toString() !== "TABLE_ROW" ?? false;
  const last =
    el.getNextSibling()?.getType().toString() !== "TABLE_ROW" ?? false;
  return { type: "tableRow", gdocElm, first, last };
};
const mapTableCell: (el: GdocTableCellElement) => TableCellElement = (el) => {
  const gdocElm = el;
  const row = el?.getParent();
  const monoRow =
    row?.getPreviousSibling()?.getType().toString() !== "TABLE_ROW" &&
    row?.getNextSibling()?.getType().toString() !== "TABLE_ROW";
  const monoCell =
    el.getPreviousSibling()?.getType().toString() !== "TABLE_CELL" &&
    el.getNextSibling()?.getType().toString() !== "TABLE_CELL";
  return { type: "tableCell", gdocElm, monoCell: monoRow && monoCell };
};
export { mapTable, mapTableRow, mapTableCell };
export type { TableCellElement, TableElement, TableRowElement };
