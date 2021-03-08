// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  let data = { ...event.data, userInfo: event.userInfo }
  try {
    return await db.collection(event.listName).add({
      // data 字段表示需新增的 JSON 数据
      data
    })
  } catch (e) {
    console.log(e)
  }

}