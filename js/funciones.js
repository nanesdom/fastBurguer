function inicializar(){
	verMapa();	
}

function cargar(){
	email = localStorage.getItem('email');
	user = localStorage.getItem('user');
	document.getElementById('tucorreo').innerHTML = email;
	document.getElementById('hola').innerHTML = "Hola @"+user;
}

function variable(){
	Sesion = localStorage.getItem('user');

	variableAjax = new XMLHttpRequest();
	variableAjax.open('POST', 'http://148.220.208.123:9999/fastburguer/php/sesion.php');

	variableAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	variableAjax.send('usuario=' + Sesion);

	variableAjax.onreadystatechange = function() {

		if (variableAjax.readyState == 4 && variableAjax.status == 200) {

				resultado = variableAjax.responseText;

				if (resultado == "ok") {					
				}
					if (resultado == "noiniciada"){
						salir();
					}
		}
	}
} 

function variable2(){
	Sesion = localStorage.getItem('user');

	variable2Ajax = new XMLHttpRequest();
	variable2Ajax.open('POST', 'http://148.220.208.123:9999/fastburguer/php/sesion2.php');

	variable2Ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	variable2Ajax.send('usuario=' + Sesion);

	variable2Ajax.onreadystatechange = function() {

		if (variable2Ajax.readyState == 4 && variable2Ajax.status == 200) {

				resultado = variable2Ajax.responseText;

				if (resultado == "ok") {					
				}
					if (resultado == "noiniciada"){
						window.location.assign('index.html');
					}				
		}
	}
}

function carrito(){
	user = localStorage.getItem('id');

	carritoAjax = new XMLHttpRequest();
	carritoAjax.open('POST', 'http://148.220.208.123:9999/fastburguer/php/carrito.php');

	carritoAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	carritoAjax.send('usuario=' + user);

	carritoAjax.onreadystatechange = function() {

		if (carritoAjax.readyState == 4 && carritoAjax.status == 200) {

				resultado = carritoAjax.responseText;				
				localStorage.setItem('idCarrito', resultado);
		}
	}
}

function verMapa(){
	navigator.geolocation.getCurrentPosition(lugar);
}

function lugar(coordenadas){
	longitud = coordenadas.coords.longitude;
	latitud = coordenadas.coords.latitude;
	initMap();  	
	
}

function codeLatLng(geocoder, newLat, newLong) {
        var latlng = {lat: newLat, lng: newLong};
        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            if (results[1]) {             
              document.getElementById('direccion1').innerHTML = results[0].formatted_address;   
              localStorage.setItem('direccion', results[0].formatted_address);           
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
} 

function ir(direccion){
		window.location.assign(direccion);
}

function entrar(){
	usuario = document.getElementById('usuario');
	password = document.getElementById('password');
	//Validaciones
	if (usuario.value == "") {
		usuario.style.border= "none";
		usuario.style.backgroundColor="rgba(255, 0, 0, .1)";
		usuario.style.borderBottom= "3px solid #e74c3c";
		usuarioColocado  = false;

	}else{
		usuario.style.border= "none";
		usuario.style.backgroundColor="transparent";
		usuario.style.borderBottom= "1px solid black";
		usuarioColocado  = true;
	}
	if (password.value == "") {
		password.style.border= "none";
		password.style.backgroundColor="rgba(255, 0, 0, .1)";
		password.style.borderBottom= "3px solid #e74c3c";
		passwordColocado  = false;
	}else{
		password.style.border= "none";
		password.style.backgroundColor="transparent";
		password.style.borderBottom= "1px solid black";
		passwordColocado  = true;
	}

	//ENVIAR DATOS
	if (!desconectadoInternet) {
		if(usuarioColocado && passwordColocado){
			loginAjax = new XMLHttpRequest();
			loginAjax.open('POST', 'http://148.220.208.123:9999/fastburguer/php/login.php');

			loginAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

			loginAjax.send('usuario=' + usuario.value + '&password=' + password.value);

			loginAjax.onreadystatechange = function() {

				if (loginAjax.readyState == 4 && loginAjax.status == 200) {

						respuesta = JSON.parse(loginAjax.responseText);						

						resultado = respuesta.logueado;


						if (resultado == "ok") {							
							localStorage.setItem('user', respuesta.username);
							localStorage.setItem('email', respuesta.correo);
							localStorage.setItem('id', respuesta.id);
							if (respuesta.username == "admin") {
								window.location.assign('admin.html');
							}else{
								window.location.assign('index.html');
							}							
						}

						if (resultado == "mal") {
							verMensaje("Usuario o contraseña incorrectos :(");
							usuario.style.border= "none";
							usuario.style.backgroundColor="rgba(255, 0, 0, .1)";
							usuario.style.borderBottom= "3px solid #e74c3c";
							password.style.border= "none";
							password.style.backgroundColor="rgba(255, 0, 0, .1)";
							password.style.borderBottom= "3px solid #e74c3c";
						}
				}				
			}			
		}else{
			verMensaje('Ups! Por favor completa los campos señalados :(');
			}
	}else{
		verMensaje('No puedes iniciar, revisa tu conexión a internet');
	}
}

			function verMensaje(msj){
				mensaje = document.getElementById('mensaje');
				mensaje2 = document.getElementById('mensaje2');

				mensaje2.style.top="-80px";	
				
				mensaje2.style.background= "#e74c3c";

				mensaje.style.background= "#e74c3c";	
				mensaje.innerHTML=msj;
				mensaje.style.transition=".5s all";
				mensaje.style.top="0px";	
																		
				//DESAPARECER
				setTimeout(function(){
					mensaje.style.top="-80px";
				},5000);
			}

			function verMensaje2(msj){
				mensaje = document.getElementById('mensaje2');
				mensaje2 = document.getElementById('mensaje');

				mensaje2.style.top="-80px";		
				

				mensaje.style.background="green";
				mensaje.innerHTML=msj;
				mensaje.style.transition=".5s all";
				mensaje.style.top="0px";				
													
				//DESAPARECER
				setTimeout(function(){
					mensaje.style.top="-80px";					
				},5000);
			}

			function verMensaje3(mensaje){
				ventana = document.getElementById('ventana');
				ventana.style.transition=".5s all";			
				ventana.style.left="10%";
				ventana.innerHTML="<h3>"+mensaje+"</h3>"																						
			}

			window.addEventListener('offline', desconectado, true);
			window.addEventListener('online', conectado, true);
			var desconectadoInternet = false;

			function desconectado(){
				verMensaje('Por favor revisa tu conexion a internet');
				desconectadoInternet = true;
			}
			function conectado(){
				verMensaje2('Ya hay internet!');
				desconectadoInternet = false;
			}

function salir(){
	Sesion = localStorage.getItem('user');

	variableAjax = new XMLHttpRequest();
	variableAjax.open('POST', 'http://148.220.208.123:9999/fastburguer/php/salir.php');

	variableAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	variableAjax.send('usuario=' + Sesion);

	variableAjax.onreadystatechange = function() {

		if (variableAjax.readyState == 4 && variableAjax.status == 200) {

				resultado = variableAjax.responseText;

				if (resultado == "ok") {
					window.location.assign('login.html');
					localStorage.removeItem('id');
					localStorage.removeItem('user');
					localStorage.removeItem('email');
					localStorage.removeItem('idCarrito');
					localStorage.removeItem('lat');
						localStorage.removeItem('long');
						localStorage.removeItem('direccion');						
if (resultado == "ok") {
					window.location.assign('step2.html');
				}
				}
					if (resultado == "noiniciada"){
						window.location.assign('login.html');
						localStorage.removeItem('id');
						localStorage.removeItem('user');
						localStorage.removeItem('email');
						localStorage.removeItem('idCarrito');
						localStorage.removeItem('lat');
						localStorage.removeItem('long');
						localStorage.removeItem('direccion');						
if (resultado == "ok") {
					window.location.assign('step2.html');
				}
					}
		}
	}	
}

function registrarme(){
	user = document.getElementById('user');
	pass = document.getElementById('pass');
	pass2 = document.getElementById('pass2');
	correo = document.getElementById('correo');
	//Validaciones
	if (user.value == "") {
		user.style.border= "none";
		user.style.backgroundColor="rgba(255, 0, 0, .1)";
		user.style.borderBottom= "3px solid #e74c3c";
		userColocado  = false;

	}else{
		user.style.border= "none";
		user.style.backgroundColor="transparent";
		user.style.borderBottom= "1px solid black";
		userColocado  = true;
	}

	if (pass.value == "") {
		pass.style.border= "none";
		pass.style.backgroundColor="rgba(255, 0, 0, .1)";
		pass.style.borderBottom= "3px solid #e74c3c";
		passColocado  = false;
	}else{
		pass.style.border= "none";
		pass.style.backgroundColor="transparent";
		pass.style.borderBottom= "1px solid black";
		passColocado  = true;
	}

	if (pass2.value == "") {
		pass2.style.border= "none";
		pass2.style.backgroundColor="rgba(255, 0, 0, .1)";
		pass2.style.borderBottom= "3px solid #e74c3c";
		pass2Colocado  = false;
	}else{
		pass2.style.border= "none";
		pass2.style.backgroundColor="transparent";
		pass2.style.borderBottom= "1px solid black";
		pass2Colocado  = true;
	}

	if (correo.value == "") {
		correo.style.border= "none";
		correo.style.backgroundColor="rgba(255, 0, 0, .1)";
		correo.style.borderBottom= "3px solid #e74c3c";
		correoColocado  = false;
	}else{
		correo.style.border= "none";
		correo.style.backgroundColor="transparent";
		correo.style.borderBottom= "1px solid black";
		correoColocado  = true;
	}

	//ENVIAR DATOS
	if (!desconectadoInternet) {
		if(userColocado && passColocado && pass2Colocado && correoColocado){
			registroAjax = new XMLHttpRequest();
			registroAjax.open('POST', 'http://148.220.208.123:9999/fastburguer/php/registro.php');

			registroAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

			registroAjax.send('usuario=' + user.value + '&password=' + pass.value + '&correo=' + correo.value + '&password2=' + pass2.value);

			registroAjax.onreadystatechange = function() {

				if (registroAjax.readyState == 4 && registroAjax.status == 200) {

						resultado = registroAjax.responseText;

						if (resultado == "ok") {
							verMensaje3('Registro Exitoso!');
						}

						if (resultado == "error") {
							verMensaje('Ocurrió un error, inténtalo más tarde...');
						}

						if (resultado == "contraseña") {
							verMensaje('Las contraseñas no coinciden');
							pass.style.border= "none";
							pass.style.backgroundColor="rgba(255, 0, 0, .1)";
							pass.style.borderBottom= "3px solid #e74c3c";
							pass2.style.border= "none";
							pass2.style.backgroundColor="rgba(255, 0, 0, .1)";
							pass2.style.borderBottom= "3px solid #e74c3c";
						}else{
							pass.style.border= "none";
							pass.style.backgroundColor="transparent";
							pass.style.borderBottom= "1px solid black";
							pass2.style.border= "none";
							pass2.style.backgroundColor="transparent";
							pass2.style.borderBottom= "1px solid black";
						}

						if (resultado == "existe") {
							verMensaje('El usuario ya existe');
							user.style.border= "none";
							user.style.backgroundColor="rgba(255, 0, 0, .1)";
							user.style.borderBottom= "3px solid #e74c3c";
						}else{
							user.style.border= "none";
							user.style.backgroundColor="transparent";
							user.style.borderBottom= "1px solid black";
						}
						
				}
			}					
	}else{
			verMensaje('Ups! Por favor completa los campos señalados :(');
			}
	}else{
		verMensaje('No puedes iniciar, revisa tu conexión a internet');
	}
}

function sumar(cuadro){
	cuadrito = document.getElementById(cuadro);

	valorActual=parseInt(cuadrito.value);
	valorActual++;
	cuadrito.value=valorActual;
	precio = document.getElementById('precio');

	chek1 = document.getElementById('ve1');
	chek2 = document.getElementById('ve2');
	chek3 = document.getElementById('ve3');
	chek4 = document.getElementById('ve4');

	if (chek1.checked || chek2.checked || chek3.checked || chek4.checked) {
		if (precio.value==0 && valorCantidad == 0) {
			precio.value = 59 * valorActual;
		}
	}

	if (precio.value > 0 && valorCantidad == 0) {
		precio.value = 59 * valorActual;
	}

	if (valorCantidad <= 2 && valorCantidad > 0) {
		precio.value= 59 * valorActual;
	}
	if (valorCantidad == 3 || valorCantidad == 4 || valorCantidad == 5 || valorCantidad == 6) {
		precio.value= 89 * valorActual;
	}
	if (valorCantidad> 6) {
		precio.value= 150 * valorActual;
	}
}

function restar(cuadro){
	cuadrito = document.getElementById(cuadro);

	valorActual=parseInt(cuadrito.value);

	if (valorActual>0) {
		valorActual--;
		cuadrito.value=valorActual;
	}

	if (precio.value > 0 && valorCantidad == 0) {
		precio.value = 59 * valorActual;
	}

	if (valorCantidad <= 2 && valorCantidad > 0) {
		precio.value= 59 * valorActual;
	}
	if (valorCantidad == 3 || valorCantidad == 4 || valorCantidad == 5 || valorCantidad == 6) {
		precio.value= 89 * valorActual;
	}
	if (valorCantidad> 6) {
		precio.value= 150 * valorActual;
	}

}

function pedir(){


	latitud = localStorage.getItem('lat');
	longitud = localStorage.getItem('long');
	direccion = localStorage.getItem('direccion');
	idCarrito = localStorage.getItem('idCarrito');

	lugarAjax = new XMLHttpRequest();
	lugarAjax.open('POST', 'http://148.220.208.123:9999/fastburguer/php/lugar.php');

	lugarAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	lugarAjax.send('latitud=' + latitud + '&longitud=' + longitud + '&direccion=' + direccion + '&idCarrito=' + idCarrito);

	lugarAjax.onreadystatechange = function() {

		if (lugarAjax.readyState == 4 && lugarAjax.status == 200) {

				resultado = lugarAjax.responseText;

				if (resultado == "ok") {
					window.location.assign('step2.html');
				}			
		}
	}	
}

var valorCantidad = 0;
var ingred = [];
	
function agregarIn(boton, name, m1){
	boton = document.getElementById(boton);
	names = document.getElementById(name);
	cantidad = document.getElementById(m1);	
	valorCantidad = parseInt(cantidad.value);
	precio = document.getElementById('precio');
	numhambur = parseInt(document.getElementById('m2').value);
	chek1 = document.getElementById('ve1');
	chek2 = document.getElementById('ve2');
	chek3 = document.getElementById('ve3');
	chek4 = document.getElementById('ve4');

	if (boton.classList[1] == 'desactivado') {
		boton.style.background="var(--color-diferente)";
		boton.classList.remove('desactivado');
		boton.classList.add('activado');
		valorCantidad++;
		document.getElementById(m1).value=valorCantidad;	
		ingred.push(name);			
	}
	else{
		boton.style.background="transparent";
		boton.classList.remove('activado');
		boton.classList.add('desactivado');
		for (i = 0; i<ingred.length;i++) {
			if (ingred[i] == name) {
				ingred.splice(i, 1);
			}
		}
		if (valorCantidad>0) {
			valorCantidad--;	
			document.getElementById(m1).value=valorCantidad;					
		}		
	}		
	

	if (valorCantidad <= 2) {
		precio.value= 59 * numhambur;
	}
	if (valorCantidad == 3 || valorCantidad == 4 || valorCantidad == 5 || valorCantidad == 6) {
		precio.value= 89 * numhambur;
	}
	if (valorCantidad> 6) {
		precio.value= 150 * numhambur;
	}

	if (valorCantidad==0) {
		if (chek1.checked || chek2.checked || chek3.checked || chek4.checked) {
				precio.value = 59 * valorActual;
		}
		else{
			precio.value = 0;
		}
	}
}

function agregarVe(check, div){
	checke = document.getElementById(check);
	divv = document.getElementById(div);
	name = checke.name;
		cuadrito = document.getElementById('m2');

	valorActual=parseInt(cuadrito.value);

	if (checke.checked) {
		divv.style.background="var(--color-diferente)";
		if (valorCantidad == 0) {			
			precio.value= 59 * valorActual;
		}
		ingred.push(name);	
	}else{
		divv.style.background="transparent";
		if (valorCantidad == 0) {			
			precio.value= 0 * valorActual;
		}
		for (i = 0; i<ingred.length;i++) {
			if (ingred[i] == name) {
				ingred.splice(i, 1);
			}
		}
	}

	chek1 = document.getElementById('ve1');
	chek2 = document.getElementById('ve2');
	chek3 = document.getElementById('ve3');
	chek4 = document.getElementById('ve4');

	if (chek1.checked || chek2.checked || chek3.checked || chek4.checked) {
		if (precio.value==0 && valorCantidad == 0) {
			precio.value = 59 * valorActual;
		}
	}	
}

function info(ventana){
	venta = document.getElementById(ventana);
	venta.style.left="calc(50% - 100px)";
	venta.style.opacity="1";
}

function noinfo(ventana){
	venta = document.getElementById(ventana);	
	venta.style.left="-100000px";
	venta.style.opacity="0";
}

function agregar(){
		photo = document.getElementById("file");
		nombreEspecialidad = document.getElementById("nombreEspecialidad").value;
		precio = document.getElementById("precio").value;
		descripcion = document.getElementById("descripcion").value;

		files = photo.files;
		file = files[0];
		if (nombreEspecialidad == "" || precio == "" || descripcion == "" || file == null) {
			verMensaje('Llena todos los campos');
		}else{
			formData = new FormData();
			formData.append('foto', file, file.name);
			formData.append('nombreEspecialidad', nombreEspecialidad);
			formData.append('precio', precio);
			formData.append('descripcion', descripcion);

			agregar = new XMLHttpRequest();
			agregar.open('POST', 'http://148.220.208.123:9999/fastburguer/php/agregarEspecialidad.php');

			

			agregar.send(formData);

			agregar.onreadystatechange = function() {

				if (agregar.readyState == 4 && agregar.status == 200) {

						resultado = agregar.responseText;
						if (resultado == "ok") {
							verMensaje3('Se agregó Exitosamente!');
						}
						else{
							verMensaje3('Ocurrió un error');
						}
		   
				}
			}

			document.getElementById("file").value=null;
			document.getElementById("nombreEspecialidad").value=null;
			document.getElementById("precio").value=null;
			document.getElementById("descripcion").value=null;
		}
}

function nombre(){
		photo = document.getElementById("file");
		document.getElementById('label').innerHTML = photo.files[0].name;
}

function agregar2(){
		photo = document.getElementById("file");
		nombreCombo = document.getElementById("nombreCombo").value;
		precio = document.getElementById("precio").value;
		descripcion = document.getElementById("descripcion").value;

		files = photo.files;
		file = files[0];
		if (nombreCombo == "" || precio == "" || descripcion == "" || file == null) {
			verMensaje('Llena todos los campos');
		}else{
			formData = new FormData();
			formData.append('foto', file, file.name);
			formData.append('nombreCombo', nombreCombo);
			formData.append('precio', precio);
			formData.append('descripcion', descripcion);		

			agregar = new XMLHttpRequest();
			agregar.open('POST', 'http://148.220.208.123:9999/fastburguer/php/agregarCombo.php');

			

			agregar.send(formData);

			agregar.onreadystatechange = function() {

				if (agregar.readyState == 4 && agregar.status == 200) {

						resultado = agregar.responseText;
						if (resultado == "ok") {
							verMensaje3('Se agregó Exitosamente!');
						}
						else{
							verMensaje3('Ocurrió un error');
						}
		   
				}
			}

			document.getElementById("file").value=null;
			document.getElementById("nombreCombo").value=null;
			document.getElementById("precio").value=null;
			document.getElementById("descripcion").value=null;
		}			

}

function agregar3(){
		photo = document.getElementById("file");
		nombreIngrediente = document.getElementById("nombreIngrediente").value;

		files = photo.files;
		file = files[0];
		if (nombreIngrediente == "" ||  file == null) {
			verMensaje('Llena todos los campos');
		}else{
			formData = new FormData();
			formData.append('foto', file, file.name);
			formData.append('nombreIngrediente', nombreIngrediente);


			agregar = new XMLHttpRequest();
			agregar.open('POST', 'http://148.220.208.123:9999/fastburguer/php/agregarIngrediente.php');

			

			agregar.send(formData);

			agregar.onreadystatechange = function() {

				if (agregar.readyState == 4 && agregar.status == 200) {

						resultado = agregar.responseText;
						if (resultado == "ok") {
							verMensaje3('Se agregó Exitosamente!');
						}
						else{
							verMensaje('Ocurrió un error');
						}
		   
				}
			}

			document.getElementById("file").value=null;
			document.getElementById("nombreIngrediente").value=null;
		}
}	

function cargarCombos(){

	flag= true;
	cargarCombosAjax = new XMLHttpRequest();

			cargarCombosAjax.open('POST', 'http://148.220.208.123:9999/fastburguer/php/combos.php');

			cargarCombosAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

			cargarCombosAjax.send('flag='+flag);

			cargarCombosAjax.onreadystatechange = function() {

				if (cargarCombosAjax.readyState == 4 && cargarCombosAjax.status == 200) {

						respuesta = JSON.parse(cargarCombosAjax.responseText);	

						for (i = 0; i < respuesta.length; i++) {
											
							div=
							"<span>"+
								"<div onclick='info(&apos;cc"+respuesta[i].id+"&apos;)' class='xddd'>"+
									"<h3 id='nc"+respuesta[i].id+"'>"+respuesta[i].nombre+"</h3>" +
									"<h6 id='pc"+respuesta[i].id+"'>"+respuesta[i].precio+"</h6>"+
									"<img src='"+respuesta[i].foto+"'>"+
									"</div>"+
									"<div class='mas'>"+
										"<button id='sum' onclick='sumar(&apos;"+"c"+respuesta[i].id+"&apos;)'>+</button>"+
										"<button id='rest' onclick='restar(&apos;"+"c"+respuesta[i].id+"&apos;)'>-</button>"+
										"<input type='number'  value='0' disabled='' id='"+"c"+respuesta[i].id+"' min='0'>"+
									"</div>"+									
								"<div class='registrarse' onclick='comprarCombo("+"&apos;"+respuesta[i].id+"&apos;,"+"&apos;"+respuesta[i].nombre+"&apos;,"+"&apos;c"+respuesta[i].id+"&apos;,"+"&apos;"+respuesta[i].precio+"&apos;,"+"&apos;"+respuesta[i].descripcion+"&apos;"+")'>Agregar al Carrito</div>" + 
							"</span>";

							div2=
							"<div id='cc"+respuesta[i].id+"' onclick='noinfo(&apos;cc"+respuesta[i].id+"&apos;)' class='cc1'>"+
								"<h1><i class='fa fa-window-close' aria-hidden='true' onclick='noinfo(&apos;cc"+respuesta[i].id+"&apos;)'></i></h1>"+
							 	"<p>"+respuesta[i].descripcion+"</p>"+
							"</div>";

							document.querySelector('main').innerHTML += div2;	
							document.querySelector('.combos').innerHTML += div;													
						}
						i=0;
						//animacionCombos();					
				}				
			}			
}

function cargarEspecialidades(){

	flag= true;
	cargarEspecialidadesAjax = new XMLHttpRequest();

			cargarEspecialidadesAjax.open('POST', 'http://148.220.208.123:9999/fastburguer/php/especialidades.php');

			cargarEspecialidadesAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

			cargarEspecialidadesAjax.send('flag='+flag);

			cargarEspecialidadesAjax.onreadystatechange = function() {

				if (cargarEspecialidadesAjax.readyState == 4 && cargarEspecialidadesAjax.status == 200) {

						respuesta = JSON.parse(cargarEspecialidadesAjax.responseText);	

						for (i = 0; i < respuesta.length; i++) {
											
							div=
							"<span>"+
								"<div onclick='info(&apos;cc"+respuesta[i].id+"&apos;)' class='xddd'>"+
									"<h3 id='nc"+respuesta[i].id+"'>"+respuesta[i].nombre+"</h3>" +
									"<h6 id='pc"+respuesta[i].id+"'>"+respuesta[i].precio+"</h6>"+
									"<img src='"+respuesta[i].foto+"'>"+
									"</div>"+
									"<div class='mas'>"+
										"<button id='sum' onclick='sumar(&apos;"+"c"+respuesta[i].id+"&apos;)'>+</button>"+
										"<button id='rest' onclick='restar(&apos;"+"c"+respuesta[i].id+"&apos;)'>-</button>"+
										"<input type='number'  value='1' disabled='' id='"+"c"+respuesta[i].id+"' min='1'>"+
									"</div>"+									
								"<div class='registrarse' onclick='comprarEspecialidad("+"&apos;"+respuesta[i].id+"&apos;,"+"&apos;"+respuesta[i].nombre+"&apos;,"+"&apos;c"+respuesta[i].id+"&apos;,"+"&apos;"+respuesta[i].precio+"&apos;,"+"&apos;"+respuesta[i].descripcion+"&apos;"+")'>Agregar al Carrito</div>" + 
							"</span>";

							div2=
							"<div id='cc"+respuesta[i].id+"' onclick='noinfo(&apos;cc"+respuesta[i].id+"&apos;)' class='ss1'>"+
								"<h1><i class='fa fa-window-close' aria-hidden='true' onclick='noinfo(&apos;cc"+respuesta[i].id+"&apos;)'></i></h1>"+
							 	"<p>"+respuesta[i].descripcion+"</p>"+
							"</div>";

							document.querySelector('main').innerHTML += div2;	
							document.querySelector('.combos').innerHTML += div;													
						}
						i=0;
						//animacionCombos();					
				}				
			}			
}

function comprarEspecialidad(id, nombre, cantidad, precio, descripcion){
	c=document.getElementById(cantidad).value;
	total = precio * c;
	idCarrito = localStorage.getItem('idCarrito');

	if (c == 0) {
		verMensaje('No se pueden comprar 0');
	}else{		
		comprarEspecialidadAjax = new XMLHttpRequest();
		comprarEspecialidadAjax.open('POST', 'http://148.220.208.123:9999/fastburguer/php/comprarEspecialidad.php');

		comprarEspecialidadAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		comprarEspecialidadAjax.send('id=' + id + '&nombre=' + nombre + '&cantidad=' + c + '&total=' + total + '&descripcion=' + descripcion + '&idCarrito=' + idCarrito);

		comprarEspecialidadAjax.onreadystatechange = function() {

			if (comprarEspecialidadAjax.readyState == 4 && comprarEspecialidadAjax.status == 200) {

					resultado = comprarEspecialidadAjax.responseText;

					if (resultado == "ok") {
						verMensaje3('Se agregó al carrito!');
					}			
			}
		}	
	}	
}

function comprarCombo(id, nombre, cantidad, precio, descripcion){
	c=document.getElementById(cantidad).value;
	total = precio * c;
	idCarrito = localStorage.getItem('idCarrito');

	if (c == 0) {
		verMensaje('No se pueden comprar 0');
	}else{		
		comprarComboAjax = new XMLHttpRequest();
		comprarComboAjax.open('POST', 'http://148.220.208.123:9999/fastburguer/php/compraCombo.php');

		comprarComboAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		comprarComboAjax.send('id=' + id + '&nombre=' + nombre + '&cantidad=' + c + '&total=' + total + '&descripcion=' + descripcion + '&idCarrito=' + idCarrito);

		comprarComboAjax.onreadystatechange = function() {

			if (comprarComboAjax.readyState == 4 && comprarComboAjax.status == 200) {

					resultado = comprarComboAjax.responseText;

					if (resultado == "ok") {
						verMensaje3('Se agregó al carrito!');
					}			
			}
		}	
	}	
}

function cargarIngredientes(){

	flag= true;
	cargarIngredientesAjax = new XMLHttpRequest();

			cargarIngredientesAjax.open('POST', 'http://148.220.208.123:9999/fastburguer/php/ingredientes.php');

			cargarIngredientesAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

			cargarIngredientesAjax.send('flag='+flag);

			cargarIngredientesAjax.onreadystatechange = function() {

				if (cargarIngredientesAjax.readyState == 4 && cargarIngredientesAjax.status == 200) {

						respuesta = JSON.parse(cargarIngredientesAjax.responseText);	

						for (i = 0; i < respuesta.length; i++) {

							div2=
							"<button class='ingrediente desactivado' onclick='agregarIn(&apos;ing"+respuesta[i].id+"&apos;, &apos;"+respuesta[i].nombre+"&apos;, &apos;m1&apos;)' id='ing"+respuesta[i].id+"'>"+
				 			"<img src='"+respuesta[i].foto+"'><h4>"+respuesta[i].nombre+"</h4></button>";

							document.querySelector('#ingres').innerHTML += div2;												
						}
						i=0;
						//animacionCombos();					
				}				
			}			
}

function agregarHambur(){
	//num ing, precio, cantidad, nombre, estado, descripcion
	precio = document.getElementById('precio').value;
	numIng = document.getElementById('m1').value;
	cantidad = document.getElementById('m2').value;
	username = localStorage.getItem('user');
	idCarrito = localStorage.getItem('idCarrito');
	nombre = "Creacion de " + username;
	descripcion  = ingred.toString()
	
	if (precio == 0) {
		verMensaje('No hay nada...');
	}else{		
		comprarHambur = new XMLHttpRequest();
		comprarHambur.open('POST', 'http://148.220.208.123:9999/fastburguer/php/comprarHambur.php');

		comprarHambur.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		comprarHambur.send('numIng=' + numIng + '&nombre=' + nombre + '&cantidad=' + cantidad + '&total=' + precio + '&descripcion=' + descripcion + '&idCarrito=' + idCarrito);

		comprarHambur.onreadystatechange = function() {

			if (comprarHambur.readyState == 4 && comprarHambur.status == 200) {

					resultado = comprarHambur.responseText;

					if (resultado == "ok") {
						verMensaje3('Se agregó al carrito!');
					}			
					
			}
		}	
	}	
}

function abrir(ventana){
	document.getElementById(ventana).style.left = "10%";
}

function ocultar(ventana){
	document.getElementById(ventana).style.left = "-80%";
}

function cargarCarrito(){
	idCarrito = localStorage.getItem('idCarrito');
	cargarEspe = new XMLHttpRequest();

	cargarEspe.open('POST', 'http://148.220.208.123:9999/fastburguer/php/cargarEspe.php');

	cargarEspe.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	cargarEspe.send('idCarrito='+idCarrito);

	cargarEspe.onreadystatechange = function() {

		if (cargarEspe.readyState == 4 && cargarEspe.status == 200) {

				respuesta = JSON.parse(cargarEspe.responseText);					

				for (i = 0; i < respuesta.length; i++) {

					div2="<div class='elemento'>"+	
							"<div class='ventanadetalle' id='esp"+respuesta[i].id+"' onclick='ocultar(&apos;esp"+respuesta[i].id+"&apos;)''>"+
							respuesta[i].descripcion+
							"</div>"+
							"<div class='detallee'><i class='fa fa-eye' aria-hidden='true' onclick='abrir(&apos;esp"+respuesta[i].id+"&apos;)'></i></div>"+
							"<div class='nombree'>"+respuesta[i].nombre+"</div>"+
							"<div class='cantidadd'>"+respuesta[i].cantidad+"</div>"+
							"<div class='totall'>"+respuesta[i].precio+"</div>"+
							"<div class='borrar'><i class='fa fa-minus-circle' aria-hidden='true'></i></div>"+
						"</div>";

					document.querySelector('#espe').innerHTML += div2;												
				}
				i=0;
				//animacionCombos();					
		}				
	}	



	cargarComboAjax = new XMLHttpRequest();

	cargarComboAjax.open('POST', 'http://148.220.208.123:9999/fastburguer/php/cargarCombo.php');

	cargarComboAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	cargarComboAjax.send('idCarrito='+idCarrito);

	cargarComboAjax.onreadystatechange = function() {

		if (cargarComboAjax.readyState == 4 && cargarComboAjax.status == 200) {

				respuesta = JSON.parse(cargarComboAjax.responseText);					

				for (i = 0; i < respuesta.length; i++) {

					div2="<div class='elemento'>"+	
							"<div class='ventanadetalle' id='esp"+respuesta[i].id+"' onclick='ocultar(&apos;esp"+respuesta[i].id+"&apos;)''>"+
							respuesta[i].descripcion+
							"</div>"+
							"<div class='detallee'><i class='fa fa-eye' aria-hidden='true' onclick='abrir(&apos;esp"+respuesta[i].id+"&apos;)'></i></div>"+
							"<div class='nombree'>"+respuesta[i].nombre+"</div>"+
							"<div class='cantidadd'>"+respuesta[i].cantidad+"</div>"+
							"<div class='totall'>"+respuesta[i].precio+"</div>"+
							"<div class='borrar'><i class='fa fa-minus-circle' aria-hidden='true'></i></div>"+
						"</div>";

					document.querySelector('#comb').innerHTML += div2;												
				}
				i=0;
				//animacionCombos();					
		}				
	}	

	cargarHamburguesa = new XMLHttpRequest();

	cargarHamburguesa.open('POST', 'http://148.220.208.123:9999/fastburguer/php/cargarHamburguesa.php');

	cargarHamburguesa.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	cargarHamburguesa.send('idCarrito='+idCarrito);

	cargarHamburguesa.onreadystatechange = function() {

		if (cargarHamburguesa.readyState == 4 && cargarHamburguesa.status == 200) {

				respuesta = JSON.parse(cargarHamburguesa.responseText);					

				for (i = 0; i < respuesta.length; i++) {

					div2="<div class='elemento'>"+	
							"<div class='ventanadetalle' id='esp"+respuesta[i].id+"' onclick='ocultar(&apos;esp"+respuesta[i].id+"&apos;)''>"+
							respuesta[i].descripcion+
							"</div>"+
							"<div class='detallee'><i class='fa fa-eye' aria-hidden='true' onclick='abrir(&apos;esp"+respuesta[i].id+"&apos;)'></i></div>"+
							"<div class='nombree'>"+respuesta[i].nombre+"</div>"+
							"<div class='cantidadd'>"+respuesta[i].cantidad+"</div>"+
							"<div class='totall'>"+respuesta[i].precio+"</div>"+
							"<div class='borrar'><i class='fa fa-minus-circle' aria-hidden='true'></i></div>"+
						"</div>";

					document.querySelector('#bur').innerHTML += div2;												
				}
				i=0;
				//animacionCombos();					
		}				
	}	

	miCarrito = new XMLHttpRequest();
			miCarrito.open('POST', 'http://148.220.208.123:9999/fastburguer/php/miCarrito.php');

			miCarrito.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

			miCarrito.send('idCarrito=' + idCarrito);

			miCarrito.onreadystatechange = function() {

				if (miCarrito.readyState == 4 && miCarrito.status == 200) {

						respuesta = JSON.parse(miCarrito.responseText);	
						if (respuesta.total != null) {
							document.getElementById('totalazo').innerHTML="$"+respuesta.total;
						}else{
							document.getElementById('totalazo').innerHTML="$0";
						}								
				}
			}	
}

function comprar(){
	idCarrito = localStorage.getItem('idCarrito');
	direccion = localStorage.getItem('direccion');
	comprarAjax = new XMLHttpRequest();
	comprarAjax.open('POST', 'http://148.220.208.123:9999/fastburguer/php/comprarAjax.php');

			comprarAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

			comprarAjax.send('idCarrito=' + idCarrito);

			comprarAjax.onreadystatechange = function() {

				if (comprarAjax.readyState == 4 && comprarAjax.status == 200) {

						respuesta = comprarAjax.responseText;									

						if (respuesta == "ok") {
							document.getElementById('detalle').innerHTML="Tu pedido será entregado en: "+direccion;
							abrir('detalle');
							document.getElementById('comprarzazo').removeAttribute('onclick');	
							carrito();
						}
						if (respuesta == "nada") {
							verMensaje('No has agregado nada al carrito');
						}

						if (respuesta == "direccion") {
							verMensaje('No has agregado una direccion');
						}
				}
			}	
}

function ventas(){
	idCarrito = localStorage.getItem('idCarrito');
	ventasAjax = new XMLHttpRequest();
	ventasAjax.open('POST', 'http://148.220.208.123:9999/fastburguer/php/ventas.php');

			ventasAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			ventasAjax.send('idCarrito=' + idCarrito);			

			ventasAjax.onreadystatechange = function() {

				if (ventasAjax.readyState == 4 && ventasAjax.status == 200) {

						respuesta = ventasAjax.responseText;															
							document.getElementById('vendido').innerHTML="$"+respuesta;							
				}
			}	
}