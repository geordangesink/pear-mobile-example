module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['./node_modules/pear-mobile/scripts/babel-plugin']
    ]
  }
}
