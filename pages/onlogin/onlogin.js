// pages/onlogin/onlogin.js
const app = getApp();
const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    logo:"https://636c-cloud1-7g2v0imvdc87e476-1320945451.tcb.qcloud.la/a9204d85-f484-4d05-a4cd-2a607d9c068e.png?sign=6247fb7a8cebaf4e5c46c7091b16a6c2&t=1744375549",
    islogin:1,
    loginbtnstate1:true,//登录按钮loginbtnstate2
    loginbtnstate2:true,//注册按钮
    loginbtnstate3:true,//修改密码按钮
    loginuser:'',//登录用户名
    loginpassword:'',//登陆密码
    regsteruser:'',//注册用户名
    regsterpassword:'',//注册密码
    alteruser:'',//修改用户名
    alterpassword:'',//修改密码
    switchChecked:false,
    isusertrue:true,
    isregsteropen:false ,
    alterid:'',
    loginid:''//登录为记住密码传值id
  },
  //上传头像
  upImages(){
    wx.chooseMedia({
      count: 9,
      mediaType: ['image','video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success:res=> {
        var tempFilePath=res.tempFiles[0];
        console.log(tempFilePath.tempFilePath);
        this.setData({
          logo:tempFilePath.tempFilePath,
        })
      }
    })
  },
  //注册手机号判断
  Registeruser:function(e){
    console.log("注册用户名输入："+e.detail.value);
    var m=e.detail.value
    if(m!=''&&(m.length==11)){
      this.setData({
        regsteruser:m
      })
      db.collection('login').where({iphone:m}).get().then(res=>{
        if(res.data!='')
        {
          wx.showToast({
            title: '号码已注册',
            icon:'error'
          })
          this.setData({
            loginbtnstate2:true,
            isregsteropen:true
          })
        }
        else{
          this.setData({
            isregsteropen:false
          })
        }
      })
      if(this.data.regsterpassword!='')
      {
        this.setData({
          loginbtnstate2:false,
          isregsteropen:false
        })
      }
      else
      {
        this.setData({
          loginbtnstate2:true
        })
      }
    }
    else
    {
      this.setData({
        loginbtnstate2:true,
        regsteruser:''
      })
    }
  },
  //注册密码判断
  Registerpassword:function(e){
    console.log("注册密码输入："+e.detail.value);
    var m=e.detail.value
    if(m!=''){
      this.setData({
        regsterpassword:m
      })
      if(this.data.regsteruser!='' && (this.data.regsteruser.length==11))
      {
        this.setData({
          loginbtnstate2:false
        })
      }
      else
      {
        this.setData({
          loginbtnstate2:true
        })
      }
    }
    else
    {
      this.setData({
        loginbtnstate2:true,
        regsterpassword:''
      })
    }
  },
  //注册
  register:function(e){
    var that = this
    console.log("注册用户名："+e.detail.value.Ruser)
    console.log("注册密码："+e.detail.value.Rpass)
    var m=e.detail.value.Ruser
    var n=e.detail.value.Rpass
    db.collection("login").add({
      data:{
        iphone:m,
        passsword:n
      }
    }).then(res=>{
      console.log("数据添加成功");
      wx.showToast({
        title: '注册成功',
        icon:'success',
        duration:1000
      })
      that.setData({
        islogin:1,
        loginbtnstate2:false,
        regsterpassword:'',
        regsteruser:''
      })
    })
  },
  //登录手机号判断
  Loginuser:function(e){
    console.log("登录用户名输入："+e.detail.value);
    var m=e.detail.value
    if(m!=''&&(m.length==11)){
      this.setData({
        loginuser:m
      })
      if(this.data.loginpassword!='')
      {
        this.setData({
          loginbtnstate1:false,
          switchChecked:true
        })
      }
      else
      {
        this.setData({
          loginbtnstate1:true
        })
      }
    }
    else
    {
      this.setData({
        loginbtnstate1:true
      })
    }
  },
  //登录密码判断
  Loginpassword:function(e){
    console.log("登录密码输入："+e.detail.value);
    var m=e.detail.value
    if(m!=''){
      this.setData({
        loginpassword:m
      })
      if(this.data.loginuser!='' && (this.data.loginuser.length==11))
      {
        this.setData({
          loginbtnstate1:false,
          switchChecked:true
        })
      }
      else
      {
        this.setData({
          loginbtnstate1:true
        })
      }
    }
    else
    {
      this.setData({
        loginbtnstate1:true
      })
    }
  },
  //登录
  login:function(e){
    var that = this
    getApp().globalData.param3 ="账号："+e.detail.value.Luser;
    console.log("登录用户名1："+e.detail.value.Luser)
    console.log("登录密码1："+e.detail.value.Lpass)
    var m=e.detail.value.Luser
    var n=e.detail.value.Lpass
    db.collection("login").where({iphone:m}).get().then(res=>{
      console.log(res);
      if(res.data!="")
      {
        console.log("手机号码验证成功");
        db.collection("login").where({iphone:m,passsword:n}).get().then(res=>{
          console.log(res);
          if(res.data!="")
          {
            that.setData({
              loginid:res.data[0]._id
            })
            console.log('记住密码状态'+that.data.switchChecked);
            db.collection("Switch").doc('058dfefe626bcb6a00c1e7b859d5d708').update({
              data:{
                switch:that.data.switchChecked
              }
            }).then(res=>{
              console.log('记住密码云端已修改')
            })
            if(that.data.switchChecked)
            {
              db.collection('id').doc('058dfefe626bd4f100c3960d34404791').update({
                data:{
                  iphoneid:that.data.loginid
                }
              }).then(res=>{
                console.log('ID添加成功')
                wx.showToast({
                  title: '登录成功', // 提示的内容
                  icon: 'success',    // 图标，有效值 "success", "loading"
                  duration: 2000       // 提示的延迟时间
                });
              })
            }
             // 设置全局参数
    getApp().globalData.param1 = this.data.logo;
    getApp().globalData.param2 = '退出登录';
            wx.switchTab({
              url: '/pages/my/my?logo=1'
            })
            // wx.redirectTo({
            //   url: '/pages/my/my',
            // })
          }
          else{
            wx.showToast({
              title: '密码错误',
              icon:"error"
            })
          }
        })
      }
      else
      {
        console.log("手机号未注册");
        wx.showToast({
          title: '用户名有误',
          icon:"error"
        })
      }
    })

  },
  //修改密码手机号判断
  Alteruser:function(e){
    console.log("修改密码用户名输入："+e.detail.value);
    var m=e.detail.value
    if(m!=''&&(m.length==11)){
      console.log("手机号进入");
      db.collection("login").where({iphone:m}).get().then(res=>{
        console.log(res);
        if(res.data!='')
        {
          this.setData({
            isusertrue:false,
            alterid:res.data[0]._id
        })
        }
        else{
          wx.showToast({
            title: '手机号未注册',
            icon:'error',
            duration:2000
          })
          
        }
      }
      )
    }
  },
  //修改密码判断
  Alterpassword:function(e){
    console.log("修改密码输入："+e.detail.value);
    var m=e.detail.value
    if(m!=''){
      this.setData({
        loginbtnstate3:false
      })
    }
  },
  //修改密码
  alter:function(e){
    var that = this
    console.log("验证用户名："+e.detail.value.Auser)
    console.log("修改密码："+e.detail.value.Apass)
    var m=e.detail.value.Auser
    var n=e.detail.value.Apass
    db.collection("login").doc(that.data.alterid).update({
      data:{
        passsword:n
      }
    }).then(res=>{
      console.log('云端密码已修改')
      that.setData({
        islogin:1,
        loginbtnstate3:true
      })
    })
  },
  //记住密码判断
  bindswitchchange:function(e){
    var that= this
    var m=e.detail.value
    that.setData({
      switchChecked:m
    })
    if(m==true)
    {
      console.log("记住密码");
      db.collection("Switch").doc('058dfefe626bcb6a00c1e7b859d5d708').update({
        data:{
          switch:m
        }
      }).then(res=>{
        console.log('云端已修改')
        db.collection('id').doc('058dfefe626bd4f100c3960d34404791').update({
          data:{
            iphoneid:that.data.loginid
          }
        }).then(res=>{
          console.log('switch-loginID添加成功')
        })
      })
    }
    else{
      console.log("未记住密码");
      db.collection("Switch").doc('058dfefe626bcb6a00c1e7b859d5d708').update({
        data:{
          switch:m
        }
      }).then(res=>{
        console.log('云端已修改')
        db.collection('id').doc('058dfefe626bd4f100c3960d34404791').update({
          data:{
            iphoneid:that.data.loginid
          }
        }).then(res=>{
          console.log('switch-loginID添加成功')
        })
      })
    }
    
  },
  //转到登陆界面
  tologin:function(e){
    this.setData({
      islogin:1
    })
  },
  //转到注册界面
  toregster:function(e){
    this.setData({
      islogin:2
    })
  },
  //转到登录界面
  toalter:function(e){
    this.setData({
      islogin:3
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("参数："+options.a);
    var that =this
    // db.collection('Switch').get().then(res=>{
    //   if(res.data[0].switch)
    //   {
    //     console.log(res.data[0].switch);
    //     console.log("进入一层if");
    //     db.collection('id').get().then(res=>{
    //       console.log(res.data)
    //         var openid=res.data[0].iphoneid
    //         console.log("初始化"+openid)
    //         db.collection("login").where({_id:openid}).get().then(res=>{
    //           if(res.data!='')
    //           {
    //             console.log(res)
    //             that.setData({
    //               loginuser:res.data[0].iphone,
    //               loginpassword:res.data[0].passsword,
    //               switchChecked:true,
    //               loginbtnstate1:false
    //             })
    //           }
    //         })
    //     })
    //   }
    // })
    // db.collection("id").add({
    //   data:{
    //     iphoneid:""
    //   }
    // })
    // .then(res=>{
    //   console.log(res);
    // })
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