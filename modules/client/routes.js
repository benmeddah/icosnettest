const express = require("express")
const UserRoute = express.Router()

UserRoute.route('/')
.get((req,rep)=>rep.send("123"))

module.exports = UserRoute