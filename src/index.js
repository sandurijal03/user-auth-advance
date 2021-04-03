import express from 'express';

import userRoutes from './routes/auth';

const app = express();

app.use(express.json());

app.use('/api/auth', userRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log('Listening on port ' + port));
