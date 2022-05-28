import { gdocToText } from "~/gdocToText";

const imageProcessor = (dirname: string) => {
  let imageCounter = 0;
  let images: GoogleAppsScript.Base.Blob[] = [];
  const addImage = (
    mimeType: string,
    alt: string,
    blob: GoogleAppsScript.Base.Blob
  ) => {
    imageCounter++;
    const ext = mimeType.split("/")[1];
    const filename = `${dirname}/image${imageCounter}.${ext}`;
    const image = blob.setName(filename);
    images.push(image);
    return `![${alt}](${filename})`;
  };
  const getImages = () => {
    return [...images];
  };
  return { addImage, getImages };
};

const gdocToBlobs = (doc: GoogleAppsScript.Document.Document) => {
  const name = doc.getName().split(".")[0];
  const { addImage, getImages } = imageProcessor(name);
  const text = gdocToText(doc, {
    image: (item, children, parents) => {
      return addImage(item.contentType, name, item.blob);
    },
    table: (item, children, parents) => `${children.join("")}\n`,
    tableRow: (item, children, parents) => {
      if (item.first && item.last)
        return `::: {.note}\n${children.join("")}\n:::\n`;
      const split = item.first
        ? `| ${children.map((v) => "").join("-- | --")} |\n`
        : "";
      return `| ${children.join(" | ")} |\n${split}`;
    },
    tableCell: (item, children, parents) => `${children.join("")}`,
  });
  const resText = text.replace(/\n\n+/gm, "\n\n");
  console.log(resText);
  const textFile = Utilities.newBlob(resText, "text/plain", `${name}.txt`);
  return [textFile, ...getImages()];
};

export { gdocToBlobs };
