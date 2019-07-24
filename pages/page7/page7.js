
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    pwd: '',
    wss: '',
    message_list:'',
    topic_list:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      username: options.username,
      pwd: options.pwd,
      wss: options.wss,
      message_list: app.globalData.message_list,
      topic_list: app.globalData.topic_list,
    })
    console.log(this.data.message_list)
    console.log(this.data.topic_list)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  backformessage: function(){
    wx.redirectTo({
      url: '../page31/page31?wss=' + this.data.wss + '&username=' + this.data.username + '&pwd=' + this.data.pwd,
    })
  },

  backfordevice: function(){
    wx.redirectTo({
      url: '../page20/page20',
    })
  }
})