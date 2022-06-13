import type { BasicElement } from "~/gdocToAST";

type GdocParagraghElement = GoogleAppsScript.Document.Paragraph;
type HeadingElement = BasicElement<"heading"> & {
  level: number;
};

const mapHeading: (el: GdocParagraghElement) => HeadingElement = (el) => {
  const heading = el.getHeading();
  const level = Number(heading.toString().slice(7));
  return { type: "heading", level };
};

export { mapHeading };
export type { HeadingElement };
