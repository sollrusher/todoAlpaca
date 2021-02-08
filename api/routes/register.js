const express = require('express');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    if (
      !req.body.name
      || !req.body.password
    ) {
      throw new Error('Empty field');
    }

    const { name } = req.body;
    const { password } = req.body;

    const user = await models.User.create({
      name,
      password,
    });

    return res.json({
      error: false,
      payload: {
        user: name,
      },
    });
  } catch (err) {
    return res.json({
      error: true,
      message: err.message,
    });
  }
});

module.exports = router;