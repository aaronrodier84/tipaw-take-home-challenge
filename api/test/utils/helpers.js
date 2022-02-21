const { set } = require('lodash');

const setHeaders = (headers = {}) => {
  set(headers, 'x-userinfo', JSON.stringify({
    email: 'leo@refinery.cc',
    given_name: 'Leo',
    family_name: 'Otero',
  }));

  if (!headers.authorization) {
    set(headers, 'authorization', 'refinery');
  }
  set(headers, 'Accept', 'application/json');

  return headers;
};

module.exports = {
  setHeaders,
};
