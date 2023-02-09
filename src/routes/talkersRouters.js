const express = require('express');

const vAge = require('../talkerMiddlewares/validateAge');

const vAuth = require('../talkerMiddlewares/validateAutho');

const vName = require('../talkerMiddlewares/validateName');

const vRate = require('../talkerMiddlewares/validateRate');

const vTalk = require('../talkerMiddlewares/validateTalk');

const route = express.Router();

const { getAllTalker, writeTalker } = require('../utils/index');

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

route.post('/talker', vAuth, vName, vAge, 
vTalk, vRate, async (req, res) => {
try {
  const { name, talk, age } = await req.body;
    const talkerJSON = await getAllTalker();
    const addInfoTalkers = {
      id: (talkerJSON.length + 1),
      name,
      age,
      talk: { ...talk },
    };
    const newstalkers = [
      ...talkerJSON, addInfoTalkers,
    ];
    await writeTalker(newstalkers);
    return res.status(201).json(addInfoTalkers);
} catch (error) {
  console.log(error);
}
});
module.exports = route;