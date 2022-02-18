'use strict';

const path = require('path');
const fs = require('fs');

// create('affect-item', 'control-run/base-models', 'all');

function create(name, dir, type) {
  if (!name) { return console.log('name为空'); };
  if (!dir) { return console.log('dir为空'); };
  let fileName = name;
  let plural, tableName;
  if (name.indexOf('-') != -1) {
    let nameArr = name.split('-');
    plural = nameArr.join('') + 's';
    tableName = nameArr.map(ele => {
      return ele.replace(ele[0], ele[0].toUpperCase());
    }).join('');
  } else {
    plural = name + 's';
    tableName = name.replace(name[0], name[0].toUpperCase());
  }
  if (type == 'js') {
    createJs({fileName, plural, tableName, dir});
  } else if (type == 'json') {
    createJson({fileName, plural, tableName, dir});
  } else if (type == 'all') {
    createJs({fileName, plural, tableName, dir});
    createJson({fileName, plural, tableName, dir});
  }
};

function createJson({fileName, plural, tableName, dir}) {
  let jsonTemp = `{
  "name": "${tableName}",
  "plural": "${plural}",
  "base": "PersistedModel",
  "idInjection": false,
  "options": {
    "validateUpsert": true,
    "mysql": {
      "table": "${tableName}"
    }
  },
  "properties": {
    "id": {
      "id": true,
      "type": "number",
      "mysql": {
        "columnName": "ID",
        "dataType": "INT",
        "dataLength": 11
      }
    },
    "string": {
      "type": "string",
      "required": true,
      "mysql": {
        "columnName": "",
        "dataType": "VARCHAR",
        "dataLength": 50
      }
    },
    "flag": {
      "type": "boolean",
      "default": 0,
      "mysql": {
        "columnName": "",
        "dataType": "INT",
        "dataLength": 1
      }
    },
    "number": {
      "type": "number",
      "default": 0,
      "mysql": {
        "columnName": "",
        "dataType": "INT",
        "dataLength": 1
      }
    },
    "time": {
      "type": "date",
      "mysql": {
        "columnName": "",
        "dataType": "DATETIME",
        "nullable": "Y"
      }
    }
  },
  "validations": [],
  "relations": {},
  "acls": [],
  "methods": {}
}`;
  fsCreate({fileName, dir, fileType: 'json', template: jsonTemp});
};

function createJs({fileName, plural, tableName, dir}) {
  let commonPath = '../../';
  let utilsPath = '../../../';
  let num = getRepeatNum(dir, '/');
  if (num != 0) {
    commonPath += '../'.repeat(num);
    utilsPath += '../'.repeat(num);
  }
  let jsTemp = `'use strict';

// 公共数据
const apiConfig = require('${commonPath}config/api-config.json');
const events = require('${commonPath}events/evenets-handle');
const handleError = require('${utilsPath}utils/handle-error');
const utils = require('${utilsPath}utils/utils');

// 定义
const modelJson = require('./${fileName}.json');
const argumentResponse = {arg: 'response', type: 'object'};

module.exports = function(${tableName}) {
  /**
   * 创建${tableName}
   * @param {object} headers
   * @param {string} headers.token
   * @param {string} headers.language
   * @returns {object} 返回处理后的数据
   */
  async function create${tableName}(
    headers,
  ) {
    try {
      // 请求头
      let {token, language} = headers;
      // 返回
      let response = {};
      // 数据源
      let datasources = ${tableName}.app.datasources;
      await datasources.MariaDB.transaction(
        async (models) => {
          const {${tableName}} = models;
        },
        {
          timeout: 6000,
        },
      );
      // 返回赋值
      return {
        status: apiConfig.apiSuccess,
        data: response,
      };
    } catch (error) {
      return handleError.handleCatchError(error);
    }
  }
  ${tableName}.create${tableName} = create${tableName};
  ${tableName}.remoteMethod('create${tableName}', {
    description: '创建新的${tableName}',
    http: {
      path: '/create${tableName}',
      verb: 'post',
    },
    accepts: [
      ...utils.getBodyAccept(
        [

        ],
        modelJson,
      ),
      utils.getHeadersAccept({
        token: 'authorization',
        language: 'language',
      }),
    ],
    returns: argumentResponse,
  });

  /**
   * 更新${tableName}信息
   * @param {object} headers
   * @param {string} headers.token
   * @param {string} headers.language
   * @returns {object} 返回处理后的数据
   */
  async function update${tableName}Info(
    headers,
  ) {
    try {
      // 请求头
      let {token, language} = headers;
      // 返回
      let response = {};
      // 数据源
      let datasources = ${tableName}.app.datasources;
      await datasources.MariaDB.transaction(
        async (models) => {
          const {${tableName}} = models;
        },
        {
          timeout: 6000,
        },
      );
      // 返回赋值
      return {
        status: apiConfig.apiSuccess,
        data: response,
      };
    } catch (error) {
      return handleError.handleCatchError(error);
    }
  }
  ${tableName}.update${tableName}Info = update${tableName}Info;
  ${tableName}.remoteMethod('update${tableName}Info', {
    description: '更新${tableName}信息',
    http: {
      path: '/update${tableName}Info',
      verb: 'post',
    },
    accepts: [
      ...utils.getBodyAccept(
        [

        ],
        modelJson,
      ),
      utils.getHeadersAccept({
        token: 'authorization',
        language: 'language',
      }),
    ],
    returns: argumentResponse,
  });

  /**
   * 获取${tableName}信息
   * @param {object} headers
   * @param {string} headers.token
   * @param {string} headers.language
   * @returns {object} 返回处理后的数据
   */
  async function get${tableName}Info(
    headers,
  ) {
    try {
      // 请求头
      let {token, language} = headers;
      // 返回
      let response = {};
      // 数据源
      let datasources = ${tableName}.app.datasources;
      await datasources.MariaDB.transaction(
        async (models) => {
          const {${tableName}} = models;
        },
        {
          timeout: 6000,
        },
      );
      // 返回赋值
      return {
        status: apiConfig.apiSuccess,
        data: response,
      };
    } catch (error) {
      return handleError.handleCatchError(error);
    }
  }
  ${tableName}.get${tableName}Info = get${tableName}Info;
  ${tableName}.remoteMethod('get${tableName}Info', {
    description: '获取${tableName}信息',
    http: {
      path: '/get${tableName}Info',
      verb: 'post',
    },
    accepts: [
      ...utils.getBodyAccept(
        [

        ],
        modelJson,
      ),
      utils.getHeadersAccept({
        token: 'authorization',
        language: 'language',
      }),
    ],
    returns: argumentResponse,
  });
};
`;
  fsCreate({fileName, dir, fileType: 'js', template: jsTemp});
};

function fsCreate({fileName, dir, fileType, template}) {
  let p = `${path.join(__dirname, '../common/models/' + dir)}\\${fileName}.${fileType}`;
  try {
    writeByPathSync(p, template);
    console.log(`${fileType}文件写入成功！`);
  } catch (error) {
    console.log(error);
  }
}

function writeByPathSync(paramPath, contentStr) {
  try {
    let write = function(str, appendFlag) {
      if (str.match(/[^\\/]*$/)[0].indexOf('.') != -1) {
        // eslint-disable-next-line no-unused-expressions
        !contentStr && (console.log('写入内容为空'));
        if (!appendFlag) {
          fs.writeFileSync(str, contentStr || '');
        } else {
          fs.appendFileSync(str, contentStr || '');
        }
      } else {
        if (!appendFlag) {
          fs.mkdirSync(str);
        } else {
          throw new Error('路径已存在');
        }
      }
    };
    if (!fs.existsSync(paramPath)) {
      paramPath = paramPath.replace(/\\\\|\\/g, '/');
      let pathArr = paramPath.split('/');
      let pathStr = pathArr[0];
      pathArr.splice(0, 1);
      while (pathArr.length > 0) {
        pathStr += '/' + pathArr[0];
        if (!fs.existsSync(pathStr)) {
          write(pathStr);
        }
        pathArr.splice(0, 1);
      }
    } else {
      write(paramPath, true);
    }
  } catch (error) {
    throw error;
  }
}

function getRepeatNum(str, val) {
  return (str == null || str === '' || val == null || val === '') ? 0 : str.match(new RegExp(val, 'g')).length;
}
