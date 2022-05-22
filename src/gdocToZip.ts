import { gdocToBlobs } from "~/gdocToBlobs";

const gdocToZip = (doc: GoogleAppsScript.Document.Document) => {
  const name = doc.getName().split(".")[0];
  const zipfile = Utilities.zip(gdocToBlobs(doc), `${name}.zip`);
  return zipfile;
};

export { gdocToZip };
