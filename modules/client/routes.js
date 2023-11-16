const express = require("express")
const UserRoute = express.Router()
const ctrl = require('./controllers/login')

UserRoute.route('/')
.post(ctrl.login)
.post(ctrl.register);

UserRoute.route('/logout')
.post(ctrl.logout)

module.exports = UserRoute