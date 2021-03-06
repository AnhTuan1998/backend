'use strict';

const jwt = require('jsonwebtoken');
const app = require('@server/server');
const constants = require('@common/constants');
const secretKey = app.get('SECRET_KEY_JWT');

const generateToken = (user, option) => {
  option = option || {};
  let salt = option.salt || '';
  let ttl = option.ttl;
  let claims = {
    id: user.id,
    email: user.email,
    status: user.status,
  };

  ttl = ttl || (constants.TIME_EXPIRE_USER || 3600); // 1h as default

  return jwt.sign({
    data: claims,
  }, secretKey + salt, {
    expiresIn: ttl,
  });
};

const verifyToken = (token, salt = '') => {
  try {
    return jwt.verify(token, secretKey + salt);
  } catch (e) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
