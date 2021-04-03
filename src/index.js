import express from 'express';

import userRoutes from './routes/auth';
import privateRoutes from './routes/private';
import connectDb from './config/db';
import errorHandler from './middleware/error';

connectDb();

const app = express();
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/private', privateRoutes);

// error handler should be last piece of middleware
app.use(errorHandler);

const port = process.env.PORT || 3001;
const server = app.listen(port, () => console.log('Listening on port ' + port));

process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error ${err}`);
  server.close(() => process.exit(1));
});
