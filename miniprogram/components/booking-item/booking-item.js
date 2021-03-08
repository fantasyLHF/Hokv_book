// components/booking-item/booking-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isDelete: {
      type: Boolean,
      value: false
    },
    bookData: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 删除当前的记账数据
    deleteIt(e) {
      console.log(e.currentTarget.dataset.id)
      this.triggerEvent('remove', { id: e.currentTarget.dataset.id }, {})
    }
  }
})
