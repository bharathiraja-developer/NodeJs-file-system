const express = require("express");
const app = express();
const fs = require("fs");

const HOSTNAME = "127.0.0.1";
const PORT = 3000;

let content = new Date().toISOString();
let date = content.slice(0, 10);
let time = content.slice(11, 19).split(":").join("-");

// API endpoint to create a text file
app.get("/", (request, response) => {
  fs.writeFile(
    `./Text-files/${date}-${time}.txt`,
    content,
    { flag: "w+" },
    (err) => {
      if (err) console.log(err);
      response.send({ message: "File created succesfully" });
    }
  );
});

// API endpoint to retrieve all the text files
app.get("/retrieve", (request, response) => {
  fs.readdir("./Text-files", (err, files) => {
    if (err) console.log(err);

    // print all the file name along with the content of the file
    files.forEach((file) => {
      response.write("<p>File name: " + file + "</p>");
      fs.readFile(`./Text-files/${file}`, "utf-8", (err, data) => {
        if (err) console.log(err);
        console.log(`File Name : ${file} Content : ${data}`);
      });
    });
    //end the response process
    response.end();
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}`);
});
