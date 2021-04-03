import { verify } from 'jsonwebtoken';
import User from '../models/User';
import ErrorResponse from '../utils/errorResponse';

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new ErrorResponse('not authorizzed to access this route', 401));
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new ErrorResponse('no user associated with this id', 404));
    }

    req.user = user;
    next();
  } catch (err) {
    return next(new ErrorResponse('not authorized to access this route', 401));
  }
};
