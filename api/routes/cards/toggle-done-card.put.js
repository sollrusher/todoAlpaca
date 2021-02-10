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

router.put('/', async(req, res) =>{
    try {
        if ( !req.body.id ){
          throw new ServerError('Empty fields', 400);
        }

        const {id} = req.body;

        const card = await models.Cards.findOne({ where: { id } });
        if (!card) {
            throw new ServerError('Card not found', 404);
        }

        const {done} = card;

        await models.Cards.update(
          {
            done: !done,
          },
          { where: { id } },
        );

        res.json({id, done})

    } catch (error) {
      return res.status(error.status).json(error.message);
    }
})

module.exports = router;