const express = require('express');
const verifyToken = require('../../middlewares/verify-JWT');

const router = express.Router();
const models = require('../../models');
const ServerError = require('../../utils/error-handler');

ServerError.prototype = Object.create(Error.prototype);
ServerError.prototype.constructor = ServerError;


router.delete('/delete',verifyToken , async (req, res) => {
  try {
    const id = req.query.id ;
    
    if (!id) {
      throw new ServerError('Field "ID" is missing', 400);
    }

   const card = await models.Cards.destroy({ where: { id } });
   if(card === 0) throw new ServerError('Card not found', 404);
    
    res.json({ id });
  } catch (error) {
    return res.status(error.status || 400).json(error.message);
  }
});

module.exports = router;
