//import
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

//routes
exports.signup = (req, res, next) => {

    //params
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const bio = req.body.bio;

    if (email == null || username == null || password == null) {
        return res.status(400).json({ 'error' : 'missing parameters'});
    }

    //todo verify pseudo lenght, mail regex, password, etc
    User.findOne({
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