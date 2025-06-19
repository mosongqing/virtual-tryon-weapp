// app.js

App({
  globalData: {
    param1: '',
    param2: '',
    param3: '',
  },
  onLaunch: function () {
    // 初始化云开发环境
    wx.cloud.init({
      appid: 'wx8abac66181c3eec5',
      envid: 'cloud1-7g2v0imvdc87e476', // 小程序云开发环境 ID
      traceUser: true, // 是否要在将用户访问记录到用户管理中，在控制台中可见
    });
    // 其他初始化逻辑...
  },
 
  
  // 其他生命周期函数和全局变量...
});

