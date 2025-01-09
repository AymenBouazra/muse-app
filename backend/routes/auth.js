const express = require('express')
const { googleAuth } = require('../controllers/auth.controller')
const router = express.Router()

router.post('/google', googleAuth)

module.exports = router