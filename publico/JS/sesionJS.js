$ (document).ready(function(){
	$("#btnIniciarSesion").click(function(){
		//se guarda en variables los valores del formulario de inicio de sesión 
		var band = 0;
		var Usuario = $("#txtUsuario").val();
		var Contraseña = $("#txtContraseña").val();
		var Tipo = $("#tipoUsuario").val();

		validarCamposVacios(Usuario, Contraseña, Tipo);
		//consulta los usuarios de la tabla administrador
		if(Tipo === "administrador"){
			$.ajax({
				type:"GET",
				url:"http://recordatoriomedico.azurewebsites.net/administrador",
				dataType:"json",
				contentType:"text/plain"
			})
			.done( function(msg){
				//obtiene los datos del administrador y los compara con los datos recibidos del formulario de inicio sesión
				for(var dato in msg){
					if ((msg[dato].usuario == Usuario) && (msg[dato].contraseña == Contraseña)){
						band = 1	                      
	                    window.location.href='html/Administrador.html';                       
	                }                    
				}
				//muestra el mensaje de error si los datos no son correctos
				if(band != 1){
 			        var mensaje = "*Sus datos de sesión son incorrectos. Por favor, ingrese nuevamente sus datos";
			        mensajedeError(mensaje)
			    }        			     
			});
		}
		//se inicializan los valores para quitar el mensaje de error
		$(".datosSesion").focus( function(){
			$(".datosSesion").css({"border-color": ""}) 
			$(".datosSesion").css({"box-shadow":""})
			$("#mensaje").html("")
		});

		$("#tipoUsuario").focus( function(){
		   	$(".datosSesion").css({"border-color": ""}) 
			$(".datosSesion").css({"box-shadow":""})
			$("#mensaje").html("")
		}); 			
	});

	//se compara los campos para validar que ninguno este vacío
	validarCamposVacios = function(usuario, contraseña, tipodeUsuario){
		var mensaje;
		if ((usuario == "") || (contraseña == "")) {
			mensaje ="*Por favor, ingrese todos sus datos de sesión";
			mensajedeError(mensaje);
		}
		else{
			if (tipodeUsuario == null) {
				mensaje ="*Por favor, seleccione el tipo de Usuario";
				mensajedeError(mensaje);
			}
		}
		$(".datosSesion").focus( function(){
			$(".datosSesion").css({"border-color": ""}) 
			$(".datosSesion").css({"box-shadow":""})
			$("#mensaje").html("")
		});      			     
	}

	//se crea el cuadro de mensaje de error
	mensajedeError = function(msj){
		var mensaje = "<div id='mensaje_error_sesion'>";
			mensaje += "<p id='pmensaje'>"+msj+"</p>";
			mensaje += "</div>";
			$("#mensaje").html(mensaje);
			$("#mensaje_error_sesion").slideDown("slow");

			$(".datosSesion").css({"border-color": "rgb(208,69,72)"}) 
			$(".datosSesion").css({"box-shadow":" 0px 0px 3px #ccc, 0 10px 15px rgb(243,146,147) inset"})
	}
});