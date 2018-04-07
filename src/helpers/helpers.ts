function wait(ms: number, fn?: any) {
  return new Promise((resolve, reject) => {
    window.setTimeout(async () => {
      try {
        resolve(fn && await fn());
      } catch (e) {
        reject(e);
      }
    }, ms);
  });
}

export default {
  wait
};
