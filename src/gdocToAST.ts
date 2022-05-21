import { range } from "~/utils";
import { mapTree } from "~/libs/treeUtils";
import type { Tree } from "~/libs/treeUtils";
import { mapText } from "~/mapToAST/mapText";
import type { TextElement } from "~/mapToAST/mapText";
import { mapOther, mapOtherContainer } from "~/mapToAST/mapOther";
import type {
  OtherContainerElement,
  OtherLeafElement,
} from "~/mapToAST/mapOther";
import { mapList } from "~/mapToAST/mapList";
import type { ListElement } from "~/mapToAST/mapList";
import {
  mapTable,
  mapTableCell,
  mapTableRow,
  TableCellElement,
  TableElement,
  TableRowElement,
} from "~/mapToAST/mapTable";
import type { HeadingElement } from "~/mapToAST/mapHeading";
import { mapHeading } from "~/mapToAST/mapHeading";
import type { ParagraphElement } from "~/mapToAST/mapParagragh";
import { mapParagraph } from "~/mapToAST/mapParagragh";
import { ImageElement, mapImage } from "~/mapToAST/mapImage";
import { mapBody } from "~/mapToAST/mapBody";
import type { BodyElement } from "~/mapToAST/mapBody";

type Document = GoogleAppsScript.Document.Document;
type GdocElement = GoogleAppsScript.Document.Element;
type ContainerElement = GdocElement & {
  getNumChildren(): number;
  getChild(childIndex: number): GoogleAppsScript.Document.Element;
};
type GdocElementType = keyof typeof DocumentApp.ElementType;
type BasicElement<T extends string, U extends GdocElement> = {
  type: T;
  gdocElm: U;
};

type Element =
  | TextElement
  | OtherLeafElement
  | OtherContainerElement
  | ListElement
  | TableCellElement
  | TableElement
  | TableRowElement
  | HeadingElement
  | ParagraphElement
  | ImageElement
  | BodyElement;

const childElements = <E extends ContainerElement>(element: E) => {
  const num = element.getNumChildren();
  return range(num).map((i) => element.getChild(i));
};

function isContainer(el: GdocElement): el is ContainerElement {
  return "getNumChildren" in el && "getChild" in el;
}

const getType = (el: GdocElement) => {
  const type = `${el.getType()}` as GdocElementType;
  const heading =
    type === "PARAGRAPH" ? `${el.asParagraph().getHeading()}` : "";
  if (heading.startsWith("HEADING")) return "HEADING";
  return type;
};

const mapToAST = (tree: Tree<GdocElement>) => {
  return mapTree<GdocElement, Element>(tree, (item, parents, hasChildren) => {
    const itemType = getType(item);
    const text = itemType === "TEXT" ? item.asText().getText() : "";
    console.log(parents.map((p) => "  ").join("") + itemType + ": " + text);
    switch (itemType) {
      case "TEXT":
        return mapText(item.asText());
      case "LIST_ITEM":
        return mapList(item.asListItem());
      case "TABLE":
        return mapTable(item.asTable());
      case "TABLE_ROW":
        return mapTableRow(item.asTableRow());
      case "TABLE_CELL":
        return mapTableCell(item.asTableCell());
      case "HEADING":
        return mapHeading(item.asParagraph());
      case "PARAGRAPH":
        return mapParagraph(item.asParagraph());
      case "INLINE_IMAGE":
        return mapImage(item.asInlineImage());
      case "BODY_SECTION":
        return mapBody(item.asBody());
    }
    return isContainer(item) ? mapOtherContainer(item) : mapOther(item);
  });
};

const gd2RawTree = (doc: Document) => {
  const walk = (elms: readonly GdocElement[]): Tree<GdocElement> => {
    return elms.map((e) => {
      return isContainer(e) ? ([e, walk(childElements(e))] as const) : [e];
    });
  };
  return walk([doc.getBody()]);
};

const gdocToAST = (doc: Document) => {
  const rawTree = gd2RawTree(doc);
  return mapToAST(rawTree);
};

export { gdocToAST };
export type { BasicElement, GdocElement, ContainerElement, Element };
