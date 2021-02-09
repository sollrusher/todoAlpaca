const express = require('express');

const router = express.Router();
const models = require('../models');

router.get('/', async(req, res) =>{
    try {
        models.Cards.findAll({raw:true}).then(card=>{
            console.log(card);
            res.json({cards: card})
          }).catch(err=>console.log(err));

    } catch (error) {
        return res.json({message: error.message})
    }
})

module.exports = router;