const webpack = require('webpack')
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const SRC_ROOT_PATH = path.join(__dirname, './', 'src');

module.exports = {
  entry: {
    background: path.join(SRC_ROOT_PATH, 'background', 'background.ts'),
    index: path.join(SRC_ROOT_PATH, 'index.tsx'),
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: () => '[name].js',
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        path.join(__dirname, '/public/manifest.json'),
        path.join(__dirname, '/public/dlclinkicon.png'),
        path.join(__dirname, '/public/DLC.Link_Emoji.png'),
        path.join(__dirname, '/public/favicon.ico'),
        path.join(__dirname, '/public/index.html'),
        path.join(__dirname, '/public/popup-center.html')
      ],
    }),
    new CopyPlugin({
      patterns: [{
        from: 'node_modules/webextension-polyfill/dist/browser-polyfill.js',
      }],
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'asset/resource',
        options: {
          name: '[name].html',
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /cfddlcjs_wasm\.wasm/,
        type: `asset/resource`,
        generator: {
          filename: '[name].wasm',
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      buffer: require.resolve('buffer/'),
      stream: require.resolve('stream-browserify'),
      string_decoder: require.resolve('string_decoder/'),
      events: require.resolve('events/'),
      process: require.resolve('process/'),
      crypto: require.resolve('crypto-browserify'),
    },
  },
  devServer: {
    port: 9090,
    static: [
      path.join(__dirname, 'dist'),
      path.join(__dirname, 'cfd-dlc-js-wasm/dist'),
      path.join(__dirname, 'public/'),
    ],
    proxy: {
      '/electrs': {
        target: 'http://127.0.0.1:3004',
        pathRewrite: { '^/electrs': '' },
      },
    },
  },
  experiments: {
    asyncWebAssembly: true,
  },
}
