import { gdocToAST, Element } from "~/gdocToAST";
import { reduceTree } from "~/libs/treeUtils";

type Mapper = Partial<{
  [key in Element["type"]]: (
    item: Element & { type: key },
    children: string[],
    parents: Element[]
  ) => string;
}>;

const isInInlineParagragh = (parents: Element[]) => {
  if (parents.length <= 1) return false;
  const parent = parents[parents.length - 1];
  if (parent.type === "tableCell" && parent.monoCell) return false;
  return parent.type === "tableCell" || parent.type === "list";
};

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
        const heading = "#".repeat(item.level) + ` `;
        const title = children.join("");
        return title ? `\n${heading}${title}\n\n` : "";
      case "paragraph":
        const paraText = children.join("");
        return paraText + "\n";
      case "list":
        const mark = item.listType === "ordered" ? "1." : "-";
        const listText = children.join("").trim().replaceAll("\n", "<br>");
        return `${item.first ? "\n" : ""}${mark} ${listText}\n${
          item.last ? "\n" : ""
        }`;
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
