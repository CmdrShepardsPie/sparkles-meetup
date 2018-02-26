import 'babel-polyfill';

import app from './app';

const port = process.env.PORT || 9000;

app.express.listen(port, (err: Error) => {
  if (err) {
    return console.error(err);
  }

  return console.log(`server is listening on ${port}`);
});
