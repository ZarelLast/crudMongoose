const dbConnected = require("debug")("app:dbConnected");
const dataSended = require("debug")("app:dataSended");
const mongoose = require("mongoose");
const Express = require("express");
const App = Express();
const BodyParser = require("body-parser");
App.use(BodyParser.json());
App.use(BodyParser.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://localhost:32768/books", { useNewUrlParser: true })
  .then(() => {
    // dbConnected("Database Connected..."); //cli export DEBUG=app:dbConnected
    console.log("DB Connected ....");
  })
  .catch(err => {
    console.log(err);
  });

const bookScema = new mongoose.Schema({
  title: String,
  author: String,
  Description: String,
  pages: Number,
  price: Number,
  type: String,
  tag: [String],
  isPublish: Boolean
});

const Books = mongoose.model("books", bookScema);

// Create Books
async function __createBooks() {
  const Book = new Books({
    title: "Legenda Orang Hilang",
    author: "orang",
    Description: "Orang Hilang",
    pages: 324,
    price: 299000,
    type: "Novel",
    tag: ["horror", "scfi"],
    isPublish: 1
  });

  const result = await Book.save();
  // dataSended(result);
  console.log(result);
}

App.get("/api/buku", (req, res) => {
 Books.find().then(book=>{
    res.send(book);
    console.log(book);
  })

});

App.listen(8000);
