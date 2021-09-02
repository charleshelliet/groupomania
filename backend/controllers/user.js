const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

//regex
const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX  = /^(?=.*\d).{4,20}$/;

//route all profiles
exports.allProfiles = (req, res, next) => {
    //paramètres
    var fields = req.query.fields;
    var limit = parseInt(req.query.limit);
    var offset = parseInt(req.query.offset);
    var order = req.query.order;
    
    //fonction
    User.findAll({
      order: [order != null ? order.split(":") : ["updatedAt", "DESC"]],
      attributes: fields !== "*" && fields != null ? fields.split(",") : null,
      limit: !isNaN(limit) ? limit : null,
      offset: !isNaN(offset) ? offset : null,

    })
      .then(function (profils) {
        if (profils) {
          res.status(200).json(profils);
        } else {
          res.status(404).json({ error: "pas de messages trouvés" });
        }
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).json({ error: "champs invalides" });
      });
  };

//route signup
exports.signup = (req, res, next) => {

  //paramètres
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const bio = req.body.bio;

  if (email == null || username == null || password == null) {
      return res.status(400).json({ 'error' : 'missing parameters kiki'});
  }

  if (username.length >=20 || username.length <=5 ) {
    return res.status(400).json({ 'username_error' : 'Mauvais format de pseudo (doit être entre 5 et 20 caractères)'});
}

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ 'email_error': 'Adresse email non valide' });
  }

  if (!PASSWORD_REGEX.test(password)) {
    return res.status(400).json({ 'password_error': 'Mot de passe invalide (doit être compris etre 4 et 20 caractères et inclure 1 chiffre)' });
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
        .then(() => res.status(201).json({ 
            'userId': newUser.id,
            'token': jwt.sign(
                { hash: hash._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
        }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ 'error': 'impossible de créer un utilisateur' }))
}

//route login
exports.login = (req, res, next) => {

  //paramètres
  const email = req.body.email;
  const password = req.body.password;
  
  if (email == null || password == null) {
      return res.status(400).json({ error : 'informations de connexion manquantes'});
  }

  //fonction
  User.findOne({
    where: { email: email }
})
.then(function(userFound) {
    if (userFound) {
        bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
            if (resBycrypt) {
                return res.status(200).json({
                    'userId': userFound.id,
                    'token': jwt.sign(
                        { userFound: userFound._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                      )
                });
            } else {
                return res.status(403).json({ 'password_error': 'Mot de passe erroné'});
            }
        })
    }
    else {
        return res.status(404).json({ 'email_error': 'Utilisateur introuvable' });
    }
})
.catch(function(error) {
    return res.status(500).json({ error });
})
}

//route accès profile
exports.getUserProfile = (req, res, next) => {
    
    const userId = req.params.id;
    console.log(req.params.id);

    //fonction
    User.findOne({
        attributes: ['id', 'email', 'username', 'bio'],
        where: { id: userId}
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

//route modification profile
exports.updateUserProfile = (req, res, next) => {
    
    //paramètres
    const userId = req.params.id;
    const bio = req.body.bio;
    console.log(userId);
    console.log(bio);

    User.findOne({where: {id: userId}})
    .then(user => {
        user.update({
            bio: (bio ? bio : user.bio)
        })
          .then(() => res.status(200).json({ message: 'Bio modifiée !'}))
          .catch(error => {
            console.log(error)
            res.status(400).json({ error })
          });
    }) 
    .catch(error =>{
      console.log(error)
      res.status(500).json({ error })
    })

    //fonction
    /*
    User.findOne({
        attributes: ['id', 'bio'],
        where: { id: userId }
    })
        .then(userFound => {
            if (userFound) {userFound.update({bio: (bio ? bio : userFound.bio)})
                .then(() => {
                    if (userFound) {
                        res.status(201).json({userFound})
                    }
                    else {res.status(500).json({ 'error': 'impossible de modifier le profil' });}
                })
                .catch(error => res.status(500).json({ 'error': 'impossible de modifier le user' }));}

            else {res.status(404).json({ 'error': 'utilisateur non trouvé' });}
        })
        .catch(error => res.status(500).json({ 'error': 'impossible de vérifier le profil' }))
    */
};

//route suppression utilisateur
exports.deleteUserProfile = (req, res, next) => {

    const userId = req.params.id;
    console.log(userId);

    User.findOne({where: {id: userId}})
    .then(user => {
        user.destroy()
          .then(() => res.status(200).json({ message: 'User supprimé !'}))
          .catch(error => {
            console.log(error)
            res.status(400).json({ error })
          });
    }) 
    .catch(error =>{
      console.log(error)
      res.status(500).json({ error })
    })

};