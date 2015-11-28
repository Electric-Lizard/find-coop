import {Schema} from './data/schema';

import express from 'express';
import expressSession from 'express-session';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import 'express';


const APP_PORT = 3000;

const graphQLServer = graphQLHTTP((req) => ({
  graphiql: true,
  pretty: true,
  schema: Schema,
  rootValue: {
    session: req.session
  }
}));

var app = express();
app.use(expressSession({
  secret: 'JKWHNXWHgxbJFGfg4fxgbhjf#F$X:#Y$NU#XGN#U$NG#U$GN#UX$GUXSAWPQIOQI',
  resave: false,
  saveUninitialized: false,
}));
// Serve static resources
app.use(express.static(path.resolve(__dirname, 'public')));
app.get('/:path', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
app.use('/graphql', graphQLServer);

app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});
