const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup); 
router.post('/login', userCtrl.login); 
router.get('/profile', auth, userCtrl.getUserProfile);
router.put('/profile', auth, userCtrl.updateUserProfile);

module.exports = router;