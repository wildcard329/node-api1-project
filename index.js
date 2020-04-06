const express = require('express');
const shortid = require('shortid');
// const cors = require('cors');

const server = express();

server.use(express.json());
// server.use(cors());

let users = [
    {
        id: shortid.generate(),
        name: "Joe Schmoe",
        bio: "Just another Joe"
    }
]

server.get('/api/users', (req, res) => {
    if(users) {
        res.json(users)
    } else {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    }
    
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    const user = users.find(user => user.id === parseInt(id));

    if(user) {
        res.json(user);
    } else if (!user) {
        res.status(404).json({ message: "The user with the specified ID does not exist."})
    } else {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    }
})

server.post('/api/users', (req, res) => {
    const userInfo = {
        id: shortid.generate(),
        name: req.body.name,
        bio: req.body.bio
    }

    if(userInfo) {
        users.push(userInfo);
        res.status(201).json(users);        
    } else if (!userInfo.name || !userInfo.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    }
});

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const matching = users.some(user => user.id === parseInt(id));

    if (matching) {
        const editUser = req.body;
        users.forEach(user => {
            user.name = editUser.name ? editUser.name : user.name;
            user.bio = editUser.bio ? editUser.bio : user.bio;
            res.status(200).json(users);
        })
    } else if (!matching) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else if (!users.name || !users.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        res.status(500).json({ errorMessage: "The user information could not be modified." })
    }
})

const port = 5000;
server.listen(port, () => console.log(`API running on port ${port}`));