const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')

const systemEmail = process.env.EMAIL_ADDRESS
const emailPassword = process.env.EMAIL_PASSWORD

const config = {
  service: 'gmail',
  auth: {
    user: systemEmail,
    pass: emailPassword
  }
}
const transporter = nodemailer.createTransport(config)

const sendApplyEmail = (req, result) => {
  const MailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'OPweb',
      link: 'https://www.google.com/'
    }
  })

  const userName = req.user.name
  const bodyName = result.Category.Users.name ? result.Category.Users.name : 'OP team'
  const bodyItem = result.Category.category
  const bodyDescription = result.description

  const response = {
    body: {
      name: bodyName,
      intro: '您有來自 OPweb 的申請單',
      table: {
        data: [
          {
            申請項目: bodyItem,
            描述: bodyDescription,
            申請人: userName
          }
        ]
      },
      action: {
        instructions: '你可以登入OPweb進行管理',
        button: {
          color: '#3869D4',
          text: 'Go to OPweb',
          link: 'https://www.google.com/'
        }
      },
      outro: '感謝你的協助處理'
    }
  }

  const mail = MailGenerator.generate(response)

  const mailTo = result.Category.Users.email ? result.Category.Users.email : 'ray1992.tw@gmail.com'
  const message = {
    from: systemEmail,
    to: mailTo,
    subject: '你有一筆OP申請單',
    html: mail
  }

  return transporter.sendMail(message)
    .then(sentMail => console.log(`email sent to ${mailTo}.`))
    .catch(err => Promise.reject(err))
}

module.exports = { sendApplyEmail }
