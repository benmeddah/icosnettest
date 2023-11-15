const express = require("express")
const OrderRoute = express.Router()

const createMW = require('./controllers/create').create
const read = require('./controllers/read')

OrderRoute.route('/')
.get(read.readAll)
.post(createMW);

OrderRoute.route('/:id')
.get(read.readOne);


module.exports = OrderRoute