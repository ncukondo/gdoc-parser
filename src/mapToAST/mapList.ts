import type { BasicElement } from "~/gdocToAST";

type GdocListElement = GoogleAppsScript.Document.ListItem;
type ListElement = BasicElement<"list", GdocListElement> & {
  listType: ListType;
  first: boolean;
  last: boolean;
};
type ListType = "ordered" | "unordered";

const isOrderedList = (el: GdocListElement) => {
  return (
    el.getGlyphType() ===
    (DocumentApp.GlyphType.NUMBER ||
      DocumentApp.GlyphType.ROMAN_LOWER ||
      DocumentApp.GlyphType.ROMAN_UPPER ||
      DocumentApp.GlyphType.LATIN_LOWER ||
      DocumentApp.GlyphType.LATIN_UPPER)
  );
};

const mapList = (el: GdocListElement) => {
  const first =
    el.getPreviousSibling()?.getType() !== DocumentApp.ElementType.LIST_ITEM;
  const last =
    el.getNextSibling()?.getType() !== DocumentApp.ElementType.LIST_ITEM;
  const listType: ListType = isOrderedList(el) ? "ordered" : "unordered";
  const gdocElm = el;
  return { type: "list", gdocElm, first, last, listType } as ListElement;
};

export { mapList };
export type { ListElement };
