const httpStatus = require('http-status');
const { appSecret } = require('../../config/vars');

module.exports = (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    if (appSecret === bearerToken) {
      return next();
    }

    return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Invalid auth token!' });
  }

  return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Invalid auth token!' });
};
