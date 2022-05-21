import type { BasicElement } from "~/gdocToAST";

type GdocParagraghElement = GoogleAppsScript.Document.Paragraph;
type ParagraphElement = BasicElement<"paragraph", GdocParagraghElement>;

const mapParagraph: (el: GdocParagraghElement) => ParagraphElement = (el) => {
  const gdocElm = el;
  return { type: "paragraph", gdocElm };
};

export { mapParagraph };
export type { ParagraphElement };
