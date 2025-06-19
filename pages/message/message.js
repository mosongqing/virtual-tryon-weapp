Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImageUrl: "http://47.113.125.45:8080/image/f09282df-0ed3-43c2-ae25-07a44dad670a_1.jpg",
    fadeInClass: 'fade-in'
  },
  onImageTap(e) {
    const key = e.currentTarget.dataset.key;
    let newImageUrl = 'http://47.113.125.45:8080/image/f09282df-0ed3-43c2-ae25-07a44dad670a_1.jpg';
  
    if (key === '衣服1') {
      newImageUrl = 'http://47.113.125.45:8080/image/3e96f480-e4bb-437e-a66b-796a32b46beb_8.jpg';
    } else if (key === '衣服2') {
      newImageUrl = 'http://47.113.125.45:8080/image/2e7d6783-4c51-4718-ab50-52ab0623b478_2.jpg';
    } else if (key === '衣服3') {
      newImageUrl = 'http://47.113.125.45:8080/image/f09282df-0ed3-43c2-ae25-07a44dad670a_1.jpg';
    }else if (key === '衣服4') {
      newImageUrl = 'http://47.113.125.45:8080/image/984d734c-1688-4155-9cc8-67dbdbccda4c_5.jpg';
    }else if (key === '衣服5') {
      newImageUrl = 'http://47.113.125.45:8080/image/6799163b-a2c2-4e49-a850-92841a1e6c31_3.jpg';
    }else if (key === '衣服6') {
      newImageUrl = 'http://47.113.125.45:8080/image/2bdc6f32-9922-4965-bb59-b8cc5021fe26_4.jpg';
    }else if (key === '衣服7') {
      newImageUrl = '';
    }else if (key === '衣服8') {
      newImageUrl = 'http://47.113.125.45:8080/image/40694490-cbb2-447d-b1c2-912d813222fb_7.jpg';
    }else if (key === '衣服9') {
      newImageUrl = 'http://47.113.125.45:8080/image/35e42038-4817-449f-9e79-7fcfe72a7925_6.jpg';
    }
  
    // 1. 淡出当前图片
    this.setData({
      fadeInClass: 'fade-out'
    });
  
    // 2. 1 秒后切换新图并淡入
    setTimeout(() => {
      this.setData({
        bgImageUrl: newImageUrl,
        fadeInClass: 'fade-in'
      });
  
      wx.showToast({
        title: '成功！',
        icon: 'success'
      });
    }, 1000);
  },
  // pages/index/index.js

  goToModelPage() {
    wx.navigateTo({
      url: '/pages/mote/mote' // 模特形态页面路径
    });
  },
  goToModelPage2() {
    wx.navigateTo({
      url: '/pages/index/index' // 模特形态页面路径
    });
  },


  
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '试衣' // 在这里设置你想要显示的页面标题
    });
    wx.setNavigationBarColor({
      frontColor: '#ffffff', // 设置为浅色
      backgroundColor: '#36a2eb', // 设置为自定义的背景颜色
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    });
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