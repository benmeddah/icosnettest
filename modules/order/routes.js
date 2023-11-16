const express = require("express")
const OrderRoute = express.Router()

const createMW = require('./controllers/create').create
const updateMW = require('./controllers/update').update
const read = require('./controllers/read')

OrderRoute.route('/')
.get(read.readAll)
.post(createMW);

OrderRoute.route('/:id')
.get(read.readOne)
.put(updateMW)

module.exports = OrderRoute