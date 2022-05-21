import type { BasicElement, GdocElement, ContainerElement } from "~/gdocToAST";

type OtherLeafElement = BasicElement<"other", GdocElement> & {
  gdocType: string;
};
type OtherContainerElement = BasicElement<"container", ContainerElement> & {
  gdocType: string;
};

const mapOther = (gdocElm: GdocElement) => {
  return {
    type: "other",
    gdocElm,
    gdocType: gdocElm.getType().toString(),
  } as OtherLeafElement;
};

const mapOtherContainer = (gdocElm: ContainerElement) => {
  return {
    type: "container",
    gdocElm,
    gdocType: gdocElm.getType().toString(),
  } as OtherContainerElement;
};

export { mapOther, mapOtherContainer };
export type { OtherContainerElement, OtherLeafElement };
