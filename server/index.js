const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const {
  MongoClient,
  ServerApiVersion,
  OrderedBulkOperation,
  ObjectId,
} = require("mongodb");
const cors = require("cors");
require("dotenv").config();

//connect with mongodb
// console.log(process.env);
// console.log(process.env.MONGODB_URl);

/*
const uri =
  "mongodb+srv://sohelshahid09:5QYJoCjMgHeicc1T@library-management-system.88n1mrb.mongodb.net/?retryWrites=true&w=majority&appName=library-management-system";
*/

//middleware
app.use(express.json());
app.use(cors());
//cors:cross origin resource sharing

const uri = process.env.MONGODB_URl;
// console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //create db & collection
    const db = client.db("library-management-system");
    // console.log(db);
    const booksCollection = db.collection("books");

    //create a book with POST request
    app.post("/books", async (req, res) => {
      const bookData = req.body;
      try {
        // console.log(bookData);
        const book = await booksCollection.insertOne(bookData);
        // res.status(201).json(book);
        res.status(201).json({ message: "book inserted successfully", book });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    //get all books(GET)
    app.get("/books", async (req, res) => {
      //filtering info
      try {
        const {
          page,
          limit,
          genre,
          minYear,
          maxYear,
          price,
          minPrice,
          maxPrice,
          sortBy,
          order,
          search,
          author,
        } = req.query;
        //pagination
        const currentPage = Math.max(1, parseInt(page) || 1);
        const perPage = parseInt(limit) || 10;
        const skip = (currentPage - 1) * perPage;

        const filter = {};
        if (search) {
          filter.$or = [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ];
        }
        if (genre) {
          filter.genre = genre;
        }
        if (minYear || maxYear) {
          filter.publishedYear = {
            ...(minYear && { $gte: parseInt(minYear) }),
            ...(maxYear && { $lte: parseInt(maxYear) }),
          };
        }
        if (author) {
          filter.author = author;
        }
        if (minPrice || maxPrice) {
          filter.price = {
            ...(minPrice && { $gte: parseFloat(minPrice) }),
            ...(maxPrice && { $lte: parseFloat(maxPrice) }),
          };
        }

        const sortOptions = { [sortBy || "title"]: order == "desc" ? -1 : 1 };

        const [books, totalBooks] = await Promise.all([
          booksCollection
            .find(filter)
            .sort(sortOptions)
            .skip(skip)
            .limit(perPage)
            .toArray(),
          booksCollection.countDocuments(filter),
        ]);
        res.json({
          books,
          totalBooks,
          currentPage,
          totalPages: Math.ceil(totalBooks / perPage),
        });
      } catch (error) {
        res.status(500).json({ error: "wrong" });
        // res.status(500).json({ error: error.message });
      }
      // const books = await booksCollection.find().toArray();
      /*
        const books = await booksCollection
          .find(filter)
          .sort(sortOptions)
          .skip(skip)
          .limit(perPage)
          .toArray();
          */
    });

    //get a book by id
    app.get("/books/:id", async (req, res) => {
      const bookId = req.params.id;
      try {
        const book = await booksCollection.findOne({
          _id: new ObjectId(bookId),
        });
        if (!book) {
          return res.status(404).json({ message: "book not found" });
        }
        res.json(book);
      } catch (error) {
        res.status(500).json({ error: "wrong" });
      }
    });

    //update a book(PUT)
    app.put("/books/:id", async (req, res) => {
      const bookId = req.params.id;
      try {
        const updateBook = await booksCollection.updateOne(
          {
            _id: new ObjectId(bookId),
          },
          { $set: req.body }
        );
        res.json(updateBook);
      } catch (error) {
        res.status(500).json({ error: "wrong" });
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Welcome to Book Management API");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}.Enjoy MERN project`);
});

//mongodb userId + pw
//sohelshahid09
//5QYJoCjMgHeicc1T
/*mongodb+srv://sohelshahid09:5QYJoCjMgHeicc1T@library-management-syst.88n1mrb.mongodb.net/?retryWrites=true&w=majority&appName=library-management-system*/
