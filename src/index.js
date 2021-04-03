import express from 'express';

const app = express();

app.use('/', (req, res) => {
  res.send('hello world');
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log('Listening on port ' + port));
