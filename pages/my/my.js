// pages/my/my.js
// app.globalData.pictureParam = 2;
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    a:false,
    login:"点击登录",
    show:false,
    show1:false,
    value:3,
    logo:"https://636c-cloud1-7g2v0imvdc87e476-1320945451.tcb.qcloud.la/a9204d85-f484-4d05-a4cd-2a607d9c068e.png?sign=6247fb7a8cebaf4e5c46c7091b16a6c2&t=1744375549",
    img_name:"",
  },
  showPopup() {
    this.setData({ show: true });
  },
  showPopup1() {
    this.setData({ show1: true });
  },
  onClose() {
    this.setData({ show: false,show1:false });
  },
  onChange(event) {
    this.setData({
      value: event.detail,
    });
  },
  showAlert: function () {
    wx.showToast({
      title: '清除成功！',
      icon: 'none', // 设置图标为none，表示不显示图标，也可以设置为'success'等其他图标
      duration: 2000 // 提示框显示时间，单位为毫秒
    });
  },
  PhoneCall:function(){
    wx.makePhoneCall({
      phoneNumber: '15877042488' // 这里替换成你要拨打的电话号码
    });
  },
  //登陆页面跳转
  login1(){
    if(this.data.a)
    {
      getApp().globalData.param1 ="";
      getApp().globalData.param2 ="";
      getApp().globalData.param3 ="";
      this.setData({
        login:"点击登录",
        logo:"",
        img_name:"",
        a:false,
      })
    }else
    {
      this.setData({
        a:true,
        login:"退出登录",

      })
      wx.navigateTo({
        url: '/pages/onlogin/onlogin?a=1'
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '我的' // 在这里设置你想要显示的页面标题
    });
    wx.setNavigationBarColor({
      frontColor: 'white', // 设置为浅色
      backgroundColor: 'white', // 设置为自定义的背景颜色
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    });
    console.log("参数："+options.logo)
    // this.setData({
    //   logo:options.logo,
    //  // logo:"http://tmp/4h8UybJe2Sap7077ee0702cfeccd3bc7caa31a2ac450.png"
    // })
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
     // 获取全局参数
     console.log("全局："+getApp().globalData.param1); // 输出 value1
     console.log("全局："+getApp().globalData.param2); // 输出 value2
     console.log("全局："+getApp().globalData.param3); // 输出 value3
     this.setData({
       img_name:getApp().globalData.param3,
       logo:getApp().globalData.param1,
     })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})