import express from 'express';
import morgan from 'morgan';

const app = express();

// dev logger
app.use(morgan('dev'));

const port = process.env.PORT ?? 5000;

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
