const dayjs = require('dayjs')
require('dayjs/locale/zh-tw')
const relativeTime = require('dayjs/plugin/relativeTime')

dayjs.locale('zh-tw')
dayjs.extend(relativeTime)

module.exports = {
  currentYear: () => dayjs().year(),
  relativeTimeFromNow: a => dayjs(a).fromNow(),
  transferDateTime: a => dayjs(a).format('YYYY[年]MM[月]DD[日]')
}
