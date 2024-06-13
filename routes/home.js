const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Hell this is from home router:");
});

module.exports = router;
