var http = require("http");
var administrador = require("./controladores/administrador")
var medico = require("./controladores/medico");
var enfermero = require("./controladores/enfermero");
var turno = require("./controladores/turno");
var paciente = require("./controladores/paciente");
var ep = require("./controladores/paciente_enfermero");
var medicamento = require("./controladores/medicamentos");
var configuracion = require("./configuraciones");
var httpMsgs = require("./nucleo/mensajesHTTPs")
var express = require('express') 

/*-------------------------Administrador----------------------------*/
var rutaAdministrador = express.Router();
rutaAdministrador.route('/')
.get(administrador.getList);
/*----------------------------Medico--------------------------------*/
var rutaMedico =  express.Router();
rutaMedico.route('/')
.get(medico.getList)
.post(function(req, resp){
	var reqBody = "";
	req.on("data", function(data){
		reqBody += data;
			if (reqBody.length > 1e7) //10Mb
			{
				httpMsgs.show413(req, resp);
			}
		});

	req.on("end", function(){
		medico.add(req, resp, reqBody);
	});
})
.put(function(req, resp){
	var reqBody = "";
	req.on("data", function(data){
		reqBody += data;
		if (reqBody.length > 1e7) //10Mb
		{
			httpMsgs.show413(req, resp);
		}
	});
	req.on("end", function(){
		medico.update(req, resp, reqBody);
	});
})
.delete(function(req, resp){
	var reqBody = "";
	req.on("data", function(data){
		reqBody += data;
		if (reqBody.length > 1e7) //10Mb
		{
			httpMsgs.show413(req, resp);
		}
	});
	req.on("end", function(){
		medico.delete(req, resp, reqBody);
	});
});
rutaMedico.route("/:cedula/")
.get(function(req, resp){				
	var cedula = req.params.cedula;
	medico.get(req, resp, cedula); 
				
});

/*----------------------------Enfermero--------------------------------*/
var rutaEnfermero =  express.Router();
rutaEnfermero.route('/')
.get(enfermero.getList)
.post(function(req, resp){
	var reqBody = "";
	req.on("data", function(data){
		reqBody += data;
			if (reqBody.length > 1e7) //10Mb
			{
				httpMsgs.show413(req, resp);
			}
		});

	req.on("end", function(){
		enfermero.add(req, resp, reqBody);
	});
})
.put(function(req, resp){
	var reqBody = "";
	req.on("data", function(data){
		reqBody += data;
		if (reqBody.length > 1e7) //10Mb
		{
			httpMsgs.show413(req, resp);
		}
	});
	req.on("end", function(){
		enfermero.update(req, resp, reqBody);
	});
})
.delete(function(req, resp){
	var reqBody = "";
	req.on("data", function(data){
		reqBody += data;
		if (reqBody.length > 1e7) //10Mb
		{
			httpMsgs.show413(req, resp);
		}
	});
	req.on("end", function(){
		enfermero.delete(req, resp, reqBody);
	});
});
rutaEnfermero.route("/:cedula/")
.get(function(req, resp){				
	var cedula = req.params.cedula;
	enfermero.get(req, resp, cedula); 			
});

/*-------------------------Turno----------------------------*/
var rutaTurno = express.Router();
rutaTurno.route('/')
.get(turno.getList);
/*------------------------Paciente--------------------------*/
var rutaPaciente =  express.Router();
rutaPaciente.route('/')
.get(paciente.getList)
.post(function(req, resp){
	var reqBody = "";
	req.on("data", function(data){
		reqBody += data;
			if (reqBody.length > 1e7) //10Mb
			{
				httpMsgs.show413(req, resp);
			}
		});

	req.on("end", function(){
		paciente.add(req, resp, reqBody);
	});
})
.put(function(req, resp){
	var reqBody = "";
	req.on("data", function(data){
		reqBody += data;
		if (reqBody.length > 1e7) //10Mb
		{
			httpMsgs.show413(req, resp);
		}
	});
	req.on("end", function(){
		paciente.update(req, resp, reqBody);
	});
})
.delete(function(req, resp){
	var reqBody = "";
	req.on("data", function(data){
		reqBody += data;
		if (reqBody.length > 1e7) //10Mb
		{
			httpMsgs.show413(req, resp);
		}
	});
	req.on("end", function(){
		paciente.delete(req, resp, reqBody);
	});
});
rutaPaciente.route("/:cedula/")
.get(function(req, resp){				
	var cedula = req.params.cedula;
	paciente.get(req, resp, cedula); 
				
});
/*------------------------Enfermero_Paciente--------------------------*/
var rutaEnfermeroPaciente =  express.Router();
rutaEnfermeroPaciente.route('/')
//.get(ep.getList)
.post(function(req, resp){
	var reqBody = "";
	req.on("data", function(data){
		reqBody += data;
			if (reqBody.length > 1e7) //10Mb
			{
				httpMsgs.show413(req, resp);
			}
		});

	req.on("end", function(){
		ep.add(req, resp, reqBody);
	});
})
.put(function(req, resp){
	var reqBody = "";
	req.on("data", function(data){
		reqBody += data;
		if (reqBody.length > 1e7) //10Mb
		{
			httpMsgs.show413(req, resp);
		}
	});
	req.on("end", function(){
		ep.update(req, resp, reqBody);
	});
})
.delete(function(req, resp){
	var reqBody = "";
	req.on("data", function(data){
		reqBody += data;
		if (reqBody.length > 1e7) //10Mb
		{
			httpMsgs.show413(req, resp);
		}
	});
	req.on("end", function(){
		ep.delete(req, resp, reqBody);
	});
});
/*rutaPaciente.route("/:cedula/")
.get(function(req, resp){				
	var cedula = req.params.cedula;
	paciente.get(req, resp, cedula); 
				
});*/
/*------------------------Medicamento--------------------------*/
var rutaMedicamento =  express.Router();
rutaMedicamento.route('/')
.get(medicamento.getList)
.post(function(req, resp){
	var reqBody = "";
	req.on("data", function(data){
		reqBody += data;
			if (reqBody.length > 1e7) //10Mb
			{
				httpMsgs.show413(req, resp);
			}
		});

	req.on("end", function(){
		medicamento.add(req, resp, reqBody);
	});
})
.put(function(req, resp){
	var reqBody = "";
	req.on("data", function(data){
		reqBody += data;
		if (reqBody.length > 1e7) //10Mb
		{
			httpMsgs.show413(req, resp);
		}
	});
	req.on("end", function(){
		medicamento.update(req, resp, reqBody);
	});
})
.delete(function(req, resp){
	var reqBody = "";
	req.on("data", function(data){
		reqBody += data;
		if (reqBody.length > 1e7) //10Mb
		{
			httpMsgs.show413(req, resp);
		}
	});
	req.on("end", function(){
		medicamento.delete(req, resp, reqBody);
	});
});
rutaMedicamento.route("/:id/")
.get(function(req, resp){				
	var id = req.params.id;
	medicamento.get(req, resp, id); 
				
});
/*--------------------------------------------------------------------------------*/
var app = express()
	.use('/administrador',rutaAdministrador)
	.use('/medico',rutaMedico)
	.use('/enfermero',rutaEnfermero)
	.use('/turno',rutaTurno)
	.use('/paciente',rutaPaciente)
	.use('/ep',rutaEnfermeroPaciente)
	.use('/medicamento',rutaMedicamento)
	.use(express.static(__dirname+'/publico'))
	.listen(configuracion.webPort, function(){
		console.log("Started listening at:" + configuracion.webPort);
	});