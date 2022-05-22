import { gdocToZip as _gdocToZip } from "~/gdocToZip";
import { gdocToAST as _gdocToAST } from "~/gdocToAST";
import { gdocToMarkdown as _gdocToMarkdown, Mapper } from "~/gdocToMarkdown";
import { gdocToText as _gdocToText } from "~/gdocToText";
import { gdocToBlobs as _gdocToBlobs } from "~/gdocToBlobs";

export function gdocToZip(doc: GoogleAppsScript.Document.Document) {
  return _gdocToZip(doc);
}

export function gdocToBlobs(doc: GoogleAppsScript.Document.Document) {
  return _gdocToBlobs(doc);
}

export function gdocToAST(doc: GoogleAppsScript.Document.Document) {
  return _gdocToAST(doc);
}

export function gdocToMarkdown(
  doc: GoogleAppsScript.Document.Document,
  mapper?: Mapper
) {
  return _gdocToMarkdown(doc, mapper);
}

export function gdocToText(
  doc: GoogleAppsScript.Document.Document,
  mapper?: Mapper
) {
  return _gdocToText(doc, mapper);
}
