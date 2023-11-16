const express = require("express");
const assets = require('./assets.js');

const frontend = express.Router();
frontend.use(assets);
frontend.get('/',function (req,rep) {
    rep.render('index',{role:req.session.role,page:'all'})
})
frontend.get('/create',function (req,rep) {
    rep.render('index',{role:req.session.role,page:'create'})
})
frontend.get('/single/:id',function (req,rep) {
    rep.render('index',{role:req.session.role,page:'one'})
})
frontend.get('/login',function (req,rep) {
    rep.render('index',{role:req.session.role,page:'login'})
})
module.exports = frontend;