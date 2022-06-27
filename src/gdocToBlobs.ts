import { gdocToText } from "~/gdocToText";

type ImageInfo = {
  contentType: string;
  alt: string;
  width: number;
  bytes: number[];
};

const imageProcessor = (dirname: string) => {
  let imageCounter = 0;
  let images: GoogleAppsScript.Base.Blob[] = [];
  const addImage = ({ contentType, alt, bytes, width }: ImageInfo) => {
    imageCounter++;
    const ext = contentType.split("/")[1];
    const filename = `${dirname}/image${imageCounter}.${ext}`;
    const image = Utilities.newBlob(bytes).setName(filename);
    images.push(image);
    return `![${alt}](${filename}){width=${width}}`;
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
      return addImage({ ...item, alt: name });
    },
    table: (item, children, parents) => `${children.join("")}\n`,
    tableRow: (item, children, parents) => {
      if (item.monoCell) return `::: {.note}\n${children.join("")}\n:::\n`;
      const split = item.first ? `|${" -- |".repeat(children.length)}\n` : "";
      return `| ${children.join(" | ")} |\n${split}`;
    },
    tableCell: (item, children, parents) =>
      children.join("").trim().replaceAll("\n|\r", "<br>"),
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
