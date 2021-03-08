require('dotenv').config()

module.exports = {
  trailingSlash: true,
  basePath: process.env.NEXT_BASE_PATH,
  assetPrefix: process.env.NEXT_BASE_PATH,
  webpack: (config) => {
    return Object.assign({}, config, {
      module: Object.assign({}, config.module, {
        rules: config.module.rules.concat([
          {
            test: /\.md$/,
            loader: 'emit-file-loader',
            options: {
              name: 'dist/[path][name].[ext]',
            },
          },
          {
            test: /\.md$/,
            loader: 'raw-loader',
          }
        ]),
      }),
    });
  }
}