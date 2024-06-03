const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
const app = express();


app.use(cors());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const dbUrl ="mongodb+srv://bintangrestub:ZQbRY9ruiQ1KXEPC@cluster0.ghm6lt6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose
  .connect(dbUrl)
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