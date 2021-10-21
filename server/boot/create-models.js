'use strict';

module.exports = async function(app) {
  try {
    let mysqlDb = app.dataSources.mysqlDb;
    let models = ['city', 'group', 'project', 'user'];
    // 执行创建库未知

    // 执行创建/更新表
    await updateTable(models);

    // 创建/更新表 更新返回true
    function updateTable(models) {
      return new Promise(async (resolve, reject) => {
        let isActual = await getActual(models);
        if (!isActual) {
          mysqlDb.autoupdate(models, function(err) {
            if (err) return reject(err);
            resolve(true);
          });
        } else {
          resolve(false);
        }
      });
    }

    // 判断数据模型是否和数据表一致 一致为true
    function getActual(models) {
      return new Promise((resolve, reject) => {
        mysqlDb.isActual(models, function(err, actual) {
          if (err) return reject(err);
          resolve(actual);
        });
      });
    }
  } catch (error) {

  }
};
