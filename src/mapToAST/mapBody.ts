import type { BasicElement } from "~/gdocToAST";

type GdocBodyElement = GoogleAppsScript.Document.Body;
type BodyElement = BasicElement<"body">;

const mapBody: (el: GdocBodyElement) => BodyElement = (el) => {
  return { type: "body" };
};

export { mapBody };
export type { BodyElement };
