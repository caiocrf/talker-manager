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

const emailValidation = (req, res, next) => {
   const regex = /^\S+@\S+\.\S+$/;
   const { email } = req.body;
   if (!email || email.length <= 0) {
    return res.status(400).json({
         message: 'O campo "email" é obrigatório' });
   } 
   if (!regex.test(email)) {
    return res.status(400).json({
         message: 'O "email" deve ter o formato "email@email.com"' });
   }
    next();
};

const passwordValidation = (req, res, next) => {
    const { password } = req.body;
    if (!password || password <= 0) {
        return res.status(400).json({
     message: 'O campo "password" é obrigatório' });
    }
    if (password.length <= 5) {
        return res.status(400).json({
            message: 'O "password" deve ter pelo menos 6 caracteres',
        });
    }
    next();
};

  route.post('/login', emailValidation, passwordValidation, (_req, res) => {
    const token = createtoken();
   return res.status(200).json({ token });
  });
module.exports = route;