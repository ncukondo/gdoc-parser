import { gdocToAST, Element } from "~/gdocToAST";
import { reduceTree } from "~/libs/treeUtils";

type Mapper = Partial<{
  [key in Element["type"]]: (
    item: Element & { type: key },
    children: string[],
    parents: Element[]
  ) => string;
}>;

const repeat = (char: string, len: number) =>
  [...Array(len)].map((_) => char).join("");

const gdocToText = (
  doc: GoogleAppsScript.Document.Document,
  mapper: Mapper = {}
) => {
  const ast = gdocToAST(doc);
  const text = reduceTree<Element, string>(ast, (item, children, parents) => {
    if (item.type in mapper)
      // @ts-ignore
      return mapper[item.type](item, children, parents) as string;
    switch (item.type) {
      case "text":
        return item.text;
      case "heading":
        const heading = `${repeat("#", item.level)} `;
        const title = children.join("");
        return title ? `${heading}${title}\n\n` : "";
      case "paragraph":
        const paraText = children.join("");
        return parents.length <= 2 && paraText !== ""
          ? `${paraText}\n\n`
          : paraText;
      case "list":
        const mark = item.listType === "ordered" ? "1." : "-";
        const listText = item.last
          ? `${children.join("")}\n\n`
          : `${children.join("")}\n`;
        return `${mark} ${listText}`;
      case "image":
        return `![${item.name || "image"}](type:${item.contentType})`;
      case "other":
        switch (item.gdocType) {
          case "PAGE_BREAK":
            return "\n\n___\n\n";
        }
        return `other :[${item.gdocType}(isContainer:${item.isContainer})]`;
    }
    return children.join("");
  }).join("");
  return text;
};

export { gdocToText };
export type { Mapper };
