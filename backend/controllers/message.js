const Message = require("../models/message");
const User = require("../models/user");
const fs = require('fs'); //gestion des fichiers

//route création de message
exports.createMessage = async (req, res, next) => {

  //paramètres
  const title = req.body.title;
  const content = req.body.content;
  const userId = req.body.userId;
  console.log(req.body);
  const url = req.body.attachment;
  const attachment = url.split("v=")[1].substring(0, 11);
  //const attachment = `${req.protocol}://${req.get('host')}/images/${req.file}`;
  console.log(userId);
  console.log(attachment);

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

      //const userId = 1;
      //console.log(req.params.userId);
      const messageId = req.params.id;
      console.log(req.params.id);

      Message.findOne({where: {id: messageId}})
        .then(post => {
          const filename = (post.attachment || "").split('/images/')[1];
          if(filename) {
            fs.unlink(`images/${filename}`, () => {
            //Message.deleteOne({where: {id: messageId}})
            post.destroy()
              .then(() => res.status(200).json({ message: 'Post supprimé !'}))
              .catch(error => {
                console.log(error)
                res.status(400).json({ error })
              });
          });
        }
        }) 
        .catch(error =>{
          console.log(error)
          res.status(500).json({ error })
        })
};

/*
//route modification message + écrasement photo dossier
exports.updateMessage = (req, res, next) => {
  
  const messageId = req.params.id; 
  
  let messageObject = {};

  req.file ? (Message.findOne({where: {id: messageId}})
    .then((message) => {
      const filename = message.attachment.split('/images/')[1]
      fs.unlinkSync(`images/${filename}`)
    }),
    messageObject = {
      ...JSON.parse(req.body.message),
      attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    }
  ) : ( messageObject = { ...req.body })
  message.update()
  //Message.updateOne({_id: req.params.id}, {...messageObject, _id: req.params.id})
    .then(() => res.status(200).json({
      message: 'Publication mise à jour !'
    }))
    .catch((error) => res.status(400).json({
      error
    }))
};
*/

//route modification message
exports.updateMessage = (req, res, next) => {

  //const userId = 1;
  //console.log(req.params.userId);
  const messageId = req.params.id;
  const title = req.body.title;
  const content = req.body.content;
  console.log(req.params.id);

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