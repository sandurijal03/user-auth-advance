import User from '../models/User';

export const register = async (req, res, next) => {
  const { email, username, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      success: false,
      error: 'something is missing.Please verify',
    });
  }

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(404).json({
        success: false,
        error: 'Invalid credentials.',
      });
    }
    const isMatched = await user.matchPasswords(password);
    if (!isMatched) {
      res.status(404).json({
        success: false,
        error: 'Invalid credentials.',
      });
    }
    res.status(200).json({
      success: true,
      token: 'nlnfkaamflafm',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const forgotPassword = (req, res, next) => {
  res.send('forget password routes');
};

export const resetPassword = (req, res, next) => {
  res.send('reset password routes');
};
