const express = require("express")
const config = express.Router()
const session = require('express-session')
const {join} = require("path")

// config coded
config.use(express.urlencoded({extended:true}))
config.use(express.json())

// initialiser les cookies
config.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

// mettre ejs en tant que view engine
const ejs = function (req,rep,next){
  req.app.set('view engine', 'ejs');
  req.app.set('views',join("frontend","views"));
  next()
}


config.use((req,rep,next)=>{
    if(req.session.views==undefined)
        req.session.views = 0
    next()
})

config.use(ejs)

module.exports = config