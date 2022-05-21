import { gdocToZip } from "~/gdocToZip";

export function testgdocToText() {
  const doc = DocumentApp.getActiveDocument();
  const zipFile = gdocToZip(doc);
  DriveApp.getFolderById("1nlpJV8pU0FwyhBUoG2ngCulalaDuh9Gt").createFile(
    zipFile
  );
}

export { gdocToZip } from "~/gdocToZip";
export { gdocToAST } from "~/gdocToAST";
export { gdocToMarkdown } from "~/gdocToMarkdown";
export { gdocToText } from "~/gdocToText";
