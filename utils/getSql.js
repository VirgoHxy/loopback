'use strict';
const path = require('path');

getSqlofAlter('warehouse-order', 'control-run/base-models');
// getSqlofCreate('warehouse-order', 'control-run/base-models');

function getSqlofAlter(jsonName, dir) {
  const {properties} = require(`${path.join(__dirname, '../common/models/' + dir)}\\${jsonName}.json`);
  let tableName = '';
  if (jsonName.indexOf('-') != -1) {
    tableName = jsonName.split('-').map(ele => {
      return ele.replace(ele[0], ele[0].toUpperCase());
    }).join('');
  } else {
    tableName = jsonName.replace(jsonName[0], jsonName[0].toUpperCase());
  }
  let str = `ALTER TABLE dams.${tableName}
`;
  for (const key in properties) {
    if (Object.hasOwnProperty.call(properties, key)) {
      const element = properties[key];
      let mysql = element.mysql;
      str += `ADD ${mysql.columnName} `;
      if (element.id) {
        str += `${mysql.dataType.toLowerCase()}(${mysql.dataLength}) NOT NULL AUTO_INCREMENT,
`;
      } else if (element.type == 'boolean') {
        str += `tinyint(1) DEFAULT ${element.default || 0} NULL,
`;
      } else if (element.type == 'string') {
        if (element.required) {
          str += `${mysql.dataType.toLowerCase()}(${mysql.dataLength}) NOT NULL,
`;
        } else {
          str += `${mysql.dataType.toLowerCase()}(${
            mysql.dataLength
          }) DEFAULT ${element.default || 'NULL'} NULL,
`;
        }
      } else if (element.type == 'number') {
        if (element.required) {
          str += `${mysql.dataType.toLowerCase()}(${mysql.dataLength}) NOT NULL,
`;
        } else {
          str += `${mysql.dataType.toLowerCase()}(${
            mysql.dataLength
          }) DEFAULT ${element.default || 0} NULL,
`;
        }
      } else if (element.type == 'date') {
        str += `${mysql.dataType.toLowerCase()} DEFAULT NULL NULL,
`;
      }
    }
  }
  console.log(Object.keys(properties).length);
  console.log(str.replace(/,\s$/g, ';'));
}

function getSqlofCreate(jsonName, dir) {
  const {properties} = require(`${path.join(__dirname, '../common/models/' + dir)}\\${jsonName}.json`);
  let tableName = '';
  if (jsonName.indexOf('-') != -1) {
    tableName = jsonName.split('-').map(ele => {
      return ele.replace(ele[0], ele[0].toUpperCase());
    }).join('');
  } else {
    tableName = jsonName.replace(jsonName[0], jsonName[0].toUpperCase());
  }
  let str = `CREATE TABLE \`${tableName}\` (
`;
  let idName = '';
  for (const key in properties) {
    if (Object.hasOwnProperty.call(properties, key)) {
      const element = properties[key];
      let mysql = element.mysql;
      str += `\`${mysql.columnName}\` `;
      if (element.id) {
        idName = mysql.columnName;
        str += `${mysql.dataType.toLowerCase()}(${mysql.dataLength}) NOT NULL AUTO_INCREMENT,
`;
      } else if (element.type == 'boolean') {
        str += `tinyint(1) DEFAULT ${element.default || 0} NULL,
`;
      } else if (element.type == 'string') {
        if (element.required) {
          str += `${mysql.dataType.toLowerCase()}(${mysql.dataLength}) NOT NULL,
`;
        } else {
          str += `${mysql.dataType.toLowerCase()}(${
            mysql.dataLength
          }) DEFAULT ${element.default || 'NULL'} NULL,
`;
        }
      } else if (element.type == 'number') {
        if (element.required) {
          str += `${mysql.dataType.toLowerCase()}(${mysql.dataLength}) NOT NULL,
`;
        } else {
          str += `${mysql.dataType.toLowerCase()}(${
            mysql.dataLength
          }) DEFAULT ${element.default || 0} NULL,
`;
        }
      } else if (element.type == 'date') {
        str += `${mysql.dataType.toLowerCase()} DEFAULT NULL NULL,
`;
      }
    }
  }
  str += `PRIMARY KEY (\`${idName}\`)
)
`;
  console.log(Object.keys(properties).length);
  console.log(str.replace(/,\s$/g, ';'));
}

