import app from './app';

const port = process.env.PORT || 5280;

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

console.log('dirname', __dirname);

console.log('filename', __filename);

async function start() {
  const http = await app.setup();
  return http.listen(port, (err: Error) => {
    if (err) {
      return console.error(err);
    }

    console.log(`server is listening on ${port}`);
  });
}

export default start();
