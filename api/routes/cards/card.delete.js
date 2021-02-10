const express = require('express');

const router = express.Router();
const models = require('../../models');

router.delete('/', async(req, res) =>{
    try {
        if ( !req.body.id){
            return res.status(400).json('Empty fields');
        }

        const {id} = req.body;
        const card = models.Cards.findOne({ where: { id } });
        if (!card) {
          throw new Error('Card not found');
        }
        models.Cards.destroy({ where: { id }},
        );
        const {title} = card;
        res.json({id: id, title: title})

    } catch (error) {
        return res.status(400).json(error.message);
    }
})

module.exports = router;