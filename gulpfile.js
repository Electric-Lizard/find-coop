'use strict';
var gulp = require('gulp');
var webpack = require('webpack');
var path = require('path');
var shelljs = require('shelljs');


const build = (config) => {
  const compiler = webpack({
    entry: path.resolve(__dirname, 'js', 'app.js'),
    module: {
      loaders: [
        {
          exclude: /node_modules/,
          loader: 'babel',
          query: {stage: 0, plugins: ['./build/babelRelayPlugin']},
          test: /\.js$/,
        }
      ]
    },
    output: {filename: 'app.js', path: path.resolve(__dirname, 'public', 'js')},
    debug: true,
    devtool: 'source-map',
    plugins: config.debug ? [] : [new webpack.optimize.UglifyJsPlugin()]
  });

  const fn = config.debug ? watch : run;
  fn(compiler, config);
};

const onCompile = (err) => {
  const msg = err ?
    `Recompiled with errors! ${err}` :
    'Successfully recompiled';
  shelljs.exec(`notify-send --expire-time 1000 "${msg}"`);
};
const watch = (compiler) => {
  compiler.watch({
    aggregateTimeout: 300,
  }, onCompile);
};

const run = (compiler) => {
  compiler.run(onCompile);
};

gulp.task('build', function() {
  build();
});
gulp.task('watch', function() {
  build({debug: true});
});

gulp.task('default', ['build']);

