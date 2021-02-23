// const { isTokenValid } = require('./oauth.service');

const { verifyJWT } = require('./auth.service');

exports.wrapAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

exports.isAuthenticated = async (req, res, next) => {
  const token = req.cookes.t_id;

  const data = verifyJWT(token);
  console.log('jwt data', data);
  return true;
};
