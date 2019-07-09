import md5 from './md5.js'

const appid = '20190703000314134'
const key = 'xBxXa5VZ6IZ4NxtxfVFu'

function translate(q, {
  from = 'auto',
  to = 'auto'
} = {
  from: 'auto',
  to: 'auto'
}) {
  return new Promise((resolve, reject) => {
    let salt = Date.now()
    let sign = md5(`${appid}${q}${salt}${key}`)
    wx.request({
      url: 'https://api.fanyi.baidu.com/api/trans/vip/translate',
      data: {
        q,
        appid,
        salt,
        from,
        to,
        sign
      },
      success(res) {
        if(res.data){
          resolve(res.data)
        }else{
          wx.showToast({
            title: '翻译失败',
            icon: 'none',
            duration: 3000
          })
        }
      },
      fail() { reject({ status: 'error', msg: '翻译失败'})
        wx.showToast({
          title: '翻译失败',
          icon: 'none',
          duration: 3000
        })
      }
    })
  })
}
module.exports.translate = translate