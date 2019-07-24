
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceName:'',
    deviceId:'',
    description:'',
    httpstext:'',
    client:null,
  },

  deviceNameInput: function(e){
     this.setData({
       deviceName:e.detail.value
     })
  },

  deviceIdInput: function (e) {
    this.setData({
      deviceId: e.detail.value
    })
  },

  descriptionInput: function (e) {
    this.setData({
      description: e.detail.value
    })
  },

  httpsInput: function (e) {
    this.setData({
      httpstext: e.detail.value
    })
  },

  createdevice: function() {
    if (this.data.deviceName != '' &&( this.data.deviceId!=''&&this.data.httpstext!='')){
    wx.request({
      url: this.data.httpstext,
      data: {
        "deviceName": this.data.deviceName, 
        "description":this.data.description,
        "deviceId": this.data.deviceId
      },
      header: {
        'content-type': 'application/json'
      },
      method: "POST",
      success: function (res) {
        if (res.data==undefined||res.data['username']==null){
          wx.redirectTo({
            url: '../page12/page12',
          })
        }else{
          wx.redirectTo({
          url: '../page11/page11?ssl=' + res.data["sslEndpoint"] + '&tcp=' + res.data["tcpEndpoint"] + '&wss=' + res.data["wssEndpoint"] + '&username=' + res.data['username'] + '&pwd=' + res.data["key"],
        })
      }
      },
      fail: function(result) {
        wx.redirectTo({
          url: '../page12/page12',
        })
      }
    })
    }else{
      wx.showModal({
        title: '提示',
        content: '请输入必要信息',
        success: function (res) {
          if (res.confirm) {
            console.log('弹框后点取消')
          } else {
            console.log('弹框后点取消')
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    
  }
})