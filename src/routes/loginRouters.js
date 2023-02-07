const express = require('express');

const route = express.Router();

// Criação do token de 16 characters!
const createtoken = () => {
    const characters = '123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    const charactersLength = characters.length;
    let token = '';
    let counter = 0;
    while (counter < 16) {
      token += (characters[Math.floor(Math.random() * charactersLength)]);
      counter += 1;
    }
    return token;
  };

  route.post('/login', (_req, res) => {
    const token = createtoken();
    res.status(200).json({ token });
  });
module.exports = route;