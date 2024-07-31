const express = require('express')
const userController = require('../controllers/user');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

router.post('/signup',userController.userSignup)
router.post('/login',userController.userLogin)
router.put('/update',authMiddleware,userController.userUpdate)
router.get('/bulk',userController.searchUser)

module.exports = router


