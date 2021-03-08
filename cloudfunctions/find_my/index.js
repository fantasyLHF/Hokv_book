// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    //db.collection(操作集合的名称)
    return await db.collection(event.listName).where({
      userInfo: event.userInfo
    }).get();
  } catch (err) {
    console.log('err ==> ', err);
  }
}