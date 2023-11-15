// bootstrap .env
require('dotenv').config(); 
const httport = process.env.HTTPPORT || 8088

// importer les bibiotheques
const express = require("express");
const config = require('./utils/config');  // middleware de configuration
const routes = require('./utils/mainRoute');
const frontend = require('./frontend');

/* intantione l'application et utiliser les middlewares */
const app = express();
app.use(config);
app.use(routes);
app.use(frontend);

// mettre l'application live
app.listen(httport, () => {
    console.log("app start with port "+httport+" at " + new Date());
});
