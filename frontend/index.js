const express = require("express");
const assets = require('./assets.js');

const frontend = express.Router();
frontend.use(assets);
frontend.get('/',function (req,rep) {
    rep.render('index')
})
frontend.get('/create',function (req,rep) {
    rep.render('create/index')
})
module.exports = frontend;