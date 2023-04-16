const { body } = require('express-validator')

const signUpValidator = [
  body('password')
    .isLength({ min: 8 })
    .withMessage('密碼字數不可小於 8')
    .isLength({ max: 30 })
    .withMessage('密碼字數不可大於 30'),
  body('email')
    .isEmail()
    .withMessage('電子信箱格式不正確'),
  body('name')
    .isLength({ max: 20 })
    .withMessage('使用者名稱不可超過20字')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('使用者名稱不可為空白')
    .matches(/^[A-Za-z0-9]+$/)
    .withMessage('使用者名稱僅能是數字與英文字母')
]

const applyValidator = [
  body('categoryId')
    .notEmpty()
    .withMessage('必須選擇一個項目'),
  body('description')
    .isLength({ max: 200 })
    .withMessage('描述字數不可超過100字')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('描述不可為空白')
]

module.exports = {
  signUpValidator,
  applyValidator
}
