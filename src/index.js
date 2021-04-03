import express from 'express';

import userRoutes from './routes/auth';
import connectDb from './config/db';

connectDb();

const app = express();
app.use(express.json());

app.use('/api/auth', userRoutes);

const port = process.env.PORT || 3001;
const server = app.listen(port, () => console.log('Listening on port ' + port));

process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error ${err}`);
  server.close(() => process.exit(1));
});
