var db = require("../nucleo/bd");
var httpMsgs = require("../nucleo/mensajesHTTPs");
var util = require("util");

exports.getList = function (req, resp){
	db.executeSql("SELECT E.cedula, E.usuario, E.contraseña, E.nombre, E.apellido, E.email, T.id, T.hora_Entrada, T.hora_Salida FROM Enfermero E , Turno T WHERE E.id_Turno = T.id", function(data, err){
		if (err){
			httpMsgs.show500(req, resp, err);
		}
		else{
			httpMsgs.sendJson(req, resp, data);
		}	
	});
};

exports.get = function (req, resp, cedula){
	db.executeSql("SELECT E.cedula, E.usuario, E.contraseña, E.nombre, E.apellido, E.email, T.id, T.hora_Entrada, T.hora_Salida FROM Enfermero E , Turno T WHERE E.id_Turno = T.id and (E.cedula LIKE '"+cedula+"%' or E.nombre LIKE '"+cedula+"%')", function(data, err){
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
			var sql = "INSERT INTO Enfermero (cedula, usuario, contraseña, nombre, apellido, email, id_Turno) values";
			sql+= util.format("(%d, '%s', '%s', '%s', '%s', '%s', %d)",data.cedula, data.usuario, data.contraseña, data.nombre, data.apellido, data.email, data.id_Turno);
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

			if (!data.cedula) throw new Error("Usuario no registrado");
			
			var sql = "Update Enfermero Set ";
			var isDataProvide = false;

			if (data.usuario) {
				sql+= "usuario = '"+ data.usuario+"',";
				isDataProvide = true;
			}
			if (data.contraseña) {
				sql+= "contraseña = '"+ data.contraseña+"',";
				isDataProvide = true;
			}
			if (data.nombre) {
				sql+= "nombre = '"+ data.nombre+"',";
				isDataProvide = true;
			}
			if (data.apellido) {
				sql+= "apellido = '"+ data.apellido+"',";
				isDataProvide = true;
			}
			if (data.email) {
				sql+= "email = '"+ data.email+"',";
				isDataProvide = true;
			}
			if (data.id_Turno) {
				sql+= "id_Turno = '"+ data.id_Turno+"',";
				isDataProvide = true;
			}

			sql = sql.slice(0, -1); //elimina la ultima coma
			sql+= " Where cedula =" + data.cedula;

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

			if (!data.cedula) throw new Error("Usuario no registrado");
			
			var sql = "Delete from Enfermero ";
			sql+= " Where cedula = " + data.cedula;

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