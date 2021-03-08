// miniprogram/pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    date: '',//选择日期
    currentTime: '',//当前日期
    data: [],//所有数据
    pay: 0,//该日支出
    get: 0,//该日收入
    count: 0,//笔数
    monthAll: 0,//本月结余
    monthAllF: "",//本月结余
    monthGet: 0,//本月收入
    monthGetF: "",
    monthPay: 0,//本月支出
    monthPayF: ""//本月支出
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 加载提示
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    // 设置当前日期
    let date = new Date()
    let month = date.getMonth() + 1
    if (month < 10) {
      month = "0" + month
    }
    let day = date.getDate()
    if (day < 10) {
      day = "0" + day
    }
    let str = `${date.getFullYear()}-${month}-${day}`
    this.setData({
      date: str,
      currentTime: str
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
    wx.showLoading({
      title: '加载中',
    })
    // 请求本月数据
    let currentTime = new Date()
    let start = `${currentTime.getFullYear()}-${(currentTime.getMonth() + 1) < 10 ? "0" + (currentTime.getMonth() + 1) : (currentTime.getMonth() + 1)}-01`
    let end = `${currentTime.getFullYear()}-${(currentTime.getMonth() + 2) < 10 ? "0" + (currentTime.getMonth() + 2) : (currentTime.getMonth() + 2)}-02`
    wx.cloud.callFunction({
      // 请求云函数名称
      name: 'find_bookMonth',
      // 请求参数
      data: {
        // 集合名称
        listName: 'booking_record',
        data: {
          start,
          end
        }
      }
    }).then(res => {
      wx.hideLoading()
      let monthGet = 0
      let monthPay = 0
      res.result.data.forEach(v => {
        if (v.moneyType == "支出") {
          monthPay += Number(v.money)
        } else {
          monthGet += Number(v.money)
        }
      })
      this.setData({
        monthPay: parseInt(monthPay),
        monthPayF: monthPay.toFixed(2).split('.')[1],
        monthGet: parseInt(monthGet),
        monthGetF: monthGet.toFixed(2).split('.')[1],
        monthAll: parseInt(monthGet - monthPay),
        monthAllF: (monthGet - monthPay).toFixed(2).split('.')[1]
      })
    }).catch(e => {
      console.log(e)
    })
    // 请求数据
    wx.cloud.callFunction({
      // 云函数名称
      name: 'find_data',
      // 参数
      data: {
        // 集合名称
        listName: 'booking_record',
        //请求要求
        data: {
          date: this.data.date
        }

      }
    }).then(res => {
      // 关闭加载中提示
      if (this.data.loading) {
        setTimeout(() => {
          wx.hideLoading()
          this.setData({
            loading: false
          })
        }, 50)
      }
      let pay = 0;
      let get = 0;
      res.result.data.forEach(v => {
        if (v.moneyType == '支出') {
          pay += Number(v.money)
        } else {
          get += Number(v.money)
        }
      })
      pay = pay.toFixed(2)
      get = get.toFixed(2)
      this.setData({
        data: res.result.data,
        pay: pay,
        get: get,
        count: res.result.data.length
      })
    }).catch(e => {
      console.log(e)
    })
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

  },
  // 查看不同时间数据
  changeTime(e) {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      date: e.detail.value
    })
    // 请求数据
    wx.cloud.callFunction({

      // 云函数名称
      name: 'find_data',
      // 参数
      data: {
        // 集合名称
        listName: 'booking_record',
        //请求要求
        data: {
          date: e.detail.value
        }

      }
    }).then(res => {
      wx.hideLoading()
      let pay = 0;
      let get = 0;
      res.result.data.forEach(v => {
        if (v.moneyType == '支出') {
          pay += Number(v.money)
        } else {
          get += Number(v.money)
        }
      })
      pay = pay.toFixed(2)
      get = get.toFixed(2)
      this.setData({
        data: res.result.data,
        pay: pay,
        get: get,
        count: res.result.data.length
      })
    }).catch(e => {
      console.log(e)
    })
  },
  // 跳到记账页面
  goAdd() {
    wx.switchTab({
      url: '../booking/booking',
    })
  }
})