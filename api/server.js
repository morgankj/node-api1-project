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
            res.status(200).json(newUser);
        }
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
