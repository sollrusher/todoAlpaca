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

router.put('/renamecard', async(req, res) =>{
    try {
        if ( !req.body.id || !req.body.title){
          throw new ServerError('Empty fields', 400);
        }

        const {id, title} = req.body;

        const card = await models.Cards.findOne({ where: { id } });
        if (!card) {
            throw new ServerError('Card not found', 404);
        }

        const updateCard = await models.Cards.update(
          {
            title,
          },
          { where: { id } },
        );

        const { createdAt, done} = card

        res.json({id: id, title: title, createdAt, done, })

    } catch (error) {
      return res.status(error.status).json(error.message);
    }
})

module.exports = router;