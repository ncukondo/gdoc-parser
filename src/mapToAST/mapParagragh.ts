import type { BasicElement } from "~/gdocToAST";

type GdocParagraghElement = GoogleAppsScript.Document.Paragraph;
type ParagraphElement = BasicElement<"paragraph">;

const mapParagraph: (el: GdocParagraghElement) => ParagraphElement = (el) => {
  return { type: "paragraph" };
};

export { mapParagraph };
export type { ParagraphElement };
