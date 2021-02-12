const express = require('express');

const router = express.Router();
const models = require('../../models');

function ServerError(message, code) {
  this.message = message || 'Ошибка!';
  this.status = code || 400;
  this.stack = (new Error()).stack;
}
ServerError.prototype = Object.create(Error.prototype);
ServerError.prototype.constructor = ServerError;

router.post('/newcard', async(req, res) =>{
    try {
        if(!req.body.title) {
          throw new ServerError('Empty fields', 400);
          }
        const {title} = req.body;
        
        const card = await models.Cards.create({
            title,
            done: false
          });
          const {id, createdAt, done} = card
        return res.json({cards: {id, title, createdAt, done}})

    } catch (error) {
        return res.status(error.status).json(error.message)
    }
})

module.exports = router;