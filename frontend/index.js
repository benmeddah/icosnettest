const express = require("express");
const assets = require('./assets.js');

const frontend = express.Router();
frontend.use(assets);
frontend.get('/',function (req,rep) {
    rep.render('index',{page:'all'})
})
frontend.get('/create',function (req,rep) {
    rep.render('index',{page:'create'})
})
frontend.get('/single/:id',function (req,rep) {
    rep.render('index',{page:'one'})
})
module.exports = frontend;