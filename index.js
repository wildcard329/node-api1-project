const express = require('express');
const server = express();

server.use(express.json());

let users = [
    {
        id: 1,
        name: "Joe Schmoe",
        bio: "Just another Joe"
    }
]

server.get('/api/users', (req, res) => {
    res.json(users)
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    const user = users.find(user => user.id == id);

    if(user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist."})
    }
})

server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    users.add(userInfo)
        .then(user => {
            res.status(201).json(users);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "Please provide name and bio for the user." })
        })
    
});

const port = 5000;
server.listen(port, () => console.log(`API running on port ${port}`));