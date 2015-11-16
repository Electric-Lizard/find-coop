import express from 'express';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import webpack from 'webpack';
import 'express';
import {Schema} from './data/schema';

const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;

// Expose a GraphQL endpoint
var graphQLServer = express();
graphQLServer.use('/', graphQLHTTP({
  graphiql: true,
  pretty: true,
  schema: Schema,
}));
graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));

// Serve the Relay app
var compiler = webpack({
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
  output: {filename: 'app.js', path: './public/js'},
  debug: true,
  devtool: 'source-map',
});

var app = express();
// Serve static resources
app.use(express.static(path.resolve(__dirname, 'public')));
app.get('/:path', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
})
app.use('/graphql', graphQLServer);

app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});
compiler.watch({ // watch options:
    aggregateTimeout: 300, // wait so long for more changes
    poll: true // use polling instead of native watchers
    // pass a number to set the polling interval
}, function(err, stats) {
  console.log(err);
});
