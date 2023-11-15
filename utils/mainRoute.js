const express = require("express")
const MainRoute = express.Router()
const orderR = require('../modules/order/routes');
const userR = require('../modules/client/routes');

MainRoute.use('/order',orderR);
MainRoute.use('/client',userR);

module.exports = MainRoute