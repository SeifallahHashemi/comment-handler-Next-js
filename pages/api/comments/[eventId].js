// import {MongoClient} from 'mongodb';
import {connectDatabase, getAllDocuments, insertDocument} from "../../../helpers/db-utils";

export default async function handler(req, res) {
    // const uri = "mongodb+srv://max:NhMHyUf6yBf09Jbj@cluster0.flbfk7t.mongodb.net/?retryWrites=true&w=majority";
    // const client = await MongoClient.connect(uri);
    let client;
    try {
        client = await connectDatabase();
    } catch (e) {
        res.status(500).json({message: 'connected to database failed !'})
        return
    }

    const eventId = req.query.eventId;
    if (req.method === 'POST') {
        const {email, name, text} = req.body;
        if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
            res.status(422).json({message: 'Invalid Input !'})
            await client.close();
            return
        }
        console.log(email, text, name);
        // const uid = Math.random().toString(32);
        const newComment = {
            name,
            email,
            text,
            eventId
        }
        let result;
        try {
            result = await insertDocument(client, 'comments', newComment);
            newComment._id = result.insertedId;
            res.status(201).json({message: 'Added new Comment.', comment: newComment})
        } catch (e) {
            res.status(500).json({message: 'inserting data failed !'})
        }
        // const db = client.db('events');
        // const result = await db.collection('comments').insertOne(newComment)
        // console.log(result);
        /*newComment._id = result.insertedId;
        res.status(201).json({message: 'Added new Comment.', comment: newComment})*/
    }
    if (req.method === 'GET') {
        try {
            const documents = await getAllDocuments(client, 'comments', {_id: -1}, {eventId: eventId});
            res.status(200).json({comments: documents})
        } catch (e) {
            res.status(500).json({message: 'Getting data failed !'})
        }
        /*const db = client.db('events');
        const documents = await db.collection('comments').find().sort({_id: -1}).toArray()*/
        /*const dummyList = [
            {id: 'c1', name: 'Max', text: 'A First Comment'},
            {id: 'c2', name: 'Sep', text: 'A Second Comment'},
        ];*/
    }
    await client.close();
}
