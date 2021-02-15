const express = require("express");

const router = express.Router();
const models = require("../../models");
const cryptPass = require("../../utils/crypPass");
const ServerError = require('../../utils/error-handler');

ServerError.prototype = Object.create(Error.prototype);
ServerError.prototype.constructor = ServerError;

router.post("/signup", async (req, res) => {
    try {
        if(!req.body.login || !req.body.password) {
          throw new ServerError('Empty fields', 400);
          }
        const {login, password} = req.body;
        
        const user = await models.User.create({
            login, 
            password
          });
          const {id, createdAt} = user
        return res.json({user: {id, login, createdAt}})

    } catch (error) {
        return res.status(error.status).json(error.message)
    }
})

module.exports = router;
