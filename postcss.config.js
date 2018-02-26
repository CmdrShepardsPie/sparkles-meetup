module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: [
        'last 1 Chrome versions',
        'last 1 Firefox versions',
        'last 1 Safari versions',
        'last 1 Edge versions'
      ]
    })
  ]
};
