var db = require("../nucleo/bd");
var httpMsgs = require("../nucleo/mensajesHTTPs");
var util = require("util");

exports.getList = function (req, resp){
	db.executeSql("SELECT P.cedula, P.nombreP, P.apellidoP, P.descripcion, P.habitacion, E.nombre, E.apellido FROM RecordatorioMedico.dbo.Enfermero E , RecordatorioMedico.dbo.Paciente P , RecordatorioMedico.dbo.Enfermero_Paciente EP WHERE E.cedula = EP.cedula_Enfermero and P.cedula = EP.cedula_Paciente", function(data, err){
		if (err){
			httpMsgs.show500(req, resp, err);
		}
		else{
			httpMsgs.sendJson(req, resp, data);
		}	
	});
};

exports.get = function (req, resp, cedula){
	db.executeSql("SELECT P.cedula, P.nombreP, P.apellidoP, P.descripcion, P.habitacion, E.nombre, E.apellido FROM RecordatorioMedico.dbo.Enfermero E , RecordatorioMedico.dbo.Paciente P , RecordatorioMedico.dbo.Enfermero_Paciente EP WHERE E.cedula = (EP.cedula_Enfermero) and (P.cedula = EP.cedula_Paciente) and (P.cedula LIKE '"+cedula+"%' or P.nombreP LIKE '"+cedula+"%')", function(data, err){
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
			var sql = "INSERT INTO RecordatorioMedico.dbo.Paciente (cedula, nombreP, apellidoP, descripcion, habitacion) values";
			sql+= util.format("(%d, '%s', '%s', '%s', %d)",data.cedula, data.nombreP, data.apellidoP, data.descripcion, data.habitacion);
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
			
			var sql = "Update RecordatorioMedico.dbo.Paciente Set ";
			var isDataProvide = false;

			if (data.nombreP) {
				sql+= "nombreP = '"+ data.nombreP+"',";
				isDataProvide = true;
			}
			if (data.apellidoP) {
				sql+= "apellidoP = '"+ data.apellidoP+"',";
				isDataProvide = true;
			}
			if (data.descripcion) {
				sql+= "descripcion = '"+ data.descripcion+"',";
				isDataProvide = true;
			}
			if (data.habitacion) {
				sql+= "habitacion = '"+ data.habitacion+"',";
				isDataProvide = true;
			}

			sql = sql.slice(0, -1); //elimina la ultima coma
			sql+= "Where cedula =" + data.cedula;

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
			
			var sql = "Delete from RecordatorioMedico.dbo.Paciente ";
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