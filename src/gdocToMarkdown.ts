import { gdocToAST, Element } from "~/gdocToAST";
import { reduceTree } from "~/libs/treeUtils";

type Mapper = Partial<{
  [key in Element["type"]]: (
    item: Element & { type: key },
    children: string[],
    parents: Element[]
  ) => string;
}>;

const gdocToMarkdown = (
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
        const heading = `${[...Array(item.level)].map((_) => "#").join("")} `;
        const title = children.join("");
        return title ? `\n\n${heading}${title}\n\n` : "";
      case "paragraph":
        return parents.length <= 2
          ? `\n\n${children.join("")}\n\n`
          : children.join("");
      case "list":
        return `- ${children.join("")}\n`;
      case "image":
        return `![${item.name || "image"}](type:${item.contentType})`;
      case "other":
        return `other :[${item.gdocType}]`;
      case "table":
        return `\n\n${children.join("")}\n\n`;
      case "tableRow":
        if (item.first && item.last)
          return `\n\n::: {.note}\n${children.join("")}\n:::\n\n`;
        const split = item.first
          ? `| ${children.map((v) => "").join("-- | --")} |\n`
          : "";
        return `| ${children.join(" | ")} |\n${split}`;
      case "tableCell":
        return `${children.join("")}`;
    }
    return children.join("");
  }).join("");
  return text;
};

export { gdocToMarkdown };
export type { Mapper };
