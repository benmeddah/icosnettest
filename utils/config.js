const express = require("express")
const config = express.Router()

const session = require('express-session')
const {join} = require("path")

// config coded
config.use(express.json())
config.use(express.urlencoded({extended:false}))

// initialiser les cookies
config.use(session({
    secret: 'cookie secret',
    resave: false,
    saveUninitialized: true,
}))
config.use((req,rep,next)=>{
    if(req.session.views==undefined){
    req.session.views = 0,
    req.session.isAuth = false;
    req.session.role = 'visitor';
    req.session.username = undefined;
    }
next()
})

// mettre ejs en tant que view engine
const ejs = function (req,rep,next){
    req.app.set('view engine', 'ejs');
    req.app.set('views',join("frontend","views"));
    next()
}
config.use(ejs)

module.exports = config