const express = require('express');

const router = express.Router();

const talkerRouters = require('./talkersRouters');

router.use(talkerRouters);

module.exports = router;