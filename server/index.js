const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const { MongoClient, ServerApiVersion } = require("mongodb");
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
console.log(uri);

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
      const {
        page,
        limit,
        genre,
        minYear,
        maxYear,
        minPrice,
        maxPrice,
        sortBy,
        order,
        search,
      } = req.query;
      try {
        //pagination
        const currentPage = Math.max(1, parseInt(page) || 1);
        const perPage = parseInt(limit) || 10;
        const skip = (currentPage - 1) * perPage;

        const filter = {};
        if (search) {
          filter.$or = [
            {
              title: { $regex: search, $options: "i" },
              description: { $regex: search, $options: "i" },
            },
          ];
        }

        // const books = await booksCollection.find().toArray();
        const books = await booksCollection.find(filter).toArray();
        res.status(201).json({ books });
      } catch (error) {
        res.status(500).json({ error: error.message });
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
