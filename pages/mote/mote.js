Page({
  data: {
    gender: '',
    height: '',
    weight: '',
    bust: '',
    waist: '',
    hip: ''
  },

  onGenderChange(e) {
    const gender = ['男', '女'][e.detail.value];
    this.setData({ gender });
  },

  onInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({
      [field]: e.detail.value
    });
  },

  onSubmit() {
    wx.showToast({
      title: '信息已保存',
      icon: 'success',
      duration: 1500
    });
  
    // 延迟跳转，等待 toast 动画完成
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/message/message'
      });
    }, 1600);
  
    // 控制台打印数据（你也可以发送请求）
    console.log(this.data);
  }
  
});
