const { verifyToken } = require('../logic/auth/jwt');
const { error } = require('../constant/chalkEvent');

const authenticate = async (req, res, next) => {
  const bearer = req.headers.authorization;
  if (typeof bearer === 'undefined') {
    res.forbidden({ message: 'not logged in' });
    return;
  }

  if (typeof bearer !== 'undefined') {
    const [, token] = bearer.split(' ');

    try {
      const payload = await verifyToken(token);
      if (!payload) {
        res.unauthorized({ message: 'Unauthorized, Please login first' });
        return;
      }
      if (payload.role === 'admin' || payload.role === 'owner') {
        req.admin = payload;
        next();
      } else {
        req.user = payload;
        next();
      }
    } catch (ex) {
      error(ex);
      res.serverError({ message: 'Unauthorized, invalid token' });
    }
  }
};
exports.authenticate = authenticate;

const authorizeAdminOrOwner = (req, res, next) => {
  if (req.admin) {
    next();
    return;
  }
  res.forbidden({ message: 'forbidden' });
};
exports.authorizeAdminOrOwner = authorizeAdminOrOwner;
