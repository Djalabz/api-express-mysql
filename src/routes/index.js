const express = require('express');
const router = express.Router();


// http://localhost:3000/
router.get('/', (req, res) => {
    res.redirect('/users/login');
})


module.exports = router;