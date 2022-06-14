import { gdocToText } from "~/gdocToText";

const imageProcessor = (dirname: string) => {
  let imageCounter = 0;
  let images: GoogleAppsScript.Base.Blob[] = [];
  const addImage = (mimeType: string, alt: string, bytes: number[]) => {
    imageCounter++;
    const ext = mimeType.split("/")[1];
    const filename = `${dirname}/image${imageCounter}.${ext}`;
    const image = Utilities.newBlob(bytes).setName(filename);
    images.push(image);
    return `![${alt}](${filename})`;
  };
  const getImages = () => {
    return [...images];
  };
  return { addImage, getImages };
};

const extractMetaInfo = (text: string) => {
  const reg = /^--- *$(.+?)^--- *$/gms;
  const meta = [...text.matchAll(reg)]
    .map((v) => v[1])
    .join("")
    .replaceAll(/^\n/gm, "");
  const rest = text.replaceAll(reg, "");
  return { text: rest, metaInfo: meta };
};

const gdocToBlobs = (
  doc: GoogleAppsScript.Document.Document,
  filename: string = ""
) => {
  const name = filename || doc.getName().split(".")[0];
  const { addImage, getImages } = imageProcessor(name);
  const text = gdocToText(doc, {
    image: (item, children, parents) => {
      return addImage(item.contentType, name, item.bytes);
    },
    table: (item, children, parents) => `${children.join("")}\n`,
    tableRow: (item, children, parents) => {
      if (item.monoCell) return `::: {.note}\n${children.join("")}\n:::\n`;
      const split = item.first ? `|${" -- |".repeat(children.length)}\n` : "";
      return `| ${children.join(" | ")} |\n${split}`;
    },
    tableCell: (item, children, parents) =>
      children.join("").trim().replaceAll("\n", "<br>"),
  });
  const resText = text.replace(/\n\n+/gm, "\n\n");
  const { text: markdownText, metaInfo } = extractMetaInfo(resText);
  console.log(markdownText);
  const markdown = Utilities.newBlob(
    markdownText,
    "text/markdown",
    `${name}.md`
  );
  const meta = Utilities.newBlob(metaInfo, "text/plain", `${name}/meta.yaml`);
  return [markdown, meta, ...getImages()];
};

export { gdocToBlobs };
