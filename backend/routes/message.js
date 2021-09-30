const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/message');
//const auth = require('../middleware/auth');

router.post('/', messageCtrl.createMessage); 
router.get('/',  messageCtrl.listMessages); 
router.put('/:id', messageCtrl.updateMessage);
router.delete('/:id',  messageCtrl.deleteMessage);
router.post('/:id/comments', messageCtrl.createComment);
//router.get('/:id/comments', messageCtrl.getComments);

module.exports = router;