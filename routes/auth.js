const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');

router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);
router.put('/forgot-password', authCtrl.forgotPassword)
router.put('/reset-password', authCtrl.updatePassword)

router.use(require('../config/auth'));

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;