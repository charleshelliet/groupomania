const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/message');

router.get('/', messageCtrl.getMessagesList); 
//router.post('/new', messageCtrl.createMessage); 

module.exports = router;