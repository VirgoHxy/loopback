'use strict';

const {S4, guid} = require('../../common/plugin/number');

module.exports = function(city) {
  // 分页查询(查询为get,所以添加该post方法)
  city.findList = async function(arg = {}) {
    try {
      let {pageSize, pageIndex, name} = arg;
      let limit = pageSize;
      let skip = pageIndex * pageSize;
      if (!(typeof pageIndex == 'number' && pageIndex >= 0)) {
        throw new Error('pageIndex 不合规');
      }
      if (!(typeof pageSize == 'number' && pageSize > 0)) {
        throw new Error('pageSize 不合规');
      }
      let findArg = {
        // 限制实例数
        limit,
        // 跳过实例数
        skip,
        // 通过id排序 降序 默认升序
        // order: 'id DESC',
      };
      let countArg = {};
      if (name) {
        findArg.where = {name: {like: name}};
        countArg.where = {name: {like: name}};
      }
      let data = await city.find(findArg);
      let count = await city.count(countArg.where);
      return {
        status: true,
        data,
        count,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        errMsg: error.message,
      };
    }
  };
  // 查询一个(查询为get,所以添加该post方法)
  city.findOneByPost = async function(arg = {}) {
    try {
      let one = await city.findOne({
        // 条件
        where: {and: [arg]},
        // 跳过实例数
        skip: 0,
        // 限制实例数
        limit: 0,
        // 包含在响应的字段或者是去掉的
        fields: [],
      });

      return {
        status: true,
        data: one,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        errMsg: error.message,
      };
    }
  };
  // 通过id添加或编辑(可将条件加在body而不用放在链接中)
  city.insertOrUpdate = async function(arg = {}) {
    try {
      let one = await city.findOne({
        // 条件
        where: {and: [{name: arg.name}]},
        // 跳过实例数
        skip: 0,
        // 限制实例数
        limit: 0,
        // 包含在响应的字段或者是去掉的
        fields: [],
      });
      let state;
      if (one) { throw new Error(`${one.name}已存在`); }
      if (!arg.id) {
        state = await city.create(arg);
      } else {
        state = await city.update(arg);
      }
      return {
        status: true,
        data: state,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        errMsg: error.message,
      };
    }
  };
  // 通过id删除(删除为delete,所以添加该post方法)
  city.delete = async function(arg = {}) {
    try {
      let {id} = arg;
      if (!id) {
        throw new Error('id 为删除必填参数');
      }
      let state = await city.deleteById(id);
      if (state.count == 0) {
        throw new Error(`id 为 ${id} 的数据已删除`);
      }
      return {
        status: true
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        errMsg: error.message,
      };
    }
  };

  city.remoteMethod('findList', {
    accepts: {arg: 'data', type: 'object', http: {source: 'body'}},
    returns: {
      root: true,
      type: 'object',
    },
  });
  city.remoteMethod('findOneByPost', {
    accepts: {arg: 'data', type: 'object', http: {source: 'body'}},
    returns: {
      root: true,
      type: 'object',
    },
  });
  city.remoteMethod('insertOrUpdate', {
    accepts: {arg: 'data', type: 'object', http: {source: 'body'}},
    returns: {
      root: true,
      type: 'object',
    },
  });
  city.remoteMethod('delete', {
    accepts: {arg: 'data', type: 'object', http: {source: 'body'}},
    returns: {
      root: true,
      type: 'object',
    },
  });
};
