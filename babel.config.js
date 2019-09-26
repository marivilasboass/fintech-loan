module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '~': './src'
          }
        }
      ]
    ],
    env: {
      development: {
        plugins: [
          'transform-inline-environment-variables'
        ]
      }
    }
  }
}
