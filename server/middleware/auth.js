'use strict';

// const jwt = require('jsonwebtoken');

module.exports = function() {
  return function myMiddleware(req, res, next) {
    try {
      // token 验证
      if (!req.headers.authorization) throw new Error('Invalid request!');
      next();
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
};
