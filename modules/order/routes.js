const express = require("express")
const OrderRoute = express.Router()

const createMW = require('./controllers/create').create
const readMW = require('./controllers/read').read

OrderRoute.route('/')
.get(readMW)
.post(createMW)

module.exports = OrderRoute