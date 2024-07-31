const express = require('express')
const accountController = require('../controllers/account')
const authMiddleware = require('../middlewares/auth')
const router = express.Router()

router.get('/balance',authMiddleware,accountController.checkBalance)
router.post('/transfer',authMiddleware,accountController.transferMoney)

module.exports = router
