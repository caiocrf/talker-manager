const express = require('express');

const route = express.Router();

const { getAllTalker } = require('../utils/index');

route.get('/talker', async (_requeste, response) => {
    const talker = await getAllTalker();
    return response.status(200).json(talker);
  });
module.exports = route;