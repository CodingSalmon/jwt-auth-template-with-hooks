const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');

router.get('/', userCtrl.index)
router.get('/:id', userCtrl.show);
router.get('/user/:id/following', userCtrl.getFollowing);
router.get('/user/:id/followers', userCtrl.getFollowers);

router.use(require('../config/auth'));
router.get('/follow/:userId/:following', checkAuth, userCtrl.handleFollow)

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;