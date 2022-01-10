// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model.js');

const server = express();

server.use(express.json());

server.post('/api/users', async (req, res) => {
    const { name, bio } = req.body;
    try {
        if (!name || !bio) {
            res.status(404).json({ message: "Please provide name and bio for the user" })
        } else {
            const newUser = await User.insert({ name, bio });
            console.log("New user created: ", newUser);
            res.status(201).json(newUser);
        }
        
    } catch (err) {
        res.status(500).json({ message: "There was an error while saving the user to the database" });
    }
})

server.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "The users information could not be retrieved" });
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
