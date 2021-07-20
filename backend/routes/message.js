const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/message');
const auth = require('../middleware/auth');

router.post('/', messageCtrl.createMessage); 
router.get('/', messageCtrl.listMessages); 
//route de modification de message
//route de suppression de message

module.exports = router;