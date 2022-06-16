import type { BasicElement } from "~/gdocToAST";

type GdocImageElement = GoogleAppsScript.Document.InlineImage;
type ImageElement = BasicElement<"image"> & {
  name: string;
  contentType: string;
  width: number;
  height: number;
  bytes: number[];
};

const mapImage: (el: GdocImageElement) => ImageElement = (el) => {
  const bytes = el.getBlob().getBytes();
  const contentType = el.getBlob().getContentType();
  const name = el.getBlob().getName() ?? "";
  const width = el.getWidth();
  const height = el.getHeight();
  return { type: "image", bytes, name, contentType, width, height };
};

export { mapImage };
export type { ImageElement };
