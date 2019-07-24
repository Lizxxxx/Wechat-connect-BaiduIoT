const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    pwd: '',
    wss: '',
    topic:'',
    message:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      username: options.username,
      pwd: options.pwd,
      wss: options.wss,
      topic: options.topic,
      message: options.message,
    })
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

  connectto: function () {
    console.log("arrive")
    wx.redirectTo({
      url: '../page5/page5?wss=' + this.data.wss + '&username=' + this.data.username + '&pwd=' + this.data.pwd+'&message='+this.data.message+'&topic='+this.data.topic,
    })
  },

  backto: function () {
    wx.redirectTo({
      url: '../page31/page31?wss=' + this.data.wss + '&username=' + this.data.username + '&pwd=' + this.data.pwd,
    })
  },

  tomessage: function(){
    app.globalData.message_list.push(this.data.message)
    app.globalData.topic_list.push(this.data.topic)
    wx.redirectTo({
      url: '../page7/page7?wss=' + this.data.wss + '&username=' + this.data.username + '&pwd=' + this.data.pwd,
    })
  }
})