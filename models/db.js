var setting=require('../Setting');
var Db=require('mongodb').Db;
var Connection=require('mongodb').Connection;
var Server=require('mongodb').Server;
module.exports=new Db(setting.db,new Server(setting.host,Connection.DEFAULT_PORT,{}));