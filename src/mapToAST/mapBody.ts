import type { BasicElement } from "~/gdocToAST";

type GdocBodyElement = GoogleAppsScript.Document.Body;
type BodyElement = BasicElement<"body", GdocBodyElement>;

const mapBody: (el: GdocBodyElement) => BodyElement = (el) => {
  const gdocElm = el;
  return { type: "body", gdocElm };
};

export { mapBody };
export type { BodyElement };
