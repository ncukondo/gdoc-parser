import type { BasicElement } from "~/gdocToAST";

type GdocListElement = GoogleAppsScript.Document.ListItem;
type ListElement = BasicElement<"list"> & {
  listType: ListType;
  first: boolean;
  last: boolean;
};
type ListType = "ordered" | "unordered";

const isOrderedList = (el: GdocListElement) => {
  return [
    DocumentApp.GlyphType.NUMBER,
    DocumentApp.GlyphType.ROMAN_LOWER,
    DocumentApp.GlyphType.ROMAN_UPPER,
    DocumentApp.GlyphType.LATIN_LOWER,
    DocumentApp.GlyphType.LATIN_UPPER,
  ].includes(el.getGlyphType());
};

const mapList = (el: GdocListElement) => {
  const first =
    el.getPreviousSibling()?.getType() !== DocumentApp.ElementType.LIST_ITEM;
  const last =
    el.getNextSibling()?.getType() !== DocumentApp.ElementType.LIST_ITEM;
  const listType: ListType = isOrderedList(el) ? "ordered" : "unordered";
  return { type: "list", first, last, listType } as ListElement;
};

export { mapList };
export type { ListElement };
