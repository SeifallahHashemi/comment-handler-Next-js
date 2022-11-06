import {MongoClient} from "mongodb";

export const connectDatabase = async () => {
    const uri = "mongodb+srv://max:NhMHyUf6yBf09Jbj@cluster0.flbfk7t.mongodb.net/?retryWrites=true&w=majority";
    const client = await MongoClient.connect(uri);
    return client;
}
export const insertDocument = async (client ,collection ,document) => {
    const db = client.db('events');
    // await db.collection('emails').insertOne(document)
    const result = await db.collection(collection).insertOne(document);

    return result
}
export const getAllDocuments = async (client, collection, sort, filter = {}) => {
    const db = client.db('events');
    const documents = await db.collection(collection).find(filter).sort(sort).toArray();

    return documents;
}