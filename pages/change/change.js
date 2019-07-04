const app = getApp()
Page({
  data:{
    curlang:{},
    langlist:app.globalData.langlist
  },
  onShow: function () {
    this.setData({ curlang: app.globalData.curlang })
  },
  onTabitem:function(e){
    let langobj = e.currentTarget.dataset
    console.log(e)
    wx.setStorageSync('language', langobj)
    this.setData({'curlang':langobj})
    app.globalData.curlang = langobj
    wx.switchTab({url: '/pages/index/index'})
  }
})