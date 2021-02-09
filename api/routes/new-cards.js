const express = require('express');

const router = express.Router();
const models = require('../models');

router.post('/', async(req, res) =>{
    try {
        if(!req.body.title) {
            throw new Error('Empty field');
          }
        const {title} = req.body;
        
        const card = await models.Cards.create({
            title,
            done: false
          });
        return res.json({cards: card})

    } catch (error) {
        return res.json({message: error.message})
    }
})

module.exports = router;