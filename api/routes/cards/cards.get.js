const express = require("express");

const router = express.Router();
const models = require("../../models");

function ServerError(message, code) {
  this.message = message || 'Ошибка!';
  this.status = code || 400;
  this.stack = (new Error()).stack;
}
ServerError.prototype = Object.create(Error.prototype);
ServerError.prototype.constructor = ServerError;

router.post("/", async (req, res) => {
  console.log(req.body)
  try {
    if (!req.body.filter) throw new ServerError("Filter was missing", 400);

    switch (req.body.filter) {
      case "all": {
        const card = await models.Cards.findAll({ raw: true });
        res.json({ cards: card });
        break;
      }
      case "done": {
        const card = await models.Cards.findAll(
          { where: { done: true } },
          { raw: true }
        );
        res.json({ cards: card });
        break;
      }
      case "undone": {
        const card = await models.Cards.findAll(
          { where: { done: false }},
          { raw: true }
        );
        res.json({ cards: card });
        break;
      }

      default:{
        throw new ServerError("Filter is wrong", 400);
      }
        
    }
  } catch (error) {
    return res.status(error.status).json(error.message);
  }
});

module.exports = router;
