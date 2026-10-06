/*
index.js
------------------------------------------------------------
Controla el inicio de sesión de AISANKA.


Incluye:
- Acceso de estudiantes.
- Guardar el estudiante activo.
- Guardar la condición educativa.
- Crear y conservar el progreso individual.
- Redirigir a mundo.html después del login.
- Mostrar y ocultar la contraseña.
- Mostrar mensajes de error amigables.
*/


const MOCK_USERS = [


{
    correo: "marlinggranados@gmail.com",
    password: "MINED2026*",
    estudiante: "autismo",
    nombre: "Marling"
},

{
    correo: "hectorcruz@gmail.com",
    password: "MINED2026*",
    estudiante: "visual",
    nombre: "Héctor"
},

{
    correo: "marbelltreminio@gmail.com",
    password: "MINED2026*",
    estudiante: "auditivo",
    nombre: "Marbell"
},

{
    correo: "joseherrera@gmail.com",
    password: "MINED2026*",
    estudiante: "tdah",
    nombre: "José"
},

{
    correo: "bengeesoza@gmail.com",
    password: "MINED2026*",
    estudiante: "neurotipico",
    nombre: "Bengee"
}


];


const formularioLogin = document.getElementById("formularioLogin");
const campoCorreo = document.getElementById("correo");
const campoContrasena = document.getElementById("contrasena");

const botonMostrar = document.getElementById("botonMostrar");
const iconoOjo = document.getElementById("iconoOjo");

const ventanaError = document.getElementById("ventanaError");
const botonCerrar = document.getElementById("botonCerrar");
const botonEntendido = document.getElementById("botonEntendido");

const tituloError = document.getElementById("tituloError");
const mensajeError = document.getElementById("mensajeError");


if (!formularioLogin) {
console.error("No se encontró el formulario #formularioLogin");
}

if (!campoCorreo) {
console.error("No se encontró el campo #correo");
}

if (!campoContrasena) {
console.error("No se encontró el campo #contrasena");
}


if (botonMostrar && campoContrasena) {


botonMostrar.addEventListener("click", function (evento) {

    // Evita que el botón intente enviar el formulario.
    evento.preventDefault();

    if (campoContrasena.type === "password") {

        campoContrasena.type = "text";

        if (iconoOjo) {
            iconoOjo.classList.remove("fa-eye");
            iconoOjo.classList.add("fa-eye-slash");
        }

        botonMostrar.setAttribute(
            "aria-label",
            "Ocultar contraseña"
        );

        botonMostrar.setAttribute(
            "title",
            "Ocultar contraseña"
        );

    } else {

        campoContrasena.type = "password";

        if (iconoOjo) {
            iconoOjo.classList.remove("fa-eye-slash");
            iconoOjo.classList.add("fa-eye");
        }

        botonMostrar.setAttribute(
            "aria-label",
            "Mostrar contraseña"
        );

        botonMostrar.setAttribute(
            "title",
            "Mostrar contraseña"
        );

    }

});


}


if (formularioLogin) {


formularioLogin.addEventListener("submit", function (evento) {


    evento.preventDefault();



    const correoIngresado =
        campoCorreo.value.trim().toLowerCase();

    const contrasenaIngresada =
        campoContrasena.value;



    if (correoIngresado === "") {

        mostrarError(
            "¡Falta tu correo!",
            "Escribe tu correo electrónico para poder entrar a AISANKA."
        );

        campoCorreo.focus();

        return;
    }


    if (contrasenaIngresada === "") {

        mostrarError(
            "¡Falta tu contraseña!",
            "Escribe tu contraseña para continuar."
        );

        campoContrasena.focus();

        return;
    }



    const estudianteEncontrado =
        MOCK_USERS.find(function (usuario) {

            return (
                usuario.correo.toLowerCase() ===
                correoIngresado
            );

        });



    if (!estudianteEncontrado) {

        mostrarError(
            "Correo no encontrado",
            "No encontramos este correo en AISANKA. Revisa que esté escrito correctamente."
        );

        campoCorreo.focus();

        return;
    }



    if (
        estudianteEncontrado.password !==
        contrasenaIngresada
    ) {

        mostrarError(
            "Contraseña incorrecta",
            "La contraseña no coincide. Inténtalo nuevamente."
        );

        campoContrasena.focus();

        return;
    }



    iniciarSesionEstudiante(
        estudianteEncontrado
    );

});


}


function iniciarSesionEstudiante(usuario) {


const sesionEstudiante = {

    tipo: "estudiante",

    nombre: usuario.nombre,

    correo: usuario.correo,

    estudiante: usuario.estudiante

};



localStorage.setItem(
    "usuarioAISANKA",
    JSON.stringify(sesionEstudiante)
);



inicializarProgreso(usuario);



localStorage.setItem(
    "condicionAISANKA",
    usuario.estudiante
);



window.location.href = "mundo.html";


}


function inicializarProgreso(usuario) {


const identificador =
    obtenerIdentificadorUsuario(
        usuario.correo
    );


const claveProgreso =
    "progresoAISANKA_" + identificador;


const progresoExistente =
    localStorage.getItem(
        claveProgreso
    );




if (progresoExistente) {
    return;
}


const progresoInicial = {

    estudiante: usuario.estudiante,

    correo: usuario.correo,

    mundoCompletado: false,

    nivelActual: 1,

    nivelesCompletados: [],

    ejerciciosCompletados: [],

    puntos: 0,

    estrellas: 0,

    porcentaje: 0,

    ultimoAcceso: new Date().toISOString()

};


localStorage.setItem(
    claveProgreso,
    JSON.stringify(progresoInicial)
);


}


function obtenerIdentificadorUsuario(correo) {


return correo
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "_");


}

function mostrarError(titulo, mensaje) {


if (!ventanaError) {
    alert(titulo + "\n\n" + mensaje);
    return;
}

if (tituloError) {
    tituloError.textContent = titulo;
}

if (mensajeError) {
    mensajeError.textContent = mensaje;
}

ventanaError.classList.add("activo");


}


function cerrarVentanaError() {


if (ventanaError) {
    ventanaError.classList.remove("activo");
}


}


if (botonEntendido) {


botonEntendido.addEventListener(
    "click",
    cerrarVentanaError
);


}


if (botonCerrar) {


botonCerrar.addEventListener(
    "click",
    cerrarVentanaError
);


}

if (ventanaError) {


ventanaError.addEventListener(
    "click",
    function (evento) {

        if (
            evento.target === ventanaError
        ) {

            cerrarVentanaError();

        }

    }
);


}


document.addEventListener(
"keydown",
function (evento) {


    if (
        evento.key === "Escape" &&
        ventanaError &&
        ventanaError.classList.contains("activo")
    ) {

        cerrarVentanaError();

    }

}


);
