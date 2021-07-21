const Message = require("../models/message");
const fs = require('fs'); //gestion des fichiers

//route création de message
exports.createMessage = async (req, res, next) => {

  //paramètres
  const title = req.body.title;
  const content = req.body.content;
  const userId = 1; //req.body.id;
  const attachment = `${req.protocol}://${req.get('host')}/images/${req.file}`;
  console.log(userId);

  if (title == null || content == null) {
    return res.status(400).json({ error: "Paramètres manquants" });
  }

  if (title.length <= 2 || content.length <= 4) {
    return res.status(400).json({ error: "Message invalide" });
  }

  //fonction
  const newMessage = await Message.create({
    title: title,
    content: content,
    likes: 0,
    userId: userId,
    attachment: attachment
  })
    .then((newMessage) => {
      res.status(201).json(newMessage);
    })
    .catch((error) =>
      res.status(500).json({ error: "impossible de poster le message" })
    );
    console.log(newMessage);
};

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
  Message.findAll({
    order: [order != null ? order.split(":") : ["title", "ASC"]],
    attributes: fields !== "*" && fields != null ? fields.split(",") : null,
    limit: !isNaN(limit) ? limit : null,
    offset: !isNaN(offset) ? offset : null,
    /*
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
    */
  })
    .then(function (messages) {
      if (messages) {
        res.status(200).json(messages);
      } else {
        res.status(404).json({ error: "pas de messages trouvés" });
      }
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json({ error: "champs invalides" });
    });
};

//route suppression message
exports.deleteMessage = (req, res, next) => {

  /*
  Message.deleteOne({ _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Message supprimé !'}))
  .catch(error => res.status(400).json({ error }));
  */
  
  const id = 8; //req.params.id;

  Message.findOne({
    where: { _id: id }
  })
      .then(message => {
          Message.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Message supprimé !'}))
            .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};