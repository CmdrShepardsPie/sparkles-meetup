console.log('app.filters');

import Vue from 'vue';

Vue.filter('big-number', (value: number = 0, round: number = 0, dropZero: boolean = false) => {
  value = Math.round(value * Math.pow(10, round)) / Math.pow(10, round);
  const vs = value.toString();
  const parts = vs.split('.');
  const length = parts[0].length;
  let num = '';
  for (let i = length - 1; i >= 0; i--) {
    num = parts[0][i] + (i !== length - 1 && (length - 1 - i) % 3 === 0 ? ',' : '') + num;
  }
  parts[0] = num;
  if (round > 0) {
    if (!parts[1]) {
      parts[1] = '';
    }
    while (!dropZero && parts[1].length < round) {
      parts[1] = parts[1] + '0';
    }
  }
  return parts[1] ? parts.join('.') : parts.join('');
});
