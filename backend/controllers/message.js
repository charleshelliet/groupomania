const Message = require("../models/message");
const User = require("../models/user");
const Comment = require("../models/comment");

//route création de message
exports.createMessage = async (req, res, next) => {

  //paramètres
  const title = req.body.title;
  const content = req.body.content;
  const userId = req.body.userId;
  const url = req.body.attachment;
  const attachment = url.split("v=")[1].substring(0, 11);

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
    order: [order != null ? order.split(":") : ["updatedAt", "DESC"]],
    attributes: fields !== "*" && fields != null ? fields.split(",") : null,
    limit: !isNaN(limit) ? limit : null,
    offset: !isNaN(offset) ? offset : null,
    include: User,
  })
    .then(function (messages) {
      if (messages) {
        res.status(200).json(messages);
      } else {
        res.status(404).json({ error: "pas de messages trouvés" });
      }
    })
    .catch(function (err) {
      res.status(500).json({ error: "champs invalides" });
    });
};

//route suppression message
exports.deleteMessage = (req, res, next) => {

  const messageId = req.params.id;

  Message.findOne({where: {id: messageId}})
    .then(post => {
        post.destroy()
          .then(() => res.status(200).json({ message: 'Post supprimé !'}))
          .catch(error => {
            res.status(400).json({ error })
          });
      ;
    
    }) 
    .catch(error =>{
      res.status(500).json({ error })
    })
};

//route modification message
exports.updateMessage = (req, res, next) => {

  const messageId = req.params.id;
  const title = req.body.title;
  const content = req.body.content;

  Message.findOne({where: {id: messageId}})
    .then(post => {
        post.update({
         title: (title ? title : post.title),
         content: (content ? content : post.content)
        })
          .then(() => res.status(200).json({ message: 'Post modifié !'}))
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

//route création de commentaire
exports.createComment = async (req, res, next) => {

  //paramètres
  const content = req.body.content;
  const userId = req.body.userId;
  const messageId = req.body.messageId;

  //fonction
  const newComment = await Comment.create({
    content: content,
    userId: userId,
    messageId: messageId
  })
    .then((newComment) => {
      res.status(201).json(newComment);
    })
    .catch((error) =>
      res.status(500).json({ error: "impossible de poster le message" })
    );
    console.log(newComment);
};

//route afficher les commentaires
exports.getComments = (req, res, next) => {

  //paramètres
  const messageId = req.params.id;

  if (messageId <= 0) {
    return res.status(400).json({'error': 'invalid parameters'});
  }

  //fonction

  Message.findOne({where: {id: messageId}})

  .then(messageFound => {
      if (messageFound) {

        Comment.findAll({
          where: {
            messageId: messageId
          },
          include: User,
        })
          .then(function (comments) {
            if (comments) {
              res.status(200).json(comments);
            } else {
              res.status(404).json({ error: "pas de commentaires trouvés" });
            }
          })
          .catch(function (err) {
            console.log(err);
            res.status(500).json({ error });
          });
        
      }
      else {
        res.status(404).json({ 'error': 'pas de messages' });
      }
  }) 
  .catch(error =>{
    console.log(error)
    res.status(500).json({ error })
  })

};