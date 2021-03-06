import User from '../models/User';
import ErrorResponse from '../utils/errorResponse';

export const register = async (req, res, next) => {
  const { email, username, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    sendToken(user, 201, res);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new ErrorResponse('something is missing.  Please verify.', 400),
    );
  }

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }
    const isMatched = await user.matchPasswords(password);
    if (!isMatched) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }
    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = (req, res, next) => {
  res.send('forget password routes');
};

export const resetPassword = (req, res, next) => {
  res.send('reset password routes');
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({
    success: true,
    token,
  });
};
