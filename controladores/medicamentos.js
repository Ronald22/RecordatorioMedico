var db = require("../nucleo/bd");
var httpMsgs = require("../nucleo/mensajesHTTPs");
var util = require("util");

exports.getList = function (req, resp){
	db.executeSql("SELECT * FROM  RecordatorioMedico.dbo.Medicamento", function(data, err){
		if (err){
			httpMsgs.show500(req, resp, err);
		}
		else{
			httpMsgs.sendJson(req, resp, data);
		}	
	});
};

exports.get = function (req, resp, cedula){
	db.executeSql("SELECT * FROM  RecordatorioMedico.dbo.Medicamento WHERE id LIKE '"+cedula+"%' or nombre LIKE '"+cedula+"%'", function(data, err){
		if (err){
			httpMsgs.show500(req, resp, err);
		}
		else{
			httpMsgs.sendJson(req, resp, data);
		}	
	});
};

exports.add = function (req, resp, reqBody){
	try {
		if (!reqBody) throw new Error("Entrada no valida");
		var data = JSON.parse(reqBody);
		if(data){
			var sql = "INSERT INTO RecordatorioMedico.dbo.Medicamento (id, nombre, tipo, descripcion, cantidad) values";
			sql+= util.format("(%d, '%s', '%s', '%s', %d )",data.id, data.nombre, data.tipo, data.descripcion, data.cantidad);
			db.executeSql(sql, function(data, err){
				if (err){
					httpMsgs.show500(req, resp, err);
				}
				else {
					httpMsgs.send200(req, resp, data);
				}	
			});
		}
		else{
			throw new Error("Entrada no valida");
		}
	}
	catch (ex){
		httpMsgs.show500(req, resp, ex);
	}
};

exports.update = function (req, resp, reqBody){
		try {
		if (!reqBody) throw new Error("Entrada no valida");
		var data = JSON.parse(reqBody);
		if  (data) {

			if (!data.id) throw new Error("Usuario no registrado");
			
			var sql = "Update RecordatorioMedico.dbo.Medicamento Set ";
			var isDataProvide = false;

			if (data.nombre) {
				sql+= "nombre = '"+ data.nombre+"',";
				isDataProvide = true;
			}
			if (data.tipo) {
				sql+= "tipo = '"+ data.tipo+"',";
				isDataProvide = true;
			}
			if (data.descripcion) {
				sql+= "descripcion = '"+ data.descripcion+"',";
				isDataProvide = true;
			}
			if (data.cantidad) {
				sql+= "cantidad = '"+ data.cantidad+"',";
				isDataProvide = true;
			}

			sql = sql.slice(0, -1); //elimina la ultima coma
			sql+= "Where id =" + data.id;

			db.executeSql(sql, function(data, err){
				if (err){
					httpMsgs.show500(req, resp, err);
				}
				else {
					httpMsgs.send200(req, resp, data);
				}	
			});
		}
		else{
			throw new Error("Entrada no valida");
		}
	}
	catch (ex){
		httpMsgs.show500(req, resp, ex);
	}
};

exports.delete = function (req, resp, reqBody){
			try {
		if (!reqBody) throw new Error("Entrada no valida");
		var data = JSON.parse(reqBody);
		if  (data) {

			if (!data.id) throw new Error("Usuario no registrado");
			
			var sql = "Delete from RecordatorioMedico.dbo.Medicamento ";
			sql+= " Where id = " + data.id;

			db.executeSql(sql, function(data, err){
				if (err){
					httpMsgs.show500(req, resp, err);
				}
				else {
					httpMsgs.send200(req, resp, data);
				}	
			});
		}
		else{
			throw new Error("Entrada no valida");
		}
	}
	catch (ex){
		httpMsgs.show500(req, resp, ex);
	}
};