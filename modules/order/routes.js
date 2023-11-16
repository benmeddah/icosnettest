const express = require("express")
const OrderRoute = express.Router()

const createMW = require('./controllers/create').create
const updateMW = require('./controllers/update').update
const read = require('./controllers/read')

const deleteMW = require('./controllers/delete').deleteO

OrderRoute.route('/')
.get(read.searchByTitle)
.post(createMW);

OrderRoute.route('/:id')
.get(read.readOne)
.put(updateMW)
.delete(deleteMW);

module.exports = OrderRoute