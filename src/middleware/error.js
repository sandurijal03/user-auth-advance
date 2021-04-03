import ErrorResponse from '../utils/errorResponse';

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  if (err.code === 11000) {
    const message = 'Duplicate Field Value Error';
    error = new ErrorResponse(message, 400);
  }

  if (err.name === 'validationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error',
  });
};

export default errorHandler;
