const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/message');
const auth = require('../middleware/auth');

router.post('/', messageCtrl.createMessage); 
router.get('/', auth, messageCtrl.listMessages); 
router.put('/:id', messageCtrl.updateMessage);
router.delete('/:id', auth, messageCtrl.deleteMessage);

module.exports = router;