// test gdoc-parser from https://script.google.com/home/projects/1U8EJiwIHHVtTJxR95EX5mirZMWkarT67T9b9UdrOblHxEys_GgiZKavm/edit
function testgdocToText() {
  const doc = DocumentApp.getActiveDocument();
  const zipFile = gdocToBlobs(doc);
  //DriveApp.getFolderById("18UrL1MYBHdKdh2GW6f5oLoFKGnK2y0Yk").createFile(zipFile);
}
