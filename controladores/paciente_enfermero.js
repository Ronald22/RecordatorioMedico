var db = require("../nucleo/bd");
var httpMsgs = require("../nucleo/mensajesHTTPs");
var util = require("util");

/*exports.getList = function (req, resp){
	db.executeSql("SELECT * FROM  Turno", function(data, err){
		if (err){
			httpMsgs.show500(req, resp, err);
		}
		else{
			httpMsgs.sendJson(req, resp, data);
		}	
	});
};

exports.get = function (req, resp, cedula){
	db.executeSql("SELECT * FROM  Enfermero WHERE cedula LIKE '"+cedula+"%' or nombre LIKE '"+cedula+"%'", function(data, err){
		if (err){
			httpMsgs.show500(req, resp, err);
		}
		else{
			httpMsgs.sendJson(req, resp, data);
		}	
	});
};*/

exports.add = function (req, resp, reqBody){
	try {
		if (!reqBody) throw new Error("Entrada no valida");
		var data = JSON.parse(reqBody);
		if(data){
			var sql = "INSERT INTO Enfermero_Paciente (cedula_Paciente, cedula_Enfermero) values";
			sql+= util.format("(%d, %d)",data.cedula_Paciente, data.cedula_Enfermero);
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

			if (!data.cedula_Paciente) throw new Error("Usuario no registrado");
			
			var sql = "Update Enfermero_Paciente Set ";
			var isDataProvide = false;

			if (data.cedula_Enfermero) {
				sql+= "cedula_Enfermero = '"+ data.cedula_Enfermero+"',";
				isDataProvide = true;
			}

			sql = sql.slice(0, -1); //elimina la ultima coma
			sql+= "Where cedula_Paciente =" + data.cedula_Paciente;

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

			if (!data.cedula_Paciente) throw new Error("Usuario no registrado");
			
			var sql = "Delete from Enfermero_Paciente ";
			sql+= " Where cedula_Paciente = " + data.cedula_Paciente;

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