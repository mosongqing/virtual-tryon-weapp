// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '服装展示' // 在这里设置你想要显示的页面标题
    });
    wx.setNavigationBarColor({
      frontColor: '#ffffff', // 设置为浅色
      backgroundColor: 'white', // 设置为自定义的背景颜色
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    });
  },
 login(){
  wx.navigateTo({
    url: '/pages/login/login'
  })  
 },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    console.log(123)

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})