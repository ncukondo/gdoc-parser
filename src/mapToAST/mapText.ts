import { fold } from "~/utils";
import type { BasicElement } from "~/gdocToAST";

type TextAttr = "bold" | "italic" | "strikethrough";
type TextElement = BasicElement<"text", GoogleAppsScript.Document.Text> & {
  attrs: { start: number; end: number; attrs: TextAttr[]; link?: string }[];
  text: string;
};

const pairWise = <T>(arr: T[]) =>
  arr.flatMap((v, i) => (i === 0 ? [] : [[arr[i - 1], v]])) as [T, T][];

const getTextAttrs = (el: GoogleAppsScript.Document.Text) => {
  const text = el.getText();
  const paired = pairWise([...el.getTextAttributeIndices(), text.length]).map(
    ([start, end]) => {
      const attrs: TextAttr[] = [
        el.isBold(start) ? "bold" : false,
        el.isStrikethrough(start) ? "strikethrough" : false,
        el.isItalic(start) ? "italic" : false,
      ].filter((x): x is TextAttr => Boolean(x));
      const link = el.getLinkUrl() || undefined;
      return { start, end, attrs, link };
    }
  );
  return fold(paired, (curr, prev) => {
    return (
      curr.link === prev.link &&
      curr.attrs.length === prev.attrs.length &&
      curr.attrs.every((a) => prev.attrs.includes(a))
    );
  }).map((folded) => {
    const head = folded[0];
    const last = folded.slice(-1)[0];
    return { ...head, end: last.end };
  });
};

const mapText = (el: GoogleAppsScript.Document.Text) => {
  const text = el.getText();
  const attrs = getTextAttrs(el);
  return {
    type: "text",
    text,
    attrs,
    gdocElm: el,
  } as TextElement;
};

export { mapText };
export type { TextElement };
