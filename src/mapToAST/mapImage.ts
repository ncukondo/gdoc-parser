import type { BasicElement } from "~/gdocToAST";

type GdocImageElement = GoogleAppsScript.Document.InlineImage;
type ImageElement = BasicElement<"image", GdocImageElement> & {
  name: string;
  contentType: string;
  blob: GoogleAppsScript.Base.Blob;
};

const mapImage: (el: GdocImageElement) => ImageElement = (el) => {
  const blob = el.getBlob();
  const contentType = blob.getContentType();
  const name = blob.getName() ?? "";
  const gdocElm = el;
  return { type: "image", gdocElm, blob, name, contentType };
};

export { mapImage };
export type { ImageElement };
