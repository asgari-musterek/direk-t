module.exports = {
  "trailingSlash": true,
  webpack: (config) => {
    return Object.assign({}, config, {
      // externals: Object.assign({}, config.externals, {
      //   fs: 'fs',
      // }),
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