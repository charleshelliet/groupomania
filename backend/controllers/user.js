const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

//fonction asynchrone de signup 
exports.signup = (req, res, next) => {
  //hachage du mot de passe
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: hash,
        bio: req.body.bio
      });
      //enregistrement de nouveau user dans la bdd 
      user.save()
        .then(() => res.status(201).json({ message: 'Nouvel utilisateur enregistré !'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }))
};