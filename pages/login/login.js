let md5 = require("../../utils/md5.js");
// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",
    passWord: ""
  },
  bindNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  bindPawInput: function (e) {
    this.setData({
      passWord: e.detail.value
    })
  },
  login: function () {
    let uName = this.data.userName;
    let paw = this.data.passWord;
    console.log(this.data.userName);
    console.log(this.data.passWord);
    if (uName === "" || paw === "") {
      // console.log('no')
      wx.showToast({
        title: '信息不能为空',
        icon: 'none',
        duration: 2000
      })
    }else {
      wx.request({
        url: 'https://www.fanhantech.com/api/login', 
        data: {
          username: uName,
          password: md5(paw)
        },
        method: "post",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data.code === 0) {
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 2000
            });
            console.log(res.data);
            setTimeout(function () {
              wx.redirectTo({
                url: '/pages/register/register'
              });
            }, 500);
          } else {
            wx.showToast({
              title: '登录失败，请确认用户名及密码是否正确',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

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