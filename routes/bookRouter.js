const express = require('express');

const routes = (Book) => {  
const bookRouter = express.Router();

bookRouter.route('/books')
  .post((req, res) => {
    const book = new Book(req.body);
    book.save();
    return res.status(201).json(book);
  })
  .get((req, res) => {
    Book.find((error, books) => {
      if(error) {
        return res.send(error);
      }
      return res.json(books);
    })  
});

bookRouter.route('/books/type')
  .get((req, res) => {
    const query = {};
    if(req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, (error, books) => {
      if(error) {
        return res.send(error);
      }
      return res.json(books);
    })
  })

bookRouter.use('/books/:bookId', (req, res, next) => {
  Book.findById(req.params.bookId, (error, book) => {
    if(error) {
      return res.send(error);
    }
    if(book) {
      res.book = book;
      return next();
    }
    return res.sendStatus(404);
  })
})

bookRouter.route('/books/:bookId')
  .get((req, res) => {
    return res.json(res.book);
  })

  .put((req, res) => {
    const { title, genre, author, read } = req.body;
    const { book } = res;
      book.title = title;
      book.genre = genre;
      book.author = author;
      book.read = read;

      res.book.save((error) => {
        if(error) {
          return res.send(error);
        }
        return res.json(book);
      });
    })

  .patch((req, res) => {
    const { book } = res;
    if(req.body._id) {
      delete req.body._id;
    }
    Object.entries(req.body).forEach((item) => {
      const key = item[0];
      const value = item[1];
      book[key] = value;
    });
    res.book.save((error) => {
      if(error) {
        return res.send(error);
      }
      return res.json(book);
    });
  })
  
  .delete((req, res) => {
    res.book.remove((error) => {
      if(error) {
        return res.send(error);
      }
      return res.sendStatus(204);
    })
  });

  return bookRouter;
}

module.exports = routes;