import type { GdocElement, GdocElementType, BasicElement } from "~/gdocToAST";

type OtherElement = BasicElement<"other"> & {
  gdocElm: GdocElement;
  isContainer: boolean;
  gdocType: GdocElementType;
};

const mapOther = (gdocElm: GdocElement, isContainer: boolean) => {
  return {
    type: "other",
    isContainer,
    gdocType: gdocElm.getType().toString(),
  } as OtherElement;
};

export { mapOther };
export type { OtherElement };
