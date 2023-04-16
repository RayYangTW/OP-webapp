const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')

// set Gmail sender info (use gmail's app login info)
const systemEmail = process.env.EMAIL_ADDRESS
const emailPassword = process.env.EMAIL_PASSWORD

// set service
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
      link: process.env.PRODUCT_URL
    }
  })

  // set mail content info
  const userName = req.user.name
  const bodyName = result.Category.Users.name ? result.Category.Users.name : 'OP team'
  const bodyItem = result.Category.category
  const bodyDescription = result.description

  const response = {
    body: {
      name: bodyName,
      intro: `來自 OPweb: ${userName} 的申請單`,
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
        instructions: '你可以登入OPweb進行查看與管理',
        button: {
          color: '#3869D4',
          text: 'Go to OPweb',
          link: process.env.PRODUCT_URL // 要記得上線後要改env資料
        }
      },
      outro: '感謝你的協助申請與處理'
    }
  }

  const mail = MailGenerator.generate(response)

  // set message
  const mailTo = result.Category.Users.email ? result.Category.Users.email : systemEmail
  const ccTo = req.user.email
  const message = {
    from: systemEmail,
    to: mailTo,
    subject: 'OPweb申請單',
    cc: ccTo,
    html: mail
  }

  return transporter.sendMail(message)
    .then(sentMail => console.log(`email sent to manager: ${mailTo} and cc to applicant: ${ccTo}.`))
    .catch(err => Promise.reject(err))
}

module.exports = {
  sendApplyEmail
}
