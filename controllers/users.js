const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = {
    index,
    show,
    handleFollow,
    getFollowing,
    getFollowers,
}

function createJWT(user) {
    return jwt.sign(
        {user},
        process.env.SECRET,
        {expiresIn: '24h'}
    );
}

function index(req, res) {
    User.find({})
    .then(users => res.json(users))
}

function show(req, res) {
    User.findById(req.params.id)
    .then(user => res.json(user));
}

async function handleFollow(req, res) {
    User.findById(req.params.userId)
    .then(user => {
        if(user.following.includes(req.params.following)) {
            console.log('here', 1)
            user.following = user.following.filter(val => val.equals(req.params.unfollowing))
        } else {
            console.log('here', 2)
            user.following.push(req.params.following)
        }
        user.save(function (err) {
            if (err) {return res.status(500).json({err: 'Error: Database error'})}
        });
        const token = createJWT(user);
        return res.json({token});
    })
}

function getFollowing(req, res) {
    User.findById(req.params.id)
    .populate('following')
    .then(user => {
        return res.json(user.following)
    })
}

function getFollowers(req, res) {
    User.find({})
    .then(users => {
        const followers = users.filter(user => user.following.includes(req.params.id))
        return res.json(followers)
    })
}
