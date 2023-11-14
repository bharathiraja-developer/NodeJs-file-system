const express = require("express");
const app = express();
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 3000;

let content = new Date().toISOString();
let date = content.slice(0, 10);
let time = content.slice(11, 19).split(":").join("-");

// API endpoint to create a text file
fs.writeFile(
  `./Text-files/${date}-${time}.txt`,
  content,
  { flag: "w+" },
  (err) => {
    if (err) console.log(err);
  }
);

// API endpoint to retrieve all the text files
fs.readdir("./Text-files", (err, files) => {
  if (err) console.log(err);

  // print all the file name along with the content of the file
  files.forEach((file) => {
    fs.readFile(`./Text-files/${file}`, "utf-8", (err, data) => {
      if (err) console.log(err);
      console.log(`File Name : ${file} Content : ${data}`);
    });
  });
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});