//import
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

//regex
const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX  = /^(?=.*\d).{4,10}$/;

//route signup
exports.signup = async (req, res, next) => {

    //paramètres
    const email = "charles@gmail.com"; //req.body.email;
    const username = "Charles"; //req.body.username;
    const password = "eLamp2021"; //req.body.username;
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
    await User.findOne({
        attributes: ['email'],
        where: { email: email }
    })
    .then(function(userFound) {
        if (!userFound) {
            bcrypt.hash(password, 5, function (err, bcryptedPassword) {
                const newUser = User.create({
                    email: email,
                    username: username,
                    password: bcryptedPassword,
                    bio: bio,
                    isAdmin: 0  
                })  
                .then(function(newUser) {
                    return res.status(201).json({
                        'userId': newUser.id
                    })
                })  
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'cannot add user'});
                })
            })
        }
        else {
            return res.status(400).json({ 'error': 'user already exist' });
        }
    })
    .catch(function(err) {
        return res.status(500).json({ 'error': 'unable to verify user'});
    })
}

//route login
exports.login = (req, res, next) => {

    //params
    const email = req.body.email;
    const password = req.body.password;
    
    if (email == null || password == null) {
        return res.status(400).json({ 'error' : 'missing parameters'});
    }

    //todo verify pseudo lenght, mail regex, password, etc
    User.findOne({
        where: { email: email }
    })
    .then(function(userFound) {
        if (userFound) {
            bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                if (resBycrypt) {
                    return res.status(200).json({
                        'userId': userFound.id,
                        'token': 'THE TOKEN'
                    });
                } else {
                    return res.status(403).json({ 'error': 'invalid password'});
                }
            })
        }
        else {
            return res.status(404).json({ 'error': 'user user not exist in DB' });
        }
    })
    .catch(function(err) {
        return res.status(500).json({ 'error': 'unable to verify user'});
    })
}

//route profil
exports.getUserProfile = (req, res, next) => {

    //getting auth header

    //fonction
    Message.findOne({
        attributes: ['id', 'email', 'username', 'bio'],
        //where: { id: userId}
    }).then(function(user) {
        if (user) {
            res.status(201).json(user);
        } else {
            res.status(404).json({ 'erreur': 'utilisateur non trouvé' })
        }
    }).catch(function(err) {
        res.status(500).json({ 'erreur': 'impossibilité de récupérer utilisateur' })
    })
  };