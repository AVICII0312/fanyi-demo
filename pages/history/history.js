const app = getApp()
Page({
  data:{
    history:[]
  },
  onLoad:function(option){

  },
  onShow:function(){
    this.setData({history:wx.getStorageSync('history')})
  },
  onTabitem:function(e){
    wx.reLaunch({
      url: `/pages/index/index?query=${e.currentTarget.dataset.query}`
    })
  }
})