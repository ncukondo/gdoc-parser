import type { BasicElement } from "~/gdocToAST";

type GdocParagraghElement = GoogleAppsScript.Document.Paragraph;
type ParagraphElement = BasicElement<"paragraph"> & {
  newlinesBefore: number;
  newlinesAfter: number;
};

const mapParagraph: (el: GdocParagraghElement) => ParagraphElement = (el) => {
  const text = el.editAsText().getText();
  const newlinesBefore = /^((\n|\r)*)./.exec(text)?.[1].length || 0;
  const newlinesAfter = /(\n|\r)*$/.exec(text)[0].length;
  return {
    type: "paragraph",
    newlinesAfter,
    newlinesBefore,
  };
};

export { mapParagraph };
export type { ParagraphElement };
