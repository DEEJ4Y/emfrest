# Express Mongoose Fast REST API

Quickly build RESTful APIs with Express and Mongoose.

[Documentation](https://deej4y.github.io/emfrest/)

[Github](https://github.com/DEEJ4Y/emfrest)

[npm](https://www.npmjs.com/package/emfrest)

Have a look at the list of [service and utility functions](https://deej4y.github.io/emfrest/list_namespace.html) and other [middleware and global functions](https://deej4y.github.io/emfrest/global.html#methods).

## Installation

```sh
npm i emfrest
```

This also installs express and mongoose, so you can dive right into making your API.

## Usage

### Basic

Create an API using `emfAPI`.

```js
const { emfAPI } = require("emfrest");

emfAPI(app, { model: Book, modelName: "book" });
```

Add your mongoose model as `model`, the example uses a model called `Book`.

Also give it a `modelName`. The example uses `modelName` as `book`. This creates your routes at `/books`. Make sure this is singular and unique among your routes.

For every `emfAPI` you create, you will get the following routes:

| Method | Route          |
| :----- | :------------- |
| GET    | /books         |
| POST   | /books         |
| GET    | /books/:bookId |
| PUT    | /books/:bookId |
| DELETE | /books/:bookId |

### Add to an existing app

Note: App should be connected to a database. App should also be able to read json data from requests (`body-parser` or `express.json()`).

1. Require `emfAPI` and `errorHandler` from `emfrest`

   ```js
   const { emfAPI, errorHandler } = require("emfrest");
   ```

2. Add the `errorHandler` middleware at the end of your app, before `app.listen()`.

   ```js
   app.use(errorHandler);
   ```

3. Create an API using `emfAPI`.

   ```js
   emfAPI(app, { model: Book, modelName: "book" });
   ```

   Add your mongoose model as `model`, the example uses a model called `Book`.

   Also give it a `modelName`. The example uses `modelName` as `book`. This creates your routes at `/books`. Make sure this is singular and unique among your routes.

4. Start your server. It should show the following line on startup

   ```plain
   Initialized api for book at /books
   ```

### From scratch

1. Create a file `server.js`.
2. Add your express boilerplate code.

   ```js
   const express = require("express");

   const app = express();

   app.use(express.json());

   app.get("/", (req, res) => {
     res.json({ success: true, message: "Check your api endpoint" });
   });

   const PORT = process.env.PORT || 3000;
   const server = app.listen(PORT, () =>
     console.log(`Server started on port ${PORT}`)
   );
   ```

3. Connect to MongoDB

   ```js
   const {
     emfAPI,
     connectDB,
     errorHandler,
     handlePromiseRejections,
   } = require("emfrest");

   connectDB("mongodb://localhost:27017/library");
   ```

   You can use a connection string of your choice.

   We will use `emfAPI`, `errorHandler` and `handlePromiseRejections` later.

4. Create your schema and mongoose model.

   ```js
   const mongoose = require("mongoose");

   const BookSchema = new mongoose.Schema({
     name: {
       type: String,
     },
     description: {
       type: String,
     },
   });

   const Book = mongoose.model("Book", BookSchema);
   ```

5. Add the `errorHandler` middleware at the end of your app, before `app.listen()`.

   ```js
   app.use(errorHandler);
   ```

6. Create an API using `emfAPI`.

   ```js
   emfAPI(app, { model: Book, modelName: "book" });
   ```

   Add your mongoose model as `model`, the example uses a model called `Book`.

   Also give it a `modelName`. The example uses `modelName` as `book`. This creates your routes at `/books`. Make sure this is singular and unique among your routes.

7. Handle promise rejections

   ```js
   handlePromiseRejections(server);
   ```

Your code should now look like this:

```js
const express = require("express");
const {
  emfAPI,
  connectDB,
  errorHandler,
  handlePromiseRejections,
} = require("emfrest");

connectDB("mongodb://localhost:27017/library");

const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Book = mongoose.model("Book", BookSchema);

const app = express();

app.use(express.json());

emfAPI(app, { model: Book, modelName: "book" });

app.get("/", (req, res) => {
  res.json({ success: true, message: "Check your api endpoint" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);

handlePromiseRejections(server);
```

## Reusable Functions

### Services

Service functions are used to make calls to your MongoDB database using your mongoose model.

1. [Get All documents of a model with a query(optional).](https://deej4y.github.io/emfrest/services.html#.exports.getAllService)
2. [Create a document.](https://deej4y.github.io/emfrest/services.html#.exports.createResourceService)
3. [Get a document by its ObjectId.](https://deej4y.github.io/emfrest/services.html#.exports.getOneByIdService)
4. [Update a document by its ObjectId.](https://deej4y.github.io/emfrest/services.html#.exports.updateOneByIdService)
5. [Delete a document by its ObjectId.](https://deej4y.github.io/emfrest/services.html#.exports.deleteByIdService)

### Utilities

Utility functions to code faster

1. [Create an error object with a message and http status code](https://deej4y.github.io/emfrest/utils.html#exports.ErrorResponse).
2. [Connect to a MongoDB database](https://deej4y.github.io/emfrest/utils.html#.exports.connectDB).
3. [Promise rejection handler](https://deej4y.github.io/emfrest/utils.html#.exports.handlePromiseRejections).

## Liked emfrest?

Enjoyed making your APIs faster? Star [efmrest](https://github.com/DEEJ4Y/emfrest) on [Github](https://github.com/DEEJ4Y/emfrest).
