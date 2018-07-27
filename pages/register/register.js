// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",
    phone: "",
    code: "",
    passWord: "",
    pawRight: "",
    mail: "",
    userNameV: "",
    phoneV: "",
    codeV: "",
    passWordV: "",
    pawRightV: "",
    mailV: "",
    send: "发送验证码",
    codeDisabled: false
  },
  bindNameInput: function (e) {
    this.setData({userName: e.detail.value});
    this.nV();
  },
  nV: function () {
    const vm = this;
    const val = this.data.userName;
    let changeCon = '';
    const a = /^[a-zA-Z][a-zA-Z0-9_-]{4,29}$/;
    if (val === "") {
      changeCon = "用户名不能为空"
    } else if (val.length < 5 || val.length > 31) {
      changeCon = "长度不能小于5个字符，大于30个字符"
    } else if (!a.test(val)) {
      changeCon = "字母开头，只能包含字母、数字、横线及下划线"
    } else {
      wx.request({
        url: 'https://www.fanhantech.com/api/account/username?username=' + val,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data) {
            vm.setData({ userNameV: "用户名已存在" });
            console.log(res.data)
          }
        }
      })
    }
    this.setData({userNameV: changeCon});
    return false;
  },
  bindPhoneInput: function (e) {
    this.setData({phone: e.detail.value,});
    this.phV();
  },
  phV: function () {
    const val = this.data.phone;
    const regPhone = /^\d+$/;
    let changeCon = '';
    if (val === "") {
      changeCon = "请输入手机号"
    } else if (!regPhone.test(val)) {
      changeCon = "手机号码格式不正确"
    }else {
      this.setData({ phoneV: '' });
      return true
    }
    this.setData({phoneV: changeCon});
    return false;
  },
  bindCodeInput: function (e) {
    this.setData({code: e.detail.value,});
    this.cV();
  },
  cV: function () {
    const val = this.data.code;
    const regCode = /^[0-9]{6}$/;
    let changeCon = '';
    if (val === "") {
      changeCon = "请输入手机验证码"
    } else if (!regCode.test(val)) {
      changeCon = "请输入正确验证码"
    }
    this.setData({codeV: changeCon});
    return false;
  },
  bindPawInput: function (e) {
    this.setData({passWord: e.detail.value});
    this.pV();
  },
  pV: function () {
    const val = this.data.passWord;
    let changeCon = '';
    if (val === "") {
      changeCon = "请输入密码";
    } else if (val.length < 6) {
      changeCon = "密码长度至少6位";
    }
    this.setData({passWordV: changeCon});
    return false;
  },
  bindPawRigInput: function (e) {
    this.setData({pawRight: e.detail.value,});
    this.prV();
  },
  prV: function () {
    const val = this.data.pawRight;
    let changeCon = '';
    if (val === "") {
      changeCon = "请再次输入密码";
    } else if (val !== this.data.passWord) {
      changeCon = "两次密码不一致，请重新输入";
    }
    this.setData({pawRightV: changeCon});
    return false;
  },
  bindMailInput: function (e) {
    this.setData({ mail: e.detail.value, });
    this.mV();
  },
  mV: function () {
    const val = this.data.mail;
    let changeCon = '';
    const regMail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (val === "") {
      changeCon = "请输入邮箱";
    } else if (!regMail.test(val)) {
      changeCon = "请输入正确的邮箱";
    }
    this.setData({ mailV: changeCon });
    return false;
  },
  sendCode: function () {
    const vm = this;
    if (this.phV() == false) {
      console.log('bububu')
      return
    }else {
      let num = 60;
      wx.request({
        url: 'https://www.fanhantech.com/api/account/smsverificationcode',
        data: {
          countryCode: '86',
          mobile: this.data.phone
        },
        method: "post",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.code === 0) {
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 2000
            });
          }else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            });
          }
        }
      })
      let interval = setInterval(function () {
        if (num > 0) {
          num --;
          vm.setData({ send: `重新发送(${num})`, codeDisabled: true});
        } else {
          clearInterval(interval);
          vm.setData({ send: `发送验证码`, codeDisabled: false });
        }
      },1000)
    }
  },
  register: function () { 
    this.nV(); 
    this.phV(); 
    this.cV(); 
    this.pV(); 
    this.prV(); 
    this.mV();
    let vals = {
      userNameV: this.data.userNameV,
      phoneV: this.data.phoneV,
      codeV: this.data.codeV,
      passWordV: this.data.passWordV,
      pawRightV: this.data.pawRightV,
      mailV: this.data.mailV
    }
    for (let i in vals) {
      if (vals[i] !== "") {
        wx.showToast({
          title: vals[i],
          icon: 'none',
          duration: 2000
        });
        return
      }else {
        wx.request({
          url: 'https://www.fanhantech.com/api/register',
          data: {
            Username: userName,
            CountryCode: "+86", // todo 目前只支持+86
            Mobile: phone,
            Code: code,
            Password: md5(passWord), /// md5()
            Confirm: md5(pawRight),
            Agree: true
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
            } else {
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              });
            }
          }
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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