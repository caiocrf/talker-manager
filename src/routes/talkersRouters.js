const express = require('express');

const vAge = require('../talkerMiddlewares/validateAge');

const vAuth = require('../talkerMiddlewares/validateAutho');

const vName = require('../talkerMiddlewares/validateName');

const vRate = require('../talkerMiddlewares/validateRate');

const vTalk = require('../talkerMiddlewares/validateTalk');

const route = express.Router();

const { getAllTalker, writeTalker, upTalkers } = require('../utils');

route.get('/talker', async (_requeste, response) => {
    const talker = await getAllTalker();
    return response.status(200).json(talker);
  });

route.get('/talker/:id', async (requeste, response) => {
 const getAllT = await getAllTalker();
 const { id } = requeste.params;
 const talker = getAllT.find((p) => p.id === Number(id));
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

route.put('/talker/:id', 
vAuth, 
vName, 
vAge, 
vTalk,
 vRate, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const getAllT = await getAllTalker();
  const index = getAllT.findIndex((e) => e.id === Number(id));
  getAllT[index] = { id: Number(id),
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  await upTalkers(getAllT);
  res.status(200).json(getAllT[index]);
});

route.delete('/talker/:id', vAuth, async (req, res) => {
  const { id } = req.params;
  const talkers = await getAllTalker();
  const filteredTalkers = talkers.filter((e) => e.id !== Number(id));

  await upTalkers(filteredTalkers);
  res.status(204).end();
});
module.exports = route;