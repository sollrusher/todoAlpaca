const express = require('express');

const router = express.Router();
const models = require('../models');

router.put('/', async(req, res) =>{
    try {
        if ( !req.body.id || !req.body.title){
            throw new Error ('Empty fields')
        }

        const {id, title} = req.body;
        const card = models.Cards.findOne({ where: { id } });
        if (!card) {
          throw new Error('Card not found');
        }
        models.Cards.update(
          {
            title,
          },
          { where: { id } },
        );

        res.json({id: id, title: title})

    } catch (error) {
        return res.json({message: error.message})
    }
})

module.exports = router;