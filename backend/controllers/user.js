const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

//regex
const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX  = /^(?=.*\d).{4,10}$/;

//route signup
exports.signup = (req, res, next) => {

  //paramètres
  const email = "charles@gmail.com"; //req.body.email;
  const username = "Charles"; //req.body.username;
  const password = "eLamp2021"; //req.body.password;
  const bio = "Salut"; //req.body.bio;

  if (email == null || username == null || password == null) {
      return res.status(400).json({ 'error' : 'missing parameters kiki'});
  }

  if (username.length >=13 || username.length <=4 ) {
    return res.status(400).json({ 'error' : 'mauvais format de pseudo (doit être entre 5 et 12 caractères)'});
}

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ 'error': 'email non valide' });
  }

  if (!PASSWORD_REGEX.test(password)) {
    return res.status(400).json({ 'error': 'mot de passe invalide (doit être compris etre 4 et 10 caractères et inclure 1 chiffre)' });
  }

  //fonction
  bcrypt.hash(password, 10)
    .then(hash => {
      console.log(hash)
      console.log(username)
      const newUser = User.create({
        email: email,
        username: username,
        password: hash,
        bio: bio,
        isAdmin: 0  
    })
        .then(() => res.status(201).json({ 'Nouvel utilisateur': newUser.id}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ 'error': 'impossible de créer un utilisateur' }))
}