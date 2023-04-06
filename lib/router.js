'use strict';
const postsHandler = require('./posts-handler');
const util = require('./handler-util');

function route(req, res) {
  //環境変数がある=本番環境で動かしている場合で、かつ...protoというヘッダの値がhttpであるとき
  //x-forwarded-protoヘッダには、renderがNode.jsのアプリに内部的にリクエストを渡すときにアクセスで利用されたプロトコルが含まれる。ここでhttpsなのか判定できる
  if (process.env.DATABASE_URL && req.headers['x-forwarded-proto'] === 'http') {
    //HTTPの時はnot found 404を返す
    util.handleNotFound(req, res);
  }
  switch (req.url) {
    case '/posts':
      postsHandler.handle(req, res);
      break;
    case '/posts/delete':
      postsHandler.handleDelete(req, res);
      break;
    case '/logout':
      util.handleLogout(req, res);
      break;
    case '/favicon.ico':
      util.handleFavicon(req, res);
      break;
    case '/changeTheme':
      util.handleChangeTheme(req, res);
      break;
    default:
      util.handleNotFound(req, res);
      break;
  }
}

module.exports = {
  route
};
