import { gdocToText } from "~/gdocToText";

const gdocToBlobs = (doc: GoogleAppsScript.Document.Document) => {
  const name = doc.getName().split(".")[0];
  let imageCounter = 0;
  let images: GoogleAppsScript.Base.Blob[] = [];
  const text = gdocToText(doc, {
    image: (item, children, parents) => {
      imageCounter++;
      const ext = item.contentType.split("/")[1];
      const filename = `${name}/image${imageCounter}.${ext}`;
      const image = item.blob.setName(filename);
      images.push(image);
      return `![${name}](${filename})`;
    },
    table: (item, children, parents) => `\n\n${children.join("")}\n\n`,
    tableRow: (item, children, parents) => {
      if (item.first && item.last)
        return `\n\n::: {.note}\n${children.join("")}\n:::\n\n`;
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
  return [textFile, ...images];
};

export { gdocToBlobs };
