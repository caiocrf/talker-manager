const express = require('express');

const route = express.Router();

const { getAllTalker } = require('../utils/index');

route.get('/talker', async (_requeste, response) => {
    const talker = await getAllTalker();
    return response.status(200).json(talker);
  });

route.get('/talker/:id', async (requeste, response) => {
 const talkers = await getAllTalker();
 const { id } = requeste.params;
 const talker = talkers.find((p) => p.id === Number(id));
 if (!talker) {
  return response.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  });
 }
 response.status(200).json(talker);
});

module.exports = route;