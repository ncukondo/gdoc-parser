const fs = require("fs");
require("dotenv").config();

const clasp_json = {
  scriptId: process.env.CLASP_SCRIPT_ID,
  rootDir: "dist",
};
fs.writeFileSync(".clasp.json", JSON.stringify(clasp_json, null, 2));
console.log("made .clasp.json");
