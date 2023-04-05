'use strict';
const { Sequelize, DataTypes } = require('sequelize');
//objectを代入-renderでDBと接続する際に必要なオプション
const dialectOptions = {
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
};
//これは長いけど条件演算子 a ? true:false
//process.envのURLが環境変数にあれば本番環境だと判断
const sequelize = process.env.DATABASE_URL ?
  //本番環境のsequelize
  new Sequelize(
    process.env.DATABSE_URL,
    {
      logging: false,
      //本番環境だとdialectOptionsを設定する必要がある
      dialectOptions
    }
  )
  :
  //開発環境のsequelize
  new Sequelize('postgres://postgres:postgres@db/nn_chat',
  {
    logging: false
  }
);
const Post = sequelize.define(
  'Post',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    content: {
      type: DataTypes.TEXT
    },
    postedBy: {
      type: DataTypes.STRING
    }
  },
  {
    freezeTableName: true,
    timestamps: true
  }
);

Post.sync();
module.exports = Post;