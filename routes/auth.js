const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');

router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);
router.put('/forgot-password', authCtrl.forgotPassword)
router.get('/user/:id', authCtrl.show);
router.get('/users', authCtrl.getUsers)
router.put('/reset-password', authCtrl.updatePassword)

router.use(require('../config/auth'));
router.get('/follow/:follower/:following', checkAuth, authCtrl.follow)
router.get('/unfollow/:unfollower/:unfollowing', checkAuth, authCtrl.unfollow)

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;