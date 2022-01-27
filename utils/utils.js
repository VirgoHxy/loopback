'use strict';

exports.getBodyAccept = getBodyAccept;
exports.getHeadersAccept = getHeadersAccept;

const app = require('../server/server');

/**
 * 获取accept请求参数列表
 * @param {Array} bodyArr
 * @param {Object} modelJson
 * @return {*}
 */
function getBodyAccept(bodyArr, modelJson) {
  let bodyAccept = bodyArr.map((element) => {
    let property = modelJson.properties[element.arg];
    element.http = {source: 'form'};
    if (property) {
      if (!element.type && property.type) {
        element.type = property.type;
      }
      if (!element.description && property.description) {
        element.description = property.description;
      }
    }
    return element;
  });
  return bodyAccept;
}

/**
 * 获取accept请求头对象
 * @param {Object} headers headers的键作用为获取请求头参数,headers的值为请求头参数字段
 * @return {*}
 */
function getHeadersAccept(headers) {
  return {
    arg: 'headers',
    type: 'object',
    http: function(ctx) {
      let acceptHeaders = {};
      for (const key in headers) {
        if (Object.hasOwnProperty.call(headers, key)) {
          let element = headers[key];
          if (key == 'language') {
            acceptHeaders[key] = ctx.req.headers[element] || 'tw';
          } else if (key == 'empType') {
            let emptype = ctx.req.headers[element];
            if (Array.isArray(emptype)) {
              acceptHeaders[key] = emptype;
            } else if (typeof emptype == 'string' && emptype) {
              try {
                emptype = Array.isArray(JSON.parse(emptype)) ? JSON.parse(emptype) : undefined;
              } catch (error) {
                emptype = undefined;
              }
              acceptHeaders[key] = emptype;
            } else {
              acceptHeaders[key] = undefined;
            }
          } else if (key == 'token') {
            let startPoint = ctx.req.headers[element].slice(0, 7);
            const authorization = startPoint === 'Bearer ' ? ctx.req.headers[element].slice(7) : ctx.req.headers[element];
            acceptHeaders[key] = authorization;
          } else {
            acceptHeaders[key] = ctx.req.headers[element];
          }
        }
      }
      // console.log(acceptHeaders);
      return acceptHeaders;
    },
  };
}
