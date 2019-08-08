// implement your API here

// library
const express = require('express');

// others
const db = require('./data/db.js');

// global
const server = express();
const port = 4000;

// middleware
server.use(express.json());

// When the client makes a `GET` request to `/api/users`:
server.get('/users', (req, res) =>{
  //datatype
  //status code
  //responce
  db.find()
  .then(obj => {
    res.json(obj)
  })
  .catch(err => {
    res.status(500).json({
      message: 'The users information could not be retrieved.'
    })
  })
})

// When the client makes a `POST` request to `/api/users`:
server.post('/users', (req, res) => {
  const { name, bio } = req.params;

  db.insert(name, bio)
  .then(created => {
    if(created){
      res.satus(201).json(created)
    } else {
      res.status(400).json({
        errorMessage: 'Please provide name and bio for the user.'
      })
    }
  })
  .catch(err => {
    res.status(500).json({
      error: 'There was an error while saving the user to the database',
    })
  })
})

// When the client makes a `GET` request to `/api/users/:id`:
server.get('/users/:id', (req, res) =>{
  const { id } = req.params;

  db.findById(id)
  .then(obj => {
    if(obj){
      res.json(obj)
    } else {
      res.status(404).json({
        message: "The user with the specified ID does not exist."
      })
    }
  })
  .catch(err => {
    res.status(500).json({
      error: "The user information could not be retrieved."
    })
  })
})

// When the client makes a `DELETE` request to `/api/users/:id`:
server.delete('/users/:id', (req, res) =>{
  const { id } = req.params;

  db.remove(id)
  .then(obj => {
    if(obj){
      res.json(obj)
    } else {
      res.status(404).json({
        message: "The user with the specified ID does not exist."
      })
    }
  })
  .catch(err => {
    res.status(500).json({
      error: "The user could not be removed"
    })
  })
})

// When the client makes a `PUT` request to `/api/users/:id`:
server.put('/users/:id', (req, res) =>{
  const { id } = req.params;

  db.update(id)
  .then(obj => {
    if(obj){
      res.status(200).json(obj)
    } else {
      res.status(404).json({
        message: "The user with the specified ID does not exist."
      })
    }
  })
  .catch(err => {
    res.status(500).json({
      error: "The user information could not be modified."
    })
  })
})

server.listen(port, () => console.log(`App listening on port ${port}!`))
