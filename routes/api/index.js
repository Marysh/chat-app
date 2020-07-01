const express = require('express');
const router = express.Router();

router.use('/chat', require('./chat'));
router.use('/messages', require('./messages'));

module.exports = router;
