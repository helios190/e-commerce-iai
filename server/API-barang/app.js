const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const http = require('http');
const { BlobServiceClient } = require('@azure/storage-blob');
dotenv.config();
// const session = require("express-session");


const sasToken = process.env.BLOB_SAS_TOKEN;
const credentials = require("./credentials.js");
const app = express();


const accountName = 'iaiblobdb'
const containerName = 'iai-blob-ecom'
const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net/?${sasToken}`);
const containerClient = blobServiceClient.getContainerClient(containerName);
const dbUrl ="mongodb+srv://bintangrestub:ZQbRY9ruiQ1KXEPC@cluster0.ghm6lt6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
// app.use(session({ secret: "mysecret" }));

const routes = require("./routes/index");
app.use("/api", routes);
app.use((req, res) => {
  res.status(404);
  res.send("404");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});