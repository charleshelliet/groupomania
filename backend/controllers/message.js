const Message = require('../models/message');

//route création de message
exports.createMessage = (req, res, next) => {

    //paramètres
    const title = 'Publication Allez OM'; //req.body.title;
    const content = 'Bonjour projet numéro 7'; //req.body.content;
    const userId = '1';

    if (title == null || content == null) {
        return res.status(400).json({ error : 'Paramètres manquants'});
    }

    if (title.length <=2 || content.length <=4 ) {
        return res.status(400).json({ 'error' : 'Message invalide'});
    }

    //fonction
    Message.findOne({
        where: { id: userId }
    })
        .then(userFound => {
            if (userFound) {
                models.Message.create({
                    title  : title,
                    content: content,
                    likes  : 0,
                    UserId : userFound.id
            })
                .then((newMessage) => {
                    res.status(201).json(newMessage);
                })
                .catch(error => res.status(500).json({ 'error': 'impossible de poster le message' }));}

            else {res.status(404).json({ 'error': 'utilisateur non trouvé' });}
        })
        .catch(error => res.status(500).json({ 'error': 'impossible de vérifier le profil' }))
  }

//route mur de publications
exports.listMessages = (req, res, next) => {

    //paramètres
    var fields = req.query.fields;
    var limit = parseInt(req.query.limit);
    var offset = parseInt(req.query.offset);
    var order = req.query.order;
    
    const ITEMS_LIMIT = 50;
    
    if (limit > ITEMS_LIMIT) {
      limit = ITEMS_LIMIT;
    }

    //fonction
    models.Message.findAll({
      order: [(order != null) ? order.split(':') : ['title', 'ASC']],
      attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
      limit: (!isNaN(limit)) ? limit : null,
      offset: (!isNaN(offset)) ? offset : null,
      include: [{
        model: models.User,
        attributes: [ 'username' ]
      }]
    }).then(function(messages) {
      if (messages) {
        res.status(200).json(messages);
      } else {
        res.status(404).json({ "error": "pas de messages trouvés" });
      }
    }).catch(function(err) {
      console.log(err);
      res.status(500).json({ "error": "champs invalides" });
    });
  }