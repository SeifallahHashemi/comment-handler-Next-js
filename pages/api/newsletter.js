// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {MongoClient, ServerApiVersion } from 'mongodb';

const connectDatabase = async () => {
  const uri = "mongodb+srv://max:NhMHyUf6yBf09Jbj@cluster0.flbfk7t.mongodb.net/?retryWrites=true&w=majority";
  const client = await MongoClient.connect(uri);
  return client;
}
const insertDocument = async (client, document) => {
  const db = client.db('events');
  await db.collection('emails').insertOne(document)
}
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.'})
      return
    }
    /*const uri = "mongodb+srv://max:NhMHyUf6yBf09Jbj@cluster0.flbfk7t.mongodb.net/?retryWrites=true&w=majority";
    const client = await MongoClient.connect(uri);
      const db = client.db('events');
      await db.collection('emails').insertOne({ email: userEmail})
    await client.close();*/
    let client;
    try {
      client = await connectDatabase()
    } catch (error) {
      res.status(500).json({message: 'connecting to the database failed!'})
      return
    }
    try {
      await insertDocument(client,{email: userEmail})
      await client.close()
    } catch (error) {
      res.status(500).json({message: 'inserting data failed!'})
      return
    }
    /*const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: {
      version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      } });
    client.connect(err => {
      const collection = client.db("newsletter").collection("email");
      console.log('connected')
      // perform actions on the collection object
      collection.insertOne({email: userEmail}).then(res => console.log('data inserted successfully'))
      client.close()
    });*/
    console.log(userEmail)
    res.status(201).json({ message: 'signed up!'})
  } else {
      res.status(200).json({ name: 'John Doe' })
  }
}
