var BDsql = require("mssql");
var BDconfiguracion = require("../configuraciones");


exports.executeSql = function (sql, callback){
	var conn = new BDsql.ConnectionPool(BDconfiguracion.dbConfig);
	conn.connect()
	.then(function(){
		var req = new BDsql.Request(conn);
		req.query(sql)
		.then(function (recordset){
			callback(recordset.recordset);
		})
		.catch(function (err){
			console.log("error 1: "+err);
			callback(null, err);
		});
	})
	.catch(function (err){
		console.log("error 2: "+err);
		callback(null, err);
	});
};