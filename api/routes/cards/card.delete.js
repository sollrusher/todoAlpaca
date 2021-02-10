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

router.delete('/', async(req, res) =>{
    try {
        if ( !req.body.id){
            throw new ServerError('Empty fields', 400);
        }

        const {id} = req.body;
        models.Cards.destroy({ where: { id }},
        );
        const {title} = card;
        res.json({id: id, title: title})

    } catch (error) {
        return res.status(error.status).json(error.message);
    }
})

module.exports = router;