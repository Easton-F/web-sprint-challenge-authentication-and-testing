const User = require('../model')

function checkCredsValidation(req, res, next) {
    if (!req.body.username || !req.body.password) {
        res.status(422).json({
            message: 'username and password required',
        })
    } else {
        next()
    }
}

async function checkUsernameFree(req, res, next) {
    try {
      const users = await User.findBy({ username: req.body.username })
        if (!users.length) {
          next()
        } else {
            res.status(422).json({
                message: "Username taken",
            })
        }
    } catch (err) {
      next(err)
    }
  }

  const checkUsernameExists = async (req, res, next) => {
      try {
        const [user] = await User.findBy({ username: req.body.username })
        if (!user) {
          res.status(401).json({
            message: 'invalid credentials',
          })
        } else {
          req.user = user
          next()
        }
       } catch (err) {
        next(err)
       }
  }

module.exports =  {
    checkCredsValidation,
    checkUsernameFree,
    checkUsernameExists,
}