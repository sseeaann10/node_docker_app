const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Books = require('./books');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const host = process.env.HOSTDB || '127.0.0.1';
const dbport = process.env.DBPORT || '27017';
mongoose.connect(`mongodb://${host}:${dbport}/nextu`)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.get('/books', async (req, res, next) => {
    try{
        const books = await Books.find();
        res.json(books);
    }
    catch(error){
        res.json({ message: err });
    }
});
// app.get('/books/:id', async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         const books = await Books.findById(id).exec();
//         res.json(books);
//     } catch (error) {
//         res.json({ message: error });
//     }
// });

app.post('/books', (req, res, next) => {
    console .log(req.body);
    const book = new Books({...req.body});
    book.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));

    
});

app.put('/books/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedBook = await Books.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedBook);
    } catch (error) {
        res.json({ message: error });
    }
});

app.delete('/books', (req, res, next) => {
    res.json({ message: 'deleted'});
});

app.delete('/books/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedBook = await Books.findByIdAndDelete(id);
        res.json({ message: 'deleted', deletedBook });
    } catch (error) {
        res.json({ message: error });
    }
});
module.exports = app;

