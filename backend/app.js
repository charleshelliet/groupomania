const express = require('express'); //import framework express
const helmet = require("helmet"); //package sécurité pour app express

//import des routeurs
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');

const app = express(); //création application express

app.use(express.json()); //transformation du corps de la requete en json

app.use(helmet()); 

//middleware d'ajout de headers à l'objet response pour éviter les erreurs de CORS
app.use((req, res, next) => {
    //accès à notre API depuis n'importe quelle origine 
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    //ajout des headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    //envoi des requêtes avec les méthodes mentionnées 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/user', userRoutes);
app.use('/api/message', messageRoutes);

module.exports = app; //export de l'app pour y accéder depuis les autres fichiers
