import type { BasicElement } from "~/gdocToAST";

type GdocParagraghElement = GoogleAppsScript.Document.Paragraph;
type HeadingElement = BasicElement<"heading", GdocParagraghElement> & {
  level: number;
};

const mapHeading: (el: GdocParagraghElement) => HeadingElement = (el) => {
  const heading = el.getHeading();
  const level = Number(heading.toString().slice(7));
  const gdocElm = el;
  return { type: "heading", gdocElm, level };
};

export { mapHeading };
export type { HeadingElement };
