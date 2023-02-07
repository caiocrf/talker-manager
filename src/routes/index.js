const express = require('express');

const router = express.Router();

const talkerRouters = require('./talkersRouters');
const loginRouters = require('./loginRouters');

router.use(talkerRouters);
router.use(loginRouters);

module.exports = router;