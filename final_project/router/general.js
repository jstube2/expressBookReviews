const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  
  const p1 = new Promise((resolve, reject) => {
    resolve(JSON.stringify(books,null,4));
    reject("Error");
  });
  
  p1.then(
    (value) => {
    res.send(value);
      console.log(value); // Success!
    },
    (reason) => {
      console.log(reason); // Error!
    },
  );
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    //res.send(books[isbn])
    const p1 = new Promise((resolve, reject) => {
        resolve(books[isbn]);
        reject("Error");
      });
      
      p1.then(
        (value) => {
        res.send(value);
          console.log(value); // Success!
        },
        (reason) => {
          console.log(reason); // Error!
        },
      );
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    
    const p1 = new Promise((resolve, reject) => {
        let book = {};
        for (let key in books){
            console.log(key);
            if(books[key].author == author){
                resolve(book[key] = books[key]);
            }
          };
        reject("Error");
      });
      
      p1.then(
        (value) => {
        res.send(value);
          console.log(value); // Success!
        },
        (reason) => {
          console.log(reason); // Error!
        },
      );
    /*
    for (let key in books){
        console.log(key);
        if(books[key].author == author){
            book[key] = books[key];
        }
      }
      res.send(book);
      */
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const p1 = new Promise((resolve, reject) => {
        console.log(title);
        let book = {};
        for (let key in books){
            console.log(key);
            if(books[key].title == title){
                resolve(book[key] = books[key]);
            }
          };
        reject("Error");
      });
      
      p1.then(
        (value) => {
        res.send(value);
          console.log(value); // Success!
        },
        (reason) => {
          console.log(reason); // Error!
        },
      );
    /*
    let book = {};

    for (let key in books){
        if(books[key].title == title){
            book[key] = books[key];
        }
      }
      res.send(book);
      */
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    console.log(isbn);
    res.send(books[isbn].reviews)
});

module.exports.general = public_users;
