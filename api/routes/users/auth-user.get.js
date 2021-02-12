const express = require("express");

const router = express.Router();
const models = require("../../models");

function ServerError(message, code) {
  this.message = message || "Ошибка!";
  this.status = code || 400;
  this.stack = new Error().stack;
}
ServerError.prototype = Object.create(Error.prototype);
ServerError.prototype.constructor = ServerError;

router.get("/", async (req, res) => {
    try {
        if(!req.query.id) throw new ServerError('ID is missing', 400)
        const {id} = req.query;

        const user = await models.User.findAll({
            where: { id },
          });
          res.json({ user });
        
    } catch (error) {
        return res.status(error.status).json(error.message);
    }
})

module.exports = router;
