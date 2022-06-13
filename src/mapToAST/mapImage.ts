import type { BasicElement } from "~/gdocToAST";

type GdocImageElement = GoogleAppsScript.Document.InlineImage;
type ImageElement = BasicElement<"image"> & {
  name: string;
  contentType: string;
  bytes: number[];
};

const mapImage: (el: GdocImageElement) => ImageElement = (el) => {
  const bytes = el.getBlob().getBytes();
  const contentType = el.getBlob().getContentType();
  const name = el.getBlob().getName() ?? "";
  return { type: "image", bytes, name, contentType };
};

export { mapImage };
export type { ImageElement };
