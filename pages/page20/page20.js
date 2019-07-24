import mqtt from '../../utils/mqtt.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    pwd:'',
    wss:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  usernameInput: function(e) {
    this.setData({
      username: e.detail.value
    })
  },

  pwdInput: function (e) {
    this.setData({
      pwd: e.detail.value
    })
  },

  wssInput: function (e) {
    this.setData({
      wss: e.detail.value
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
    if (this.data.username == '' || (this.data.pwd == '' || this.data.wss == '')){
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
    }else{
    const url = 'wxs://'+this.data.wss.slice(6,-4)+'/mqtt'
    console.log(url)
    const options = {
        username:this.data.username,
        password:this.data.pwd,
        clean:true,
      clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
        protocolVersion:4
    }
    const client = mqtt.connect(url,options)
    //'wxs://yzw8dk0.mqtt.iot.gz.baidubce.com/mqtt'

    client.on('error', (error) => {
      wx.redirectTo({
        url: '../page32/page32?wss=' + url + '&username=' + this.data.username + '&pwd=' + this.data.pwd,
      })
    })

    //client.on('reconnect', (error) => {
      //wx.showModal({
       // title: '提示',
       // content: 'Time Out!重新连接或检查wss地址',
       // success: function (res) {
        //  if (res.confirm) {
         //   console.log('弹框后点取消')
         // } else {
         //   console.log('弹框后点取消')
        //  }
       // }
     // })
   // })

    client.on('connect', (e) => {
      console.log('成功连接服务器: '+this.data.username)
      wx.redirectTo({
        url: '../page31/page31?wss=' + url + '&username=' + this.data.username + '&pwd=' + this.data.pwd,
      })
    })
    }
  },

  todevice: function(){
    wx.redirectTo({
      url: '../page1/page1',
    })
  },

  tomessage: function () {
    wx.redirectTo({
      url: '../page70/page70',
    })
  }
})