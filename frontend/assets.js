const express = require("express")
const statics = express.Router()

const compression = require('compression')
statics.use('/public/*', compression())
statics.use("/public",express.static("frontend/public"))
statics.use("/favicon.ico",express.static("frontend/public/favicon.ico"))

module.exports = statics;