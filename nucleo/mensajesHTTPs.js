var configuracion = require ("../configuraciones");

exports.show500 = function(req, resp, err){
	if (configuracion.httpMsgsFormat === "HTML"){
		resp.writeHead(500, "A ocurrido un error interno", {"Content-Type":"text/html"});
		resp.write("<html><head><title>500</title></head><body>500:Error interno. Detalles:"+err+"</body></html>")
	}
	else{
		resp.writeHead(500, "A ocurrido un error interno", {"Content-Type":"application/json"});
		resp.write(JSON.stringify({data : "Ocurrio un error. Detalles:"+err}));
	}
	resp.end();
};

exports.sendJson = function(req, resp, data) {
	resp.writeHead(200, {"Content-Type": "application/json"});
	if (data){
		resp.write(JSON.stringify(data));				
	}
	resp.end();
}; 

exports.show405 = function(req, resp){
	if (configuracion.httpMsgsFormat === "HTML"){
		resp.writeHead(405, "Metodo no soportado", {"Content-Type":"text/html"});
		resp.write("<html><head><title>405</title></head><body>405: Método no soportado</body></html>")
	}
	else{
		resp.writeHead(405, "Metodo no soportado", {"Content-Type":"application/json"});
		resp.write(JSON.stringify({data : "Metodo no soportado"}));
	}
	resp.end();
};

exports.show404 = function(req, resp){
	if (configuracion.httpMsgsFormat === "HTML"){
		resp.writeHead(404, "Recurso no encontrado", {"Content-Type":"text/html"});
		resp.write("<html><head><title>405</title></head><body>404: Recurso no encontrado</body></html>")
	}
	else{
		resp.writeHead(404, "Recurso no encontrado", {"Content-Type":"application/json"});
		resp.write(JSON.stringify({data : "Recurso no encontrado"}));
	}
	resp.end();
};

exports.show413 = function(req, resp){
	if (configuracion.httpMsgsFormat === "HTML"){
		resp.writeHead(413, "La entidad de solicitud es demasiado grande", {"Content-Type":"text/html"});
		resp.write("<html><head><title>405</title></head><body>413: La entidad de solicitud es demasiado grande</body></html>")
	}
	else{
		resp.writeHead(413, "Recurso no encontrado", {"Content-Type":"application/json"});
		resp.write(JSON.stringify({data : "La entidad de solicitud es demasiado grande"}));
	}
	resp.end();
};

exports.send200 = function(req, resp) {
	resp.writeHead(200, {"Content-Type": "application/json"});
	resp.end();
}; 
