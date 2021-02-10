const express = require("express");

const router = express.Router();
const models = require("../../models");

router.get("/", async (req, res) => {
  try {
    const card = await models.Cards.findAll({ raw: true });
    res.json({ cards: card });
    
  } catch (error) {
    return res.json({ message: error.message });
  }
});

module.exports = router;
