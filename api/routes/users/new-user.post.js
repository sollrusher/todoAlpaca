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

router.post("/", async (req, res) => {
    try {
        if(!req.body.login || !req.body.password) {
          throw new ServerError('Empty fields', 400);
          }
        const {login, password} = req.body;
        
        const user = await models.User.create({
            login, 
            password
          });
          const {id, createdAt} = card
        return res.json({user: {id, login, createdAt}})

    } catch (error) {
        return res.status(error.status).json(error.message)
    }
})

module.exports = router;
