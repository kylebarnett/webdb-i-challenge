const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  db('accounts')
    .then(account => {
      console.log(account)
      res.status(200).json(account)
    })
    .catch(err => {
      res.status(500).json({ message: 'Cannot get accounts.' })
    })
})

server.get('/:id', (req, res) => {
  const { id } = req.params;
  db('accounts').where({ id })
    .then(account => {
      if (account) {
        res.status(200).json(account)
      } else {
        res.status(404).json({ message: 'ID not found.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error retrieving ID.' })
    })
})

server.post('/', (req, res) => {
  const { body } = req;
  db('accounts').insert(body)
    .then(account => {
      res.status(201).json(account)
    })
})

server.put('/:id', (req, res) => {
  const id = req.params.id;
  const bodyInfo = req.body;

  db('accounts').where({ id }).update(bodyInfo)
    .then(account => {
      if (account) {
        res.status(201).json({ updated: account })
      } else {
        res.status(404).json({ message: 'Invalid account ID.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error updating account.' })
    })
})

module.exports = server;