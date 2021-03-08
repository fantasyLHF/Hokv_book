// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    //db.collection(操作集合的名称)
    console.log(event)
    if (event.data) {
      return await db.collection(event.listName).where({
        date: _.gte(event.data.start).and(_.lt(event.data.end)),
        userInfo: event.userInfo
      }).get();
    } else {
      return await db.collection(event.listName).get();
    }

  } catch (err) {
    console.log('err ==> ', err);
  }
}