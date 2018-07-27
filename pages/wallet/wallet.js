// pages/wallet/wallet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currTab:'first',
    income: [
      {
        'id': 1,
        'title': '收入',
        'status': '等待审核',
        'time': '2018-03-12 12:00',
        'money': 120
      },
      {
        'id': 2,
        'title': '收入',
        'status': '等待审核',
        'time': '2018-03-12 12:00',
        'money': 38
      },
      {
        'id': 3,
        'title': '收入',
        'status': '提现成功',
        'time': '2018-03-12 12:00',
        'money': 120
      },
      {
        'id': 4,
        'title': '收入',
        'status': '提现失败',
        'time': '2018-03-12 12:00',
        'money': 120
      },
    ],
    paid: [
      {
        'id': 1,
        'title': '支出',
        'status': '等待审核',
        'time': '2018-03-12 12:00',
        'money': 45
      },
      {
        'id': 2,
        'title': '支出',
        'status': '等待审核',
        'time': '2018-03-12 12:00',
        'money': 23
      },
      {
        'id': 3,
        'title': '支出',
        'status': '等待审核',
        'time': '2018-03-12 12:00',
        'money': 120
      },
      {
        'id': 4,
        'title': '支出',
        'status': '等待审核',
        'time': '2018-03-12 12:00',
        'money': 120
      },
    ]
  },
  onNavTap: function (e) {
    this.setData({ currTab: e.target.id });
    console.log(this.data.currTab)
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