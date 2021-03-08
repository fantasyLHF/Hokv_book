// miniprogram/pages/allbook/allbook.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: []
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
    wx.showLoading({
      title: '加载中',
    })
    // 请求所有数据
    wx.cloud.callFunction({
      // 请求云函数名称
      name: 'find_my',
      // 请求参数
      data: {
        // 集合名称
        listName: 'booking_record',
      }
    }).then(res => {
      this.setData({
        data: res.result.data
      })
      wx.hideLoading()
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
  // 删除
  removeIt(e) {
    // 本地删除
    wx.showModal({
      title: '提示',
      content: '是否永久删除该条记账',
      success: res => {
        if (res.confirm) {
          wx.showLoading({
            title: '正在删除',
          })
          // 本地删除
          this.data.data.forEach((v, i) => {
            if (v._id == e.detail.id) {
              let arr = this.data.data
              arr.splice(i, 1)
              this.setData({
                data: arr
              })
            }
          })
          // 数据库删除
          wx.cloud.callFunction({
            // 云函数名称
            name: 'remove_data',
            // 参数
            data: {
              // 集合名称
              listName: 'booking_record',
              _id: e.detail.id
            }
          }).then(res => {
            if (res.result.stats.removed == 1) {
              wx.hideLoading()
              wx.showToast({
                title: '删除成功',
                icon: 'success',
              })
            }
          }).catch(e => {
            console.log(e)
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  }
})