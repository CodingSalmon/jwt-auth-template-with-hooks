const User = require('../models/user');
const jwt = require('jsonwebtoken');
const mailgun = require('mailgun-js')
const DOMAIN = 'sandbox3f4ea34ee68e484e8b6578a80f633d33.mailgun.org'
const mg = mailgun({apiKey:process.env.MAILGUN_API_KEY, domain: DOMAIN})
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  show,
  forgotPassword,
  updatePassword,
};

function createJWT(user) {
  return jwt.sign(
    {user},
    SECRET,
    {expiresIn: '24h'}
  );
}

async function signup(req, res) {
  try {
    const user = new User(req.body);
    try {
      await user.save(function (err) {
        if (err) {return res.status(500).json({err: 'Error: Database error'})}
      });
      const token = createJWT(user);
      res.json({ token });
    } catch (err) {
      res.status(400).json(err);
    }
  } catch (err) {
    console.log(err, '<-- error')
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(401).json({err: 'Error: Bad credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'Error: Bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

function show(req, res) {
  User.findById(req.params.id)
  .then(res => res.json());
}

function forgotPassword(req, res) {
  const email = req.body.email
  User.findOne({email}, (err, user) => {
    if (err || !user) {
      return res.status(400).json({error: 'User with this email already exists'})
    }
    
    const token = jwt.sign({_id: user._id}, process.env.RESET_PASSWORD_KEY, {expiresIn: '15m'})
    
    const data = {
      from:'noreply@helloworld.com',
      to: email,
      subject: 'Reset Account Password Link',
      html: `
      <h3>Please click the link below to reset your password</h3>
      <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>
      `,
    }
    
    return user.updateOne({resetLink: token}, (err, user) => {
      if (err) {
        return res.status(400).json({error: 'reset password link error'})
      } else {
        mg.messages().send(data, function(error, body) {
          if (error) {
            console.log('couldnt send email')
            return res.status(400).json({error: error.message})
          }
          return res.status(200).json({message: 'Email has been sent, please follow the instructions'})
        })
      }
    })
  })
}

async function updatePassword(req, res) {
  const {token, password} = req.body
  if (token) {
    jwt.verify(token, process.env.RESET_PASSWORD_KEY, function(error, decodedData) {
      if (error) {
        return res.status(400).json({error: 'Incorrect token or it is expired'})
      }
      User.findOne({resetLink: token}, (err, user) => {
        if (err || !user) {
          return res.status(400).json({error: 'User with this token does not exist'})
        }
      
        user.password = password
        user.save((err, result) => {
          if (err) {
            return res.status(400).json({error: 'Reset Password Error'})
          } else {
            return res.status(200).json({message:'Your password has been changed'})
          }
        })
      })
    })
  } else {
    return res.status(401).json({error: "Authentication Error"})
  }
}