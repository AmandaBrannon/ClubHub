const { check } = require('express-validator')
const db = require('../db')
const { compare } = require('bcryptjs')

//password
const password = check('password')
  .isLength({ min: 6, max: 20 })
  .withMessage('Password needs to be between 6 and 20 characters.')

//email
const email = check('email')
  .isEmail()
  .withMessage('Incorrect Fields')

//check if email exists
const emailExists = check('email').custom(async (value) => {
  const { rows } = await db.query('SELECT * from users WHERE email = $1', [
    value,
  ])

  if (rows.length) {
    throw new Error('Incorrect Fields')
  }
})

//login validation
const loginFieldsCheck = check('email').custom(async (value, { req }) => {
  const user = await db.query('SELECT * from users WHERE email = $1', [value])

  if (!user.rows.length) {
    throw new Error('Incorrect Fields')
  }

  const validPassword = await compare(req.body.password, user.rows[0].password)

  if (!validPassword) {
    throw new Error('Incorrect Fields')
  }

  req.user = user.rows[0]
})

module.exports = {
  registerValidation: [email, password, emailExists],
  loginValidation: [loginFieldsCheck],
}