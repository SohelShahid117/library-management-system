const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const { MongoClient, ServerApiVersion } = require("mongodb");
//connect with mongodb

require("dotenv").config();
// console.log(process.env);
// console.log(process.env.MONGODB_URl);

/*
const uri =
  "mongodb+srv://sohelshahid09:5QYJoCjMgHeicc1T@library-management-system.88n1mrb.mongodb.net/?retryWrites=true&w=majority&appName=library-management-system";
*/
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
    console.log(db);
    const booksCollection = db.collection("books");

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
