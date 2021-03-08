// miniprogram/pages/booking/booking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,//挂架屏显示
    activeIndex: 1,//收入或支出
    payTypeIndex: 0,//付款方式
    typeName: '',//类型
    // 收入或支出
    title: [{
      name: '收入'
    },
    {
      name: '支出'
    }
    ],
    //消费类型
    type: [
      // {
      //   icon: '../../images/eat.png',
      //   name: '餐饮'
      // },
      // {
      //   icon: '../../images/heart.png',
      //   name: '人情'
      // },

      // {
      //   icon: '../../images/trip.png',
      //   name: '出行'
      // },
      // {
      //   icon: '../../images/fit.png',
      //   name: '健康'
      // },
      // {
      //   icon: '../../images/fun.png',
      //   name: '娱乐'
      // },
      // {
      //   icon: '../../images/house.png',
      //   name: '住房'
      // },
      // {
      //   icon: '../../images/car.png',
      //   name: '交通'
      // },
      // {
      //   icon: '../../images/shop.png',
      //   name: '购物'
      // },
      // {
      //   icon: '../../images/study.png',
      //   name: '学习'
      // },
      // {
      //   icon: '../../images/other.png',
      //   name: '其他'
      // },


    ],
    date: '请选择日期',
    money: '',
    detail: '',
    currentTime: ''//当前日期
    ,
    //付款方式
    payType: [
      {
        name: '微信',
      },
      {
        name: '现金',
      },
      {
        name: '支付宝',
      },
      {
        name: '信用卡',
      },
      {
        name: '储蓄卡',
      },
    ]
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

    // 获取设置当前日期
    let date = new Date()
    let str = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    this.setData({
      currentTime: str
    })
    this.findBookingSubType()
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

  },
  // 选择日期
  selectDate(e) {
    this.setData({
      date: e.detail.value
    })
  },
  // 金额
  changeMoney(e) {
    if (!Number(e.detail.value) && e.detail.value != '') {
      wx.showToast({
        title: '金额必须为数字',
        icon: 'error'
      })
      return
    }
    this.setData({
      money: e.detail.value
    })
  },
  //备注
  changeDetail(e) {
    this.setData({
      detail: e.detail.value
    })
  },
  // 点击标题改变选择
  changeSelect(e) {
    if (e.currentTarget.dataset.index == this.data.activeIndex) {
      return
    }
    this.setData({
      activeIndex: e.currentTarget.dataset.index
    })
  },
  // 点击标题改变选择
  changePayType(e) {
    if (e.currentTarget.dataset.index == this.data.payTypeIndex) {
      return
    }
    this.setData({
      payTypeIndex: e.currentTarget.dataset.index
    })
  },
  // 点击选择消费类型
  changeType(e) {
    if (e.currentTarget.dataset.typename == this.data.typeName) {
      return
    }
    this.setData({
      typeName: e.currentTarget.dataset.typename
    })
  },
  // 查询记账子类
  findBookingSubType() {
    // console.log('调用云函数find_data')
    wx.cloud.callFunction({
      // 云函数名称
      name: 'find_data',
      // 参数
      data: {
        // 集合名称
        listName: 'booking_icons'
      }
    }).then(res => {
      // 关闭加载中提示
      setTimeout(() => {
        wx.hideLoading()
        this.setData({
          loading: false
        })
      }, 50)
      let arr = [[], []]
      res.result.data.forEach((v, i) => {
        if (i < 10) {
          arr[0].push(v)
        } else {
          arr[1].push(v)
        }
      })
      this.setData({
        type: arr
      })
    }).catch(e => {
      console.log(e)
    })

  },
  // 保存
  save() {
    // 创建对象存放数据
    let data = {}
    // 金额类型
    let moneyType = this.data.activeIndex == 0 ? '收入' : '支出'
    data.moneyType = moneyType
    // 判断消费类型
    if (this.data.typeName == "") {
      wx.showToast({
        title: '请选择消费类型',
        icon: "error"
      })
      return
    }
    let type = ""
    this.data.type.forEach(v => {
      v.forEach(lv => {
        if (lv.type == this.data.typeName) {
          type = lv
        }
      })
    })
    data.type = type
    // 判断付款方式
    data.payType = this.data.payType[this.data.payTypeIndex].name
    // 判断是否选择日期
    if (this.data.date == '请选择日期') {
      wx.showToast({
        title: '请选择日期',
        icon: "error"
      })
      return
    }
    data.date = this.data.date
    // 判断是否输入金额
    if (!this.data.money) {
      wx.showToast({
        title: '请输入正确金额',
        icon: "error"
      })
      return
    }
    data.money = Number(this.data.money).toFixed(2)
    // 存备注
    data.detail = this.data.detail
    // 清空数据
    this.setData({
      typeName: "",
      money: "",
      detail: "",
      date: "请选择日期"
    })
    // 上传数据
    this.booking(data)
  },
  // 记账
  booking(data) {
    wx.showLoading({
      title: '保存中',
    })
    wx.cloud.callFunction({
      // 云函数名称
      name: 'create_data',
      // 参数
      data: {
        // 集合名称
        listName: 'booking_record',
        data: data
      }
    }).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '保存成功',
        icon: "success",
        duration: 800
      })
    }).catch(e => {
      console.log(e)
    })
  }
})