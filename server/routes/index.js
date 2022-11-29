const express = require('express')
const router = express.Router({ mergeParams: true })

router.use('/auth', require('./auth.routes'))
router.use('/comment', require('./auth.routes'))
router.use('/quality', require('./auth.routes'))
router.use('/profession', require('./auth.routes'))
router.use('/user', require('./auth.routes'))

module.exports = router
