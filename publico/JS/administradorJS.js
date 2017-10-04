$(document).ready(function() {
	//declaracion de variables globales
	var bandera_RegistrarModificar = false;
	var bandera_MensajeErrorConfirmacion = false;
	var mensajeError;
	var mensajeConfirmacion; 

	//muestra el formulario de registro 
	var menuRegistro = function(tipoUsuario){ 
		$("#btnMenuRegistrar").css({"border-top":"1px solid #ccc", "border-left":"1px solid #ccc", "border-right":"1px solid #ccc", "border-bottom":"1px solid white",  "background":"#fcfcfc", "color":"#818181"});
		$("#btnMenuConsultar").css({"border-top":"1px solid white", "border-left":"1px solid white", "border-right":"1px solid white", "border-bottom":"1px solid #ccc",  "background":"white", "color":"black"});
		$("#btnMenuRegistrar").css({":hover":{"background":"whitesmoke", "color":"#818181"}})
		$("#contenedorRegistro").css({"display":"block"});
		$("#contenedorConsulta").css({"display":"none"});
		if (tipoUsuario === "medico" ) {
				
		}
		if (tipoUsuario === "enfermero") {
			consultarTurno();
		}
		if (tipoUsuario === "paciente") {
			consultarListaEnfermeros();
		}

	}
	$("#btnMenuRegistrar").click(function() {
		var tipoUsuario = $(this).attr("name");
		menuRegistro(tipoUsuario);
	});
	//muestra el listado de usuarios registrados en el sistema
	var menuConsulta = function(tipoUsuario){
		$("#btnMenuConsultar").css({"border-top":"1px solid #ccc", "border-left":"1px solid #ccc", "border-right":"1px solid #ccc", "border-bottom":"1px solid white",  "background":"#fcfcfc", "color":"#818181"});
		$("#btnMenuRegistrar").css({"border-top":"1px solid white", "border-left":"1px solid white", "border-right":"1px solid white", "border-bottom":"1px solid #ccc",  "background":"white", "color":"black"});
		$("#contenedorConsulta").css({"display":"block"});
		$("#contenedorRegistro").css({"display":"none"});
		bandera_RegistrarModificar = false;
		if (tipoUsuario === "medico" ) {
			consultarMedico();
			limpiarCamposM();
		}
		if (tipoUsuario === "enfermero") {
			consultarEnfermero();
			limpiarCamposE();
		}
		if (tipoUsuario === "paciente") {
			consultarPaciente();
			limpiarCamposP();
		}
		if (tipoUsuario === "medicina") {
			consultarMedicina();
			limpiarCamposMC();
		}
	}
	$("#btnMenuConsultar").click(function(){
		var tipoUsuario = $(this).attr("name");
		menuConsulta(tipoUsuario);
	}); 
	
	//-----------------------------Administracion Medico----------------------//
	//funcion para insertar los usuarios médicos
	var registrarMedico = function(){
		var cedula = $("#txtCedula").val();
		var nombre = $("#txtNombre").val();
		var apellido = $("#txtApellidos").val();
		var usuario = $("#txtUsuario").val();
		var contraseña = $("#txtContraseña").val();
		var email = $("#txtEmail").val();
		var especialidad = $("#txtEspecialidad").val();
		var bandera = false

		var validar = validarCamposVacios(cedula,usuario,contraseña,nombre,apellido,email,especialidad);

		if (!validar) {
			$.ajax({
				type:"GET",
				url:"http://recordatoriomedico.azurewebsites.net/medico",
				dataType:"json",
				contentType:"text/plain"
			}).done(function(msg){				
				//recorre y compara los valores de entrada con los datos de la BD para impedir usuarios repetidos
				for (var dato in msg){
					if (msg[dato].cedula == cedula){bandera = true}
				}	
				//comparamos las banderas, si la bandera se activa mostramos una alerta 
				if (bandera == true) {
					mensajeError = "El usuario ya se encuentra registrado";
					bandera_MensajeErrorConfirmacion = true;
					mensajeErrorConfirmacion(mensajeError);
					bandera = false;
				}
				//en caso contrario, seguimos el proceso de insertar
				else{
					datos = {cedula:cedula,usuario:usuario,contraseña:contraseña,nombre:nombre,apellido:apellido,email:email,especialidad:especialidad}				
					$.ajax({
						type:"POST",
						url:"http://recordatoriomedico.azurewebsites.net/medico",
						dataType:"text",
						contentType:"application/json",
						data: JSON.stringify(datos)
					}).done(function(msg){	
					});
					mensajeConfirmacion = "Sus datos se ingresaron con éxito";
					bandera_MensajeErrorConfirmacion = false;
					mensajeErrorConfirmacion(mensajeConfirmacion);
					limpiarCamposM();					
				}
			});
		}
		else{
			mensajeError ="Por favor, llene todos los campos del formulario";
			bandera_MensajeErrorConfirmacion = true;
			mensajeErrorConfirmacion(mensajeError);
		}
	};
	//funcion para editar los usuarios médicos
	var modificarMedico = function(){
		var cedula = $("#txtCedula").val();
		var nombre = $("#txtNombre").val();
		var apellido = $("#txtApellidos").val();
		var usuario = $("#txtUsuario").val();
		var contraseña = $("#txtContraseña").val();
		var email = $("#txtEmail").val();
		var especialidad = $("#txtEspecialidad").val();

		datos = {cedula:cedula,usuario:usuario,contraseña:contraseña,nombre:nombre,apellido:apellido,email:email,especialidad:especialidad}
		$.ajax({
			type:"PUT",
			url:"http://recordatoriomedico.azurewebsites.net/medico",
			dataType:"text",
			contentType:"application/json",
			data:JSON.stringify(datos)
		}).done(function(msg){
			mensajeConfirmacion = "El usuario "+nombre+ " se a modificado correctamente";
		    bandera_MensajeErrorConfirmacion = false;
			mensajeErrorConfirmacion(mensajeConfirmacion);				        
		});	
		limpiarCamposM();							
	};	
	//Al hacer click en el boton enviar se realiza la llamada al metodo registrarMedico o modificarMedico dependiendo del estado de la bandera
	$("#btnEnviarMedico").click(function(){
		if (bandera_RegistrarModificar) {
			modificarMedico();
			bandera_RegistrarModificar = false;
		}
		else{
			registrarMedico();
		}
	});
	//Funcion para consultar los registros de la tabla médico
	var consultarMedico = function() {
		tablaMedico ='<table><tr id="trEncabezado"><th class="tdCedula">Cédula</th><th class="tdNombre">Nombres</th><th class="tdUsuario">Usuario</th><th class="tdContraseña">Contraseña</th><th class="tdEmail">E-mail</th><th class="tdEspecialidad">Especialidad</th><th class="tdEditaEliminar">Editar/Eliminar</th></tr>'
		$.ajax({
	    	type:"GET",
	    	url:"http://recordatoriomedico.azurewebsites.net/medico",
	    	dataType:"json",
	    	contentType:"text/plain"
    	}).done(function(msg){
	   		for(var dato in msg){
	   			if((dato%2) == 0){ tablaMedico+='<tr id="trPar">' }
	   			else { tablaMedico+='<tr>' }

		   		tablaMedico+='<td class="tdCedula">'+msg[dato].cedula+'</td>'
			   	tablaMedico+='<td class="tdNombre">'+msg[dato].nombre +' '+msg[dato].apellido+'</td>'
				tablaMedico+='<td class="tdUsuario">'+msg[dato].usuario+'</td>'
				tablaMedico+='<td class="tdContraseña">'+msg[dato].contraseña+'</td>'
				tablaMedico+='<td class="tdEmail">'+msg[dato].email+'</td>'
				tablaMedico+='<td class="tdEspecialidad">'+msg[dato].especialidad+'</td>'
				tablaMedico+='<td class="tdEditaEliminar"><button class="btnLlenarCampos" id="btnEditar/Eliminar" name="'+msg[dato].cedula+'" data-toggle="modal" data-target="#modallibros"><span class="glyphicon glyphicon-pencil"></span>'
				tablaMedico+='</button><button class="btnConfirmarEliminacion" id="btnEditar/Eliminar" name="'+msg[dato].cedula+'"><span class="glyphicon glyphicon-trash"></span></button></td>'
				tablaMedico+='</tr>'
			} 
			tablaMedico+='</table>'	
			$("#contenedorTablaConsulta").html(tablaMedico)
			
			$(".btnLlenarCampos").click(llenarCamposaModificar);
			$(".btnConfirmarEliminacion").click(function(){
				var ideliminar=$(this).attr("name"); 
				mostrarConfirmaciondeEliminacion(ideliminar);
			});			
		});		
	};
	//Funcion que realiza una consulta segun el parametro ingresado
	var buscarPorParametroM = function(){
		tablaMedico ='<table><tr id="trEncabezado"><th class="tdCedula">Cédula</th><th class="tdNombre">Nombres</th><th class="tdUsuario">Usuario</th><th class="tdContraseña">Contraseña</th><th class="tdEmail">E-mail</th><th class="tdEspecialidad">Especialidad</th><th class="tdEditaEliminar">Editar/Eliminar</th></tr>'
		var parametro = $("#parametroaBuscarM").val();
		$.ajax({
			type:"GET",
			url:"http://recordatoriomedico.azurewebsites.net/medico/"+parametro,
			dataType:"json",
			contentType:"text/plain"
		}).done(function(msg){
			for(var dato in msg){
	   			if((dato%2) == 0){ tablaMedico+='<tr id="trPar">' }
	   			else { tablaMedico+='<tr>' }

		   		tablaMedico+='<td class="tdCedula">'+msg[dato].cedula+'</td>'
			   	tablaMedico+='<td class="tdNombre">'+msg[dato].nombre +' '+msg[dato].apellido+'</td>'
				tablaMedico+='<td class="tdUsuario">'+msg[dato].usuario+'</td>'
				tablaMedico+='<td class="tdContraseña">'+msg[dato].contraseña+'</td>'
				tablaMedico+='<td class="tdEmail">'+msg[dato].email+'</td>'
				tablaMedico+='<td class="tdEspecialidad">'+msg[dato].especialidad+'</td>'
				tablaMedico+='<td class="tdEditaEliminar"><button class="btnLlenarCampos" id="btnEditar/Eliminar" name="'+msg[dato].cedula+'" data-toggle="modal" data-target="#modallibros"><span class="glyphicon glyphicon-pencil"></span>'
				tablaMedico+='</button><button class="btnConfirmarEliminacion" id="btnEditar/Eliminar" name="'+msg[dato].cedula+'"><span class="glyphicon glyphicon-trash"></span></button></td>'
				tablaMedico+='</tr>'
			} 
			tablaMedico+='</table>'	
			$("#contenedorTablaConsulta").html(tablaMedico)
			

			$(".btnLlenarCampos").click(llenarCamposaModificar);
			$(".btnConfirmarEliminacion").click(function(){
				var ideliminar=$(this).attr("name"); 
				mostrarConfirmaciondeEliminacion(ideliminar);
			});		
		});
	};
	$("#parametroaBuscarM").keyup(buscarPorParametroM);

	//Funcion para eliminar a los usuarios médicos
	var eliminarMedico = function(){
		var ideliminar=$(this).attr("name");                
		datos={cedula:ideliminar};

		$.ajax({
		    type:"DELETE",
		    url:"http://recordatoriomedico.azurewebsites.net/medico",
		    dataType:"text",
		    contentType:"application/json",
		    data:JSON.stringify(datos)
		}).done(function(msg){
		    mensajeConfirmacion = "El usuario se eliminó correctamente";	
		    ocultarConfirmaciondeEliminacion();
		    mensajeErrorConfirmacion2(mensajeConfirmacion);
		    consultarMedico();
		});
	};	
	
	var llenarCamposaModificar = function(){
		var idmodificar=$(this).attr("name");
		$.ajax({
		    type:"GET",
		    url:"http://recordatoriomedico.azurewebsites.net/medico",
		    dataType:"json",
		    contentType:"text/plain"
		}).done(function(msg){
			for(var dato in msg){
			    if (msg[dato].cedula == idmodificar) {
					$("#txtCedula").val(msg[dato].cedula);
					$("#txtNombre").val(msg[dato].nombre);
					$("#txtApellidos").val(msg[dato].apellido);
					$("#txtUsuario").val(msg[dato].usuario);
					$("#txtContraseña").val(msg[dato].contraseña);
					$("#txtEmail").val(msg[dato].email);
					$("#txtEspecialidad").val(msg[dato].especialidad);
				}														
			}
			$("#txtCedula").attr("disabled", "true");
			menuRegistro();			
			bandera_RegistrarModificar = true;
		}); 								    
	};

	var limpiarCamposM = function(){
		$("#txtCedula").val("");
		$("#txtNombre").val("");
		$("#txtApellidos").val("");
		$("#txtUsuario").val("");
		$("#txtContraseña").val("");
		$("#txtEmail").val("");
		$("#txtEspecialidad").val("");
		$("#txtCedula").removeAttr("disabled","true");		
	}

//--------------------------------Administracion Enfermero-----------------------//
//funcion para insertar los usuarios médicos
	var registrarEnfermero = function(){
		var cedula = $("#txtCedula").val();
		var nombre = $("#txtNombre").val();
		var apellido = $("#txtApellidos").val();
		var usuario = $("#txtUsuario").val();
		var contraseña = $("#txtContraseña").val();
		var email = $("#txtEmail").val();
		var turno = $("#txtTurno").val();
		var bandera = false

		$.ajax({
			type:"GET",
			url:"http://recordatoriomedico.azurewebsites.net/enfermero",
			dataType:"json",
			contentType:"text/plain"
		}).done(function(msg){
			//recorre y compara los valores de entrada con los datos de la BD para impedir usuarios repetidos
			for (var dato in msg){
				if (msg[dato].cedula == cedula){bandera = true}
			}	
			//comparamos las banderas, si la bandera se activa mostramos una alerta 
			if (bandera == true) {
				mensajeError = "El usuario ya se encuentra registrado";
				bandera_MensajeErrorConfirmacion = true;
				mensajeErrorConfirmacion(mensajeError);
				bandera = false;
			}
			//en caso contrario, seguimos el proceso de insertar
			else{
				datos = {cedula:cedula,usuario:usuario,contraseña:contraseña,nombre:nombre,apellido:apellido,email:email,id_Turno:turno}				
				$.ajax({
					type:"POST",
					url:"http://recordatoriomedico.azurewebsites.net/enfermero",
					dataType:"text",
					contentType:"application/json",
					data: JSON.stringify(datos)
				}).done(function(msg){	
				});
				mensajeConfirmacion = "Sus datos se ingresaron con éxito";
				bandera_MensajeErrorConfirmacion = false;
				mensajeErrorConfirmacion(mensajeConfirmacion);
				limpiarCamposE();					
			}
		});
	};
	//funcion para editar los usuarios enfermeros
	var modificarEnfermero = function(){
		var cedula = $("#txtCedula").val();
		var nombre = $("#txtNombre").val();
		var apellido = $("#txtApellidos").val();
		var usuario = $("#txtUsuario").val();
		var contraseña = $("#txtContraseña").val();
		var email = $("#txtEmail").val();
		var turno = $("#txtTurno").val();

		datos = {cedula:cedula,usuario:usuario,contraseña:contraseña,nombre:nombre,apellido:apellido,email:email,id_Turno:turno}
		$.ajax({
			type:"PUT",
			url:"http://recordatoriomedico.azurewebsites.net/enfermero",
			dataType:"text",
			contentType:"application/json",
			data:JSON.stringify(datos)
		}).done(function(msg){
			mensajeConfirmacion = "El usuario "+nombre+ " se a modificado correctamente";
		    bandera_MensajeErrorConfirmacion = false;
			mensajeErrorConfirmacion(mensajeConfirmacion);	
			limpiarCamposE();					        
		});							
	};	
	$("#btnEnviarEnfermero").click(function(){
		if (bandera_RegistrarModificar) {
			modificarEnfermero();
			bandera_RegistrarModificar = false;
		}
		else{
			registrarEnfermero();
		}
	});
	var consultarEnfermero = function() {
		tablaEnfermero ='<table><tr id="trEncabezado"><th class="tdCedula">Cédula</th><th class="tdNombre">Nombres</th><th class="tdUsuario">Usuario</th><th class="tdContraseña">Contraseña</th>'
		tablaEnfermero+='<th class="tdEmail">E-mail</th><th class="tdEspecialidad">Turno</th><th class="tdEditaEliminar">Editar/Eliminar</th></tr>'
		$.ajax({
	    	type:"GET",
	    	url:"http://recordatoriomedico.azurewebsites.net/enfermero",
	    	dataType:"json",
	    	contentType:"text/plain"
    	}).done(function(msg){
	   		for(var dato in msg){

	   			var horaTurno = conversionFecha(msg[dato].hora_Entrada, msg[dato].hora_Salida);
	   			if((dato%2) == 0){ tablaEnfermero+='<tr id="trPar">' }
	   			else { tablaEnfermero+='<tr>' }

		   		tablaEnfermero+='<td class="tdCedula">'+msg[dato].cedula+'</td>'
			   	tablaEnfermero+='<td class="tdNombre">'+msg[dato].nombre +' '+msg[dato].apellido+'</td>'
				tablaEnfermero+='<td class="tdUsuario">'+msg[dato].usuario+'</td>'
				tablaEnfermero+='<td class="tdContraseña">'+msg[dato].contraseña+'</td>'
				tablaEnfermero+='<td class="tdEmail">'+msg[dato].email+'</td>'
				tablaEnfermero+='<td class="tdEspecialidad">'+horaTurno+'</td>'
				tablaEnfermero+='<td class="tdEditaEliminar"><button class="btnLlenarCampos" id="btnEditar/Eliminar" name="'+msg[dato].cedula+'" data-toggle="modal" data-target="#modallibros"><span class="glyphicon glyphicon-pencil"></span>'
				tablaEnfermero+='</button><button class="btnConfirmarEliminacion" id="btnEditar/Eliminar" name="'+msg[dato].cedula+'"><span class="glyphicon glyphicon-trash"></span></button></td>'
				tablaEnfermero+='</tr>'
			} 
			tablaEnfermero+='</table>'	
			$("#contenedorTablaConsulta").html(tablaEnfermero)
			
			$(".btnLlenarCampos").click(llenarCamposaModificarEnfermero);
			$(".btnConfirmarEliminacion").click(function(){
				var ideliminar=$(this).attr("name"); 
				mostrarConfirmaciondeEliminacion(ideliminar);
			});			
		});		
	};

	var buscarPorParametroE = function(){
		tablaEnfermero ='<table><tr id="trEncabezado"><th class="tdCedula">Cédula</th><th class="tdNombre">Nombres</th><th class="tdUsuario">Usuario</th><th class="tdContraseña">Contraseña</th><th class="tdEmail">E-mail</th><th class="tdEspecialidad">Especialidad</th><th class="tdEditaEliminar">Editar/Eliminar</th></tr>'
		var parametro = $("#parametroaBuscarE").val();
		$.ajax({
			type:"GET",
			url:"http://recordatoriomedico.azurewebsites.net/"+parametro,
			dataType:"json",
			contentType:"text/plain"
		}).done(function(msg){
	   		for(var dato in msg){

	   			var horaTurno = conversionFecha(msg[dato].hora_Entrada, msg[dato].hora_Salida);
	   			if((dato%2) == 0){ tablaEnfermero+='<tr id="trPar">' }
	   			else { tablaEnfermero+='<tr>' }

		   		tablaEnfermero+='<td class="tdCedula">'+msg[dato].cedula+'</td>'
			   	tablaEnfermero+='<td class="tdNombre">'+msg[dato].nombre +' '+msg[dato].apellido+'</td>'
				tablaEnfermero+='<td class="tdUsuario">'+msg[dato].usuario+'</td>'
				tablaEnfermero+='<td class="tdContraseña">'+msg[dato].contraseña+'</td>'
				tablaEnfermero+='<td class="tdEmail">'+msg[dato].email+'</td>'
				tablaEnfermero+='<td class="tdEspecialidad">'+horaTurno+'</td>'
				tablaEnfermero+='<td class="tdEditaEliminar"><button class="btnLlenarCampos" id="btnEditar/Eliminar" name="'+msg[dato].cedula+'" data-toggle="modal" data-target="#modallibros"><span class="glyphicon glyphicon-pencil"></span>'
				tablaEnfermero+='</button><button class="btnConfirmarEliminacion" id="btnEditar/Eliminar" name="'+msg[dato].cedula+'"><span class="glyphicon glyphicon-trash"></span></button></td>'
				tablaEnfermero+='</tr>'
			} 
			tablaEnfermero+='</table>'	
			$("#contenedorTablaConsulta").html(tablaEnfermero)
			
			$(".btnLlenarCampos").click(llenarCamposaModificarEnfermero);
			$(".btnConfirmarEliminacion").click(function(){
				var ideliminar=$(this).attr("name"); 
				mostrarConfirmaciondeEliminacion(ideliminar);
			});			
		});	
	};
	$("#parametroaBuscarE").keyup(buscarPorParametroE);

	var llenarCamposaModificarEnfermero = function(){
		var idmodificar=$(this).attr("name");
		$.ajax({
		    type:"GET",
		    url:"http://recordatoriomedico.azurewebsites.net/enfermero",
		    dataType:"json",
		    contentType:"text/plain"
		}).done(function(msg){
			for(var dato in msg){
			    if (msg[dato].cedula == idmodificar) {
					$("#txtCedula").val(msg[dato].cedula);
					$("#txtNombre").val(msg[dato].nombre);
					$("#txtApellidos").val(msg[dato].apellido);
					$("#txtUsuario").val(msg[dato].usuario);
					$("#txtContraseña").val(msg[dato].contraseña);
					$("#txtEmail").val(msg[dato].email);
					$("#"+msg[dato].id).attr("selected","true");
					
				}														
			}
			$("#txtCedula").attr("disabled", "true");
			$("#opcionTurno").removeAttr("selected");
			menuRegistro();			
			bandera_RegistrarModificar = true;
		}); 								    
	};

	var consultarTurno = function(){
		var selectTurno = '<option value="" id="opcionTurno">--- Turno ---</option>'
		$.ajax({
			type:"GET",
			url:"http://recordatoriomedico.azurewebsites.net/turno",
			dataType:"json",
			contentType:"text/plain"
		}).done(function(msg){
			for(var dato in msg){
				
				var horaTurno = conversionFecha(msg[dato].hora_Entrada, msg[dato].hora_Salida);

				selectTurno +='<option value="'+msg[dato].id+'" id="'+msg[dato].id+'" >'+horaTurno+'</option>'			   	
			} 
			$("#txtTurno").html(selectTurno)			
		});
	};

	//Funcion para eliminar a los usuarios enfermeros
	var eliminarEnfermero = function(){
		var ideliminar=$(this).attr("name");                
		datos={cedula:ideliminar};

		$.ajax({
		    type:"DELETE",
		    url:"http://recordatoriomedico.azurewebsites.net/enfermero",
		    dataType:"text",
		    contentType:"application/json",
		    data:JSON.stringify(datos)
		}).done(function(msg){
		    mensajeConfirmacion = "El usuario se eliminó correctamente";	
		    ocultarConfirmaciondeEliminacion();
		    mensajeErrorConfirmacion2(mensajeConfirmacion);
		    consultarEnfermero();
		});
	};	

	var conversionFecha = function(horaInicio, horaFin) {
		var tiempo1 = horaInicio;
		var miFecha1 = tiempo1.substring(0,19);
		var tE = new Date(miFecha1);
		var horaEntrada = tE.getHours();
		var minutoEntrada = tE.getMinutes();
		if(horaEntrada<10){horaEntrada='0'+horaEntrada}
		if(minutoEntrada<10){minutoEntrada='0'+minutoEntrada}
		var Entrada = horaEntrada+'H'+minutoEntrada;
			
		var tiempo2 = horaFin;
		var miFecha2 = tiempo2.substring(0,19);
		var tS = new Date(miFecha2);
		var horaSalida = tS.getHours();
		var minutoSalida = tS.getMinutes();
		if(horaSalida<10){horaSalida='0'+horaSalida}
		if(minutoSalida<10){minutoSalida='0'+minutoSalida}
		var Salida = horaSalida+'H'+minutoSalida;

		var horaTurno = Entrada+' a '+Salida;
		return horaTurno;
	};

	var limpiarCamposE = function(){
		$("#txtCedula").val("");
		$("#txtNombre").val("");
		$("#txtApellidos").val("");
		$("#txtUsuario").val("");
		$("#txtContraseña").val("");
		$("#txtEmail").val("");
		$("#opcionTurno").attr("selected","selected");
		$("#txtCedula").removeAttr("disabled","true");
		$("#1").removeAttr("selected");	
		$("#2").removeAttr("selected");
		$("#3").removeAttr("selected");	
	}

	window.onload=consultarTurno();

	//--------------------------------Administracion Paciente-----------------------//
//funcion para insertar los pacientes
	var registrarPaciente = function(){
		var cedula = $("#txtCedula").val();
		var nombre = $("#txtNombre").val();
		var apellido = $("#txtApellidos").val();
		var descripcion = $("#txtDescripcion").val();
		var habitacion = $("#txtHabitacion").val();
		var enfermera = $("#txtEnfermera").val();
		var bandera = false

		$.ajax({
			type:"GET",
			url:"http://recordatoriomedico.azurewebsites.net/paciente",
			dataType:"json",
			contentType:"text/plain"
		}).done(function(msg){
			//recorre y compara los valores de entrada con los datos de la BD para impedir usuarios repetidos
			for (var dato in msg){
				if (msg[dato].cedula == cedula){bandera = true}
			}	
			//comparamos las banderas, si la bandera se activa mostramos una alerta 
			if (bandera == true) {
				mensajeError = "El paciente ya se encuentra registrado";
				bandera_MensajeErrorConfirmacion = true;
				mensajeErrorConfirmacion(mensajeError);
				bandera = false;
			}
			//en caso contrario, seguimos el proceso de insertar
			else{
				datos = {cedula:cedula,nombreP:nombre,apellidoP:apellido,descripcion:descripcion,habitacion:habitacion}				
				$.ajax({
					type:"POST",
					url:"http://recordatoriomedico.azurewebsites.net/paciente",
					dataType:"text",
					contentType:"application/json",
					data: JSON.stringify(datos)
				}).done(function(msg){	
				});

				datos2 = {cedula_Paciente:cedula, cedula_Enfermero:enfermera}
				$.ajax({
					type:"POST",
					url:"http://recordatoriomedico.azurewebsites.net/ep",
					dataType:"text",
					contentType:"application/json",
					data:JSON.stringify(datos2)
				}).done(function(msg){			        
				});								
				mensajeConfirmacion = "Sus datos se ingresaron con éxito";
				bandera_MensajeErrorConfirmacion = false;
				mensajeErrorConfirmacion(mensajeConfirmacion);
				limpiarCamposP();					
			}
		});
	};
	//funcion para editar los pacientes
	var modificarPaciente = function(){
		var cedula = $("#txtCedula").val();
		var nombre = $("#txtNombre").val();
		var apellido = $("#txtApellidos").val();
		var descripcion = $("#txtDescripcion").val();
		var habitacion = $("#txtHabitacion").val();
		var enfermera = $("#txtEnfermera").val();

		datos = {cedula:cedula,nombreP:nombre,apellidoP:apellido,descripcion:descripcion,habitacion:habitacion}
		$.ajax({
			type:"PUT",
			url:"http://recordatoriomedico.azurewebsites.net/paciente",
			dataType:"text",
			contentType:"application/json",
			data:JSON.stringify(datos)
		}).done(function(msg){		        
		});
		datos2 = {cedula_Paciente:cedula, cedula_Enfermero:enfermera}
		$.ajax({
			type:"PUT",
			url:"http://recordatoriomedico.azurewebsites.net/ep",
				dataType:"text",
				contentType:"application/json",
				data:JSON.stringify(datos2)
			}).done(function(msg){			        
			});								
			mensajeConfirmacion = "El paciente se a modificado correctamente";
			bandera_MensajeErrorConfirmacion = false;
			mensajeErrorConfirmacion(mensajeConfirmacion);
			limpiarCamposP();
	};	

	$("#btnEnviarPaciente").click(function(){
		if (bandera_RegistrarModificar) {
			modificarPaciente();
			bandera_RegistrarModificar = false;
		}
		else{
			registrarPaciente();
		}
	});
	var consultarPaciente = function() {
		tablaPaciente ='<table><tr id="trEncabezado"><th class="tdCedula">Cédula</th><th class="tdNombre">Nombres</th>'
		tablaPaciente+='<th class="tdHabitacion">Habitación</th><th class="tdNombre">Enfermera</th><th class="tdDescripcion">Descripción</th><th class="tdEditaEliminar">Editar/Eliminar</th></tr>'
		$.ajax({
	    	type:"GET",
	    	url:"http://recordatoriomedico.azurewebsites.net/paciente",
	    	dataType:"json",
	    	contentType:"text/plain"
    	}).done(function(msg){
	   		for(var dato in msg){

	   			if((dato%2) == 0){ tablaPaciente+='<tr id="trPar">' }
	   			else { tablaPaciente+='<tr>' }

		   		tablaPaciente+='<td class="tdCedula">'+msg[dato].cedula+'</td>'
			   	tablaPaciente+='<td class="tdNombre">'+msg[dato].nombreP +' '+msg[dato].apellidoP+'</td>'
				tablaPaciente+='<td class="tdHabitacion">'+msg[dato].habitacion+'</td>'
				tablaPaciente+='<td class="tdNombre">'+msg[dato].nombre+' '+msg[dato].apellido+'</td>'
				tablaPaciente+='<td class="tdDescripcion">'+msg[dato].descripcion+'</td>'
				tablaPaciente+='<td class="tdEditaEliminar"><button class="btnLlenarCampos" id="btnEditar/Eliminar" name="'+msg[dato].cedula+'" data-toggle="modal" data-target="#modallibros"><span class="glyphicon glyphicon-pencil"></span>'
				tablaPaciente+='</button><button class="btnConfirmarEliminacion" id="btnEditar/Eliminar" name="'+msg[dato].cedula+'"><span class="glyphicon glyphicon-trash"></span></button></td>'
				tablaPaciente+='</tr>'
			} 
			tablaPaciente+='</table>'	
			$("#contenedorTablaConsulta").html(tablaPaciente)
			
			$(".btnLlenarCampos").click(llenarCamposaModificarPaciente);
			$(".btnConfirmarEliminacion").click(function(){
				var ideliminar=$(this).attr("name"); 
				mostrarConfirmaciondeEliminacion(ideliminar);
			});			
		});		
	};

	var buscarPorParametroP = function(){
		tablaPaciente ='<table><tr id="trEncabezado"><th class="tdCedula">Cédula</th><th class="tdNombre">Nombres</th>'
		tablaPaciente+='<th class="tdHabitacion">Habitación</th><th class="tdNombre">Enfermera</th><th class="tdDescripcion">Descripción</th><th class="tdEditaEliminar">Editar/Eliminar</th></tr>'
		var parametro = $("#parametroaBuscarP").val();
		$.ajax({
	    	type:"GET",
	    	url:"http://recordatoriomedico.azurewebsites.net/paciente/"+parametro,
	    	dataType:"json",
	    	contentType:"text/plain"
    	}).done(function(msg){
	   		for(var dato in msg){

	   			if((dato%2) == 0){ tablaPaciente+='<tr id="trPar">' }
	   			else { tablaPaciente+='<tr>' }

		   		tablaPaciente+='<td class="tdCedula">'+msg[dato].cedula+'</td>'
			   	tablaPaciente+='<td class="tdNombre">'+msg[dato].nombreP +' '+msg[dato].apellidoP+'</td>'
				tablaPaciente+='<td class="tdHabitacion">'+msg[dato].habitacion+'</td>'
				tablaPaciente+='<td class="tdNombre">'+msg[dato].nombre+' '+msg[dato].apellido+'</td>'
				tablaPaciente+='<td class="tdDescripcion">'+msg[dato].descripcion+'</td>'
				tablaPaciente+='<td class="tdEditaEliminar"><button class="btnLlenarCampos" id="btnEditar/Eliminar" name="'+msg[dato].cedula+'" data-toggle="modal" data-target="#modallibros"><span class="glyphicon glyphicon-pencil"></span>'
				tablaPaciente+='</button><button class="btnConfirmarEliminacion" id="btnEditar/Eliminar" name="'+msg[dato].cedula+'"><span class="glyphicon glyphicon-trash"></span></button></td>'
				tablaPaciente+='</tr>'
			} 
			tablaPaciente+='</table>'	
			$("#contenedorTablaConsulta").html(tablaPaciente)
			
			$(".btnLlenarCampos").click(llenarCamposaModificarPaciente);
			$(".btnConfirmarEliminacion").click(function(){
				var ideliminar=$(this).attr("name"); 
				mostrarConfirmaciondeEliminacion(ideliminar);
			});			
		});		
	};
	$("#parametroaBuscarP").keyup(buscarPorParametroP);

	var llenarCamposaModificarPaciente = function(){
		var idmodificar=$(this).attr("name");
		$.ajax({
		    type:"GET",
		    url:"http://recordatoriomedico.azurewebsites.net/paciente",
		    dataType:"json",
		    contentType:"text/plain"
		}).done(function(msg){
			for(var dato in msg){
			    if (msg[dato].cedula == idmodificar) {
					$("#txtCedula").val(msg[dato].cedula);
					$("#txtNombre").val(msg[dato].nombreP);
					$("#txtApellidos").val(msg[dato].apellidoP);
					$("#txtDescripcion").val(msg[dato].descripcion);
					$("#txtHabitacion").val(msg[dato].habitacion);
					$("#").attr("selected","selected");
					//$("#txtTurno").val(msg[dato].id_Turno);
				}														
			}
			$("#txtCedula").attr("disabled", "true");
			menuRegistro();			
			bandera_RegistrarModificar = true;
		}); 								    
	};

	var consultarListaEnfermeros = function(){
		var selectEnfermera = '<option value="opcionEnfermera" >--- Enfermera ---</option>'
		$.ajax({
			type:"GET",
			url:"http://recordatoriomedico.azurewebsites.net/enfermero",
			dataType:"json",
			contentType:"text/plain"
		}).done(function(msg){
			for(var dato in msg){

				selectEnfermera +='<option value="'+msg[dato].cedula+'" id="'+msg[dato].cedula+'">'+msg[dato].nombre+' '+msg[dato].apellido+'</option>'			   	
			} 
			$("#txtEnfermera").html(selectEnfermera)			
		});
	};

	//Funcion para eliminar a los usuarios enfermeros
	var eliminarPaciente = function(ideliminar){
		                
		datos={cedula:ideliminar};
		$.ajax({
		    type:"DELETE",
		    url:"http://recordatoriomedico.azurewebsites.net/paciente",
		    dataType:"text",
		    contentType:"application/json",
		    data:JSON.stringify(datos)
		}).done(function(msg){
		    mensajeConfirmacion = "El usuario se eliminó correctamente";	
		    ocultarConfirmaciondeEliminacion();
		    mensajeErrorConfirmacion2(mensajeConfirmacion);
		    consultarPaciente();
		});
	};	
	var eliminarEPaciente = function(ideliminar){               
		
		datos2={cedula_Paciente:ideliminar};
		$.ajax({
		    type:"DELETE",
		    url:"http://recordatoriomedico.azurewebsites.net/ep",
		    dataType:"text",
		    contentType:"application/json",
		    data:JSON.stringify(datos2)
		}).done(function(msg){
		});
	};	
	var limpiarCamposP = function(){
		$("#txtCedula").val("");
		$("#txtNombre").val("");
		$("#txtApellidos").val("");
		$("#txtDescripcion").val("");
		$("#txtHabitacion").val("");
		$("#opcionEnfermera").attr("selected","selected");
		$("#txtCedula").removeAttr("disabled","true");
		/*$("#1").removeAttr("selected");	
		$("#2").removeAttr("selected");
		$("#3").removeAttr("selected");	*/
	}

	window.onload=consultarListaEnfermeros();

//--------------------------------Administracion Medicamentos-----------------------//
	//funcion para insertar las medicinas
	var registrarMedicina = function(){
		var id = $("#txtId").val();
		var nombre = $("#txtNombre").val();
		var tipo = $("#txtTipo").val();
		var descripcion = $("#txtDescripcion").val();
		var cantidad = $("#txtCantidad").val();
		var bandera = false

		$.ajax({
			type:"GET",
			url:"http://recordatoriomedico.azurewebsites.net/medicamento",
			dataType:"json",
			contentType:"text/plain"
		}).done(function(msg){
			//recorre y compara los valores de entrada con los datos de la BD para impedir usuarios repetidos
			for (var dato in msg){
				if (msg[dato].id == id){bandera = true}
			}	
			//comparamos las banderas, si la bandera se activa mostramos una alerta 
			if (bandera == true) {
				mensajeError = "El medicamento ya esta registrado";
				bandera_MensajeErrorConfirmacion = true;
				mensajeErrorConfirmacion(mensajeError);
				bandera = false;
			}
			//en caso contrario, seguimos el proceso de insertar
			else{
				datos = {id:id,nombre:nombre,tipo:tipo,descripcion:descripcion,cantidad:cantidad}				
				$.ajax({
					type:"POST",
					url:"http://recordatoriomedico.azurewebsites.net/medicamento",
					dataType:"text",
					contentType:"application/json",
					data: JSON.stringify(datos)
				}).done(function(msg){	
				});	
				mensajeConfirmacion = "Sus datos se ingresaron con éxito";
				bandera_MensajeErrorConfirmacion = false;
				mensajeErrorConfirmacion(mensajeConfirmacion);
				limpiarCamposMC();					
			}
		});
	};
	//funcion para editar los pacientes
	var modificarMedicina = function(){
		var id = $("#txtId").val();
		var nombre = $("#txtNombre").val();
		var tipo = $("#txtTipo").val();
		var descripcion = $("#txtDescripcion").val();
		var cantidad = $("#txtCantidad").val();

		datos = {id:id,nombre:nombre,tipo:tipo,descripcion:descripcion,cantidad:cantidad}				
				$.ajax({
					type:"PUT",
					url:"http://recordatoriomedico.azurewebsites.net/medicamento",
					dataType:"text",
					contentType:"application/json",
					data: JSON.stringify(datos)
				}).done(function(msg){	
				});	
				mensajeConfirmacion = "El medicamento se modificós correctamente";
				bandera_MensajeErrorConfirmacion = false;
				mensajeErrorConfirmacion(mensajeConfirmacion);
				limpiarCamposMC();		
	};	

	$("#btnEnviarMedicina").click(function(){
		if (bandera_RegistrarModificar) {
			modificarMedicina();
			bandera_RegistrarModificar = false;
		}
		else{
			registrarMedicina();
		}
	});
	var consultarMedicina = function() {
		tablaMedicina ='<table><tr id="trEncabezado"><th class="tdId">ID</th><th class="tdNombre2">Nombre</th>'
		tablaMedicina+='<th class="tdtipo">Tipo</th><th class="tdHabitacion">Cantidad</th><th class="tdDescripcion2">Descripción</th><th class="tdEditaEliminar">Editar/Eliminar</th></tr>'
		$.ajax({
	    	type:"GET",
	    	url:"http://recordatoriomedico.azurewebsites.net/medicamento",
	    	dataType:"json",
	    	contentType:"text/plain"
    	}).done(function(msg){
	   		for(var dato in msg){

	   			if((dato%2) == 0){ tablaMedicina+='<tr id="trPar">' }
	   			else { tablaMedicina+='<tr>' }

		   		tablaMedicina+='<td class="tdId">'+msg[dato].id+'</td>'
			   	tablaMedicina+='<td class="tdNombre2">'+msg[dato].nombre+'</td>'
				tablaMedicina+='<td class="tdtipo">'+msg[dato].tipo+'</td>'
				tablaMedicina+='<td class="tdHabitacion">'+msg[dato].cantidad+'</td>'
				tablaMedicina+='<td class="tdDescripcion2">'+msg[dato].descripcion+'</td>'
				tablaMedicina+='<td class="tdEditaEliminar"><button class="btnLlenarCampos" id="btnEditar/Eliminar" name="'+msg[dato].id+'" data-toggle="modal" data-target="#modallibros"><span class="glyphicon glyphicon-pencil"></span>'
				tablaMedicina+='</button><button class="btnConfirmarEliminacion" id="btnEditar/Eliminar" name="'+msg[dato].id+'"><span class="glyphicon glyphicon-trash"></span></button></td>'
				tablaMedicina+='</tr>'
			} 
			tablaMedicina+='</table>'	
			$("#contenedorTablaConsulta").html(tablaMedicina)
			
			$(".btnLlenarCampos").click(llenarCamposaModificarMedicina);
			$(".btnConfirmarEliminacion").click(function(){
				var ideliminar=$(this).attr("name"); 
				mostrarConfirmaciondeEliminacion(ideliminar);
			});			
		});		
	};

	var buscarPorParametroMC = function(){
		tablaMedicina ='<table><tr id="trEncabezado"><th class="tdId">ID</th><th class="tdNombre2">Nombre</th>'
		tablaMedicina+='<th class="tdtipo">Tipo</th><th class="tdHabitacion">Cantidad</th><th class="tdDescripcion2">Descripción</th><th class="tdEditaEliminar">Editar/Eliminar</th></tr>'
		var parametro = $("#parametroaBuscarMC").val();
		$.ajax({
	    	type:"GET",
	    	url:"http://recordatoriomedico.azurewebsites.net/medicamento/"+parametro,
	    	dataType:"json",
	    	contentType:"text/plain"
    	}).done(function(msg){
	   		for(var dato in msg){

	   			if((dato%2) == 0){ tablaMedicina+='<tr id="trPar">' }
	   			else { tablaMedicina+='<tr>' }

		   		tablaMedicina+='<td class="tdId">'+msg[dato].id+'</td>'
			   	tablaMedicina+='<td class="tdNombre2">'+msg[dato].nombre+'</td>'
				tablaMedicina+='<td class="tdtipo">'+msg[dato].tipo+'</td>'
				tablaMedicina+='<td class="tdHabitacion">'+msg[dato].cantidad+'</td>'
				tablaMedicina+='<td class="tdDescripcion2">'+msg[dato].descripcion+'</td>'
				tablaMedicina+='<td class="tdEditaEliminar"><button class="btnLlenarCampos" id="btnEditar/Eliminar" name="'+msg[dato].id+'" data-toggle="modal" data-target="#modallibros"><span class="glyphicon glyphicon-pencil"></span>'
				tablaMedicina+='</button><button class="btnConfirmarEliminacion" id="btnEditar/Eliminar" name="'+msg[dato].id+'"><span class="glyphicon glyphicon-trash"></span></button></td>'
				tablaMedicina+='</tr>'
			} 
			tablaMedicina+='</table>'	
			$("#contenedorTablaConsulta").html(tablaMedicina)
			
			$(".btnLlenarCampos").click(llenarCamposaModificarMedicina);
			$(".btnConfirmarEliminacion").click(function(){
				var ideliminar=$(this).attr("name"); 
				mostrarConfirmaciondeEliminacion(ideliminar);
			});			
		});		
	};
	$("#parametroaBuscarMC").keyup(buscarPorParametroMC);

	var llenarCamposaModificarMedicina = function(){
		var idmodificar=$(this).attr("name");
		$.ajax({
		    type:"GET",
		    url:"http://recordatoriomedico.azurewebsites.net/medicamento",
		    dataType:"json",
		    contentType:"text/plain"
		}).done(function(msg){
			for(var dato in msg){
			    if (msg[dato].id == idmodificar) {
					$("#txtId").val(msg[dato].id);
					$("#txtNombre").val(msg[dato].nombre);
					$("#txtTipo").val(msg[dato].tipo);
					$("#txtDescripcion").val(msg[dato].descripcion);
					$("#txtCantidad").val(msg[dato].cantidad);
				}														
			}
			$("#txtId").attr("disabled", "true");
			menuRegistro();			
			bandera_RegistrarModificar = true;
		}); 								    
	};

	//Funcion para eliminar a los usuarios enfermeros
	var eliminarMedicina = function(){
		var ideliminar=$(this).attr("name");                
		datos={id:ideliminar};
		$.ajax({
		    type:"DELETE",
		    url:"http://recordatoriomedico.azurewebsites.net/medicamento",
		    dataType:"text",
		    contentType:"application/json",
		    data:JSON.stringify(datos)
		}).done(function(msg){
		    mensajeConfirmacion = "El fármaco se eliminó correctamente";	
		    ocultarConfirmaciondeEliminacion();
		    mensajeErrorConfirmacion2(mensajeConfirmacion);
		    consultarMedicina();
		});
	};	
	
	var limpiarCamposMC = function(){
		$("#txtId").val("");
		$("#txtNombre").val("");
		$("#txtTipo").val("");
		$("#txtDescripcion").val("");
		$("#txtCantidad").val("");
	}
//---------------------------------Mensajes de Informacion-----------------------//
	var mensajeErrorConfirmacion = function (msj) {
		var mensaje;
		if (bandera_MensajeErrorConfirmacion) {
			mensaje = "<span class='glyphicon glyphicon-remove'></span> "+ msj;
			$("#contenedorMensaje").css({"background":"#f52626"});
		}
		else{
			mensaje = "<span class='glyphicon glyphicon-ok'></span> "+ msj;
			$("#contenedorMensaje").css({"background":"#2fb426"});
		}		
		$("#contenedorMensaje").slideDown("slow");
		$("#mensajeError_Confirmacion").html(mensaje)
	}
	$("body").click(function(){
		$("#contenedorMensaje").slideUp("slow");
	});

	var mensajeErrorConfirmacion2 = function (msj) {
		var mensaje;
		mensaje = "<span class='glyphicon glyphicon-ok'></span> "+ msj;
		$("#contenedorMensaje2").css({"background":"#2fb426"});
		
		$("#contenedorMensaje2").slideDown("slow");
		$("#mensajeError_Confirmacion2").html(mensaje)
	}
	$("body").click(function(){
		$("#contenedorMensaje2").slideUp("slow");
	});	

	var mostrarConfirmaciondeEliminacion = function(ideliminar){
		$(".lightbox").css({"display":"block"});
		$(".contenidoLightbox").css({"display":"block"});
		$("#spanLightbox").html(""+ideliminar+"");
		$("#btnLightbox").attr("name",""+ideliminar+"");
	}
	var ocultarConfirmaciondeEliminacion = function(tipoUsuario){
		$(".lightbox").css({"display":"none"});
		$(".contenidoLightbox").css({"display":"none"});
	}

	$(".btnEliminarMedico").click(eliminarMedico);
	$(".btnEliminarEnfermero").click(eliminarEnfermero);
	$(".btnEliminarPaciente").click(function(){
		var ideliminar=$(this).attr("name");
		eliminarEPaciente(ideliminar);
		eliminarPaciente(ideliminar);
	});
	$(".btnEliminarMedicina").click(eliminarMedicina);
	$(".btnNoEliminar").click(ocultarConfirmaciondeEliminacion);	

	validarCamposVacios = function(cedula, usuario, contraseña, nombre, apellido, email, especialidad){
		var band; 
		if (usuario == ""){ 
			$("#txtUsuario").css({"border-color": "rgb(208,69,72)"}) 
			$("#txtUsuario").css({"box-shadow":" 0px 0px 3px #ccc, 0 10px 15px rgb(243,146,147) inset"})
			band = true
		} 
		if (contraseña == ""){
			$("#txtContraseña").css({"border-color": "rgb(208,69,72)"}) 
			$("#txtContraseña").css({"box-shadow":" 0px 0px 3px #ccc, 0 10px 15px rgb(243,146,147) inset"})
			band = true
		}
		if (cedula == ""){
			$("#txtCedula").css({"border-color": "rgb(208,69,72)"}) 
			$("#txtCedula").css({"box-shadow":" 0px 0px 3px #ccc, 0 10px 15px rgb(243,146,147) inset"})
			band = true
		}
		if (nombre == ""){
			$("#txtNombre").css({"border-color": "rgb(208,69,72)"}) 
			$("#txtNombre").css({"box-shadow":" 0px 0px 3px #ccc, 0 10px 15px rgb(243,146,147) inset"})
			band = true
		}
		if (apellido == ""){
			$("#txtApellidos").css({"border-color": "rgb(208,69,72)"}) 
			$("#txtApellidos").css({"box-shadow":" 0px 0px 3px #ccc, 0 10px 15px rgb(243,146,147) inset"})
			band = true
		} 
		if (email == ""){
			$("#txtEmail").css({"border-color": "rgb(208,69,72)"}) 
			$("#txtEmail").css({"box-shadow":" 0px 0px 3px #ccc, 0 10px 15px rgb(243,146,147) inset"})
			band = true
		} 
	    if(especialidad == "") {
	    	$("#txtEspecialidad").css({"border-color": "rgb(208,69,72)"}) 
			$("#txtEspecialidad").css({"box-shadow":" 0px 0px 3px #ccc, 0 10px 15px rgb(243,146,147) inset"})
			band = true
	    }
	    if (band) {
			return band;
	    }
	    else{
	    	band = false;
	    	return band;
	    }    			     
	}
	$(".inputRegistro").focus( function(){
		$(this).css({"border-color": ""}) 
		$(this).css({"box-shadow":""})
	});  	
});


