
import mqtt from '../../utils/mqtt.js'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    pwd: '',
    wss: '',
    topic: '',
    message: '',
    client:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      username: options.username,
      pwd: options.pwd,
      wss: options.wss,
      topic: options.topic+'/accepted',
      message: options.message,
    })
  },

  topicInput: function(){
    this.setData({
      topic: e.detail.value
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
    var that=this
    that.data.client.end()
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
    var that=this
    console.log(this.data.message)
    const options = {
      username: this.data.username,
      password: this.data.pwd,
      //clean: true,
      resubscribe: true,
      clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
      //protocolVersion: 4
    }
    that.data.client = mqtt.connect(this.data.wss, options)
    //'wxs://yzw8dk0.mqtt.iot.gz.baidubce.com/mqtt'
    that.data.client.on('reconnect', (error) => {
      console.log('正在重连:', error)
    })

    that.data.client.on('connect', (e) => {
      var that = this
      console.log('成功连接服务器: ' + this.data.username)
      that.data.client.subscribe(this.data.topic, { qos: 0 }, function (err) {
        if (!err) {
          console.log("订阅成功")
          
          app.globalData.message_list.push(that.data.message)
          app.globalData.topic_list.push(that.data.topic)

          //that.data.client.end(true)
          wx.redirectTo({
            url: '../page6/page6?wss=' + that.data.wss + '&username=' + that.data.username + '&pwd=' + that.data.pwd,
          })
        }else{
          wx.showModal({
            title: '提示',
            content: '主题信息有误，请重新输入',
            success: function (res) {
              if (res.confirm) {
                console.log('弹框后点取消')
              } else {
                console.log('弹框后点取消')
              }
            }
          })
        }
      })
    })
  }
})