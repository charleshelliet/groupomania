const express = require('express'); //import framework express
const helmet = require("helmet"); //package sécurité pour app express
const app = express(); //création application express

//connexion BDD
require('./database'); 

//import des routeurs
const userRoutes = require('./routes/user');
//const messageRoutes = require('./routes/message');

app.use(express.json()); //transformation du corps de la requete en json
app.use(helmet()); 

//middleware d'ajout de headers à l'objet response pour éviter les erreurs de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/user', userRoutes);
//app.use('/api/message', messageRoutes);

module.exports = app; //export de l'app pour y accéder depuis les autres fichiers
