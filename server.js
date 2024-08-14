const express = require('express');
const app = express();
const port = 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://anjujulopes:QXl7bT2ITiWpm6xF@cluster0.4tbpi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.use(express.json());

app.post('/mensagem', async (req, res) => {
  try {
    await client.connect();
    const database = client.db("nomeDoBancoDeDados");  // Substitua pelo nome do seu banco de dados
    const collection = database.collection("nomeDaColecao");  // Substitua pelo nome da sua coleção

    const message = req.body;
    const result = await collection.insertOne(message);

    res.status(201).json({ insertedId: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});



/*const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://anjujulopes:<password>@cluster0.4tbpi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);*/


