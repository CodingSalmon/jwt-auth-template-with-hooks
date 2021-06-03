const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');

router.get('/user/:id', authCtrl.show);
router.get('/users', authCtrl.getUsers)
router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);
router.put('/forgot-password', authCtrl.forgotPassword)
router.put('/reset-password', authCtrl.updatePassword)

router.use(require('../config/auth'));
router.get('/follow/:follower/:following', checkAuth, authCtrl.follow)
router.get('/unfollow/:unfollower/:unfollowing', checkAuth, authCtrl.unfollow)
router.get('/favorite/:placeId', checkAuth, authCtrl.favorite)
router.get('/unfavorite/:placeId', checkAuth, authCtrl.unfavorite)

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;