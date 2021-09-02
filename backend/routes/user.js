const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup); 
router.post('/login', userCtrl.login); 
router.get('/profile/:id', userCtrl.getUserProfile);
router.put('/profile/:id', userCtrl.updateUserProfile);
router.delete('/profile/:id', userCtrl.deleteUserProfile);
router.get('/profile', userCtrl.allProfiles); 

module.exports = router;