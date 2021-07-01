const Message = require('../models/message'); //import du modèle de données

exports.getMessagesList = (req, res, next) => {
    Message.find()
      .then(messages => res.status(200).json(messages))
      .catch(error => res.status(400).json({ error }));
  };

