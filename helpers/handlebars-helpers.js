const dayjs = require('dayjs')
// require('dayjs/locale/zh-tw')
// const relativeTime = require('dayjs/plugin/relativeTime')

// dayjs.locale('zh-tw')
// dayjs.extend(relativeTime)

module.exports = {
  currentYear: () => dayjs().year(),
  // relativeTimeFromNow: a => dayjs(a).fromNow(),
  ifCond: function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this)
  },
  ifNot: function (a, b, options) {
    return a !== b ? options.fn(this) : options.inverse(this)
  }
}
