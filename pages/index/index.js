import { translate } from '../../utils/api.js'
const app = getApp()
Page({
  data: {
    query: '',
    hideClearicon: true,
    result:[],
    curlang:{}
  },
  onLoad:function(options){
    console.log(options)
    if(options.query){
      this.setData({query:options.query})
    }
  },
  onShow: function () {
    if(this.data.curlang!== app.globalData.curlang){
    this.setData({ curlang: app.globalData.curlang })
    this.onConfim()
  }
  },
  onInput: function (e) {
    this.setData({'query': e.detail.value})
    if (this.data.query.length > 0) {
      this.setData({'hideClearicon': false})
    } else {
      this.setData({'hideClearicon': true})
    }
  },
  onTabclear: function () {
    this.setData({query: ' ',hideClearicon: true})
  },
  onConfim:function(){
    if(!this.data.query) return
    console.log(this.data.curlang)
    translate(this.data.query,{from:'auto',to:this.data.curlang.lang})
      .then(res=>{
        console.log(res.trans_result)
        this.setData({'result':res.trans_result})

        let history = wx.getStorageSync('history') || []
        history.unshift({query:this.data.query,result:res.trans_result[0].dst})
        history.length = history.length>10 ? 10:history.length
        wx.setStorageSync('history', history)

      })
  }

})