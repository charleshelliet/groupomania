const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/message');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', multer, messageCtrl.createMessage); 
router.get('/', messageCtrl.listMessages); 
//router.put('/:id', messageCtrl.updateMessage);
router.delete('/:id', messageCtrl.deleteMessage);

module.exports = router;