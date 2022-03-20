/**
 * 美化时间
 * 小于一分钟：刚刚
 * 大于一分钟小于一小时：xx分钟前
 * 大于一小时小于一天：xx小时前
 * 大于一天小于等于三天：昨天
 * 大于等于三天显示 MM-DD HH:mm
 * @param {number} timestamp  时间戳
 * @param {boolean} isEn 是否英文
 * @returns {string}
 */
function beautifyTime(timestamp: number, isEn?: boolean) {
  const dateTime = new Date(timestamp)
  const month = dateTime.getMonth() + 1
  const day = dateTime.getDate()
  const hour = dateTime.getHours()
  let minute: number | string = dateTime.getMinutes()
  if (minute < 10) {
    minute = `0${minute}`
  }
  const millisecond = dateTime.getTime()
  const now = new Date()
  const nowNew = now.getTime()
  let milliseconds = 0
  let timeSpanStr: string
  milliseconds = nowNew - millisecond
  if (milliseconds <= 1000 * 60 * 1) {
    timeSpanStr = isEn ? 'just now' : '刚刚'
  } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60)) + ' ' + (isEn ? 'minutes ago' : '分钟前')
  } else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + ' ' + (isEn ? 'hours ago' : '小时前')
  } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 3) {
    timeSpanStr = (isEn ? 'yesterday' : '昨天') + ' ' + hour + ':' + minute
  } else {
    timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute
  }
  return timeSpanStr
}

export default beautifyTime
