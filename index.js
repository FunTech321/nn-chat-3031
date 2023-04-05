'use strict';
const http = require('http');
const auth = require('http-auth');
const router = require('./lib/router');

const basic = auth.basic({
  realm: 'Enter username and password.',
  file: './users.htpasswd'
});

const server = http.createServer(basic.check((req, res) => {
  router.route(req, res);
})).on('error', (e) => {
  console.error('Server Error', e);
}).on('clientError', (e) => {
  console.error('Client Error', e);
});

//renderのポートは環境変数で指定される可能性があるor8000番
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.info(`Listening on ${port}`);
});