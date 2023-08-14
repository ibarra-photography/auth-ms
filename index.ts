import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { router } from './router/router';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1/authentication', router);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Not found!' });
});

app.listen(4000, () => {
  console.log('listening on port 4000!');
});
