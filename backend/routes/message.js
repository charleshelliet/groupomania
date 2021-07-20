const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/message');
const auth = require('../middleware/auth');

router.post('/', messageCtrl.createMessage); 
router.get('/', auth, messageCtrl.listMessages); 

module.exports = router;