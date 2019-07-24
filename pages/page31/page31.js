import mqtt from '../../utils/mqtt.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    pwd: '',
    wss: '',
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
      topic: '$baidu/iot/shadow/'+options.username.split('/')[1]+'/update',
      message:'',
    })
  },

  messageInput: function(e){
    var m_list = e.detail.value.split(' ')
    var tmp = ''
    for (var i = 0;i<m_list.length;i++){
      tmp = tmp + '"' + m_list[i].split('=')[0] + '":' + '"' + m_list[i].split('=')[1]+'"'
      if(i!=m_list.length-1){
        tmp=tmp+','
      }
    }
    this.setData({
      message: '{"reported":{' + tmp + '}}'
    })
    console.log(this.data.message)
  },

  topicInput: function(e){
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
    //var that=this
    //that.data.client.end()
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

  callback: function(err){
       console.log(err.data)
  },
  
  connectto: function () {
    var that = this
    //console.log(this.data.topic)
    //console.log(this.data.wss)
    const resp = '$baidu/iot/shadow/' + this.data.username.split('/')[1] + '/update/accepted'
    console.log(this.data.message)
    const options = {
      username: this.data.username,
      password: this.data.pwd,
      //clean: true,
      resubscribe: true,
      clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
      //protocolVersion: 4,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
    }
    that.data.client = mqtt.connect(this.data.wss, options)
    //'wxs://yzw8dk0.mqtt.iot.gz.baidubce.com/mqtt'

    that.data.client.on('reconnect', (error) => {
      console.log('正在重连:', error)
    })

    that.data.client.on('connect', (e) => {
      console.log('成功连接服务器: ' + this.data.username)
      that.data.client.subscribe(resp, { qos: 0 }, function (err) {
        if (!err) {
          console.log("订阅成功")
        }
      })
      that.data.client.publish(this.data.topic, this.data.message, {
        qos: 0}, function(err){
          if (!err) {
            console.log("发送成功")
          }
        })
  })
    var that = this
    that.data.client.on('message', function (topic, message, packet) {
      //var that = this
      // message is Buffer
      console.log("packet", packet.payload.toString())
      //that.data.client.end(true)
      that.redirect()
    })
  },

  redirect: function(){
    console.log(this.data.topic)
    wx.redirectTo({
      url: '../page4/page4?wss=' + this.data.wss + '&username=' + this.data.username + '&pwd=' + this.data.pwd+'&message='+this.data.message+'&topic='+this.data.topic,
    })
  },

  totopic: function(){
    wx.redirectTo({
      url: '../page5/page5?wss=' + this.data.wss + '&username=' + this.data.username + '&pwd=' + this.data.pwd + '&message=' + this.data.message + '&topic=' + this.data.topic,
    })
  }

})