/* ============================================================
   AISANKA — MAPA DE NIVELES
   nivel.js

   Funciones:

   - Recuperar estudiante activo.
   - Recuperar perfil.
   - Mostrar información del estudiante.
   - Cambiar avatar.
   - Guardar avatar seleccionado.
   - Controlar niveles.
   - Redirigir según condición educativa.
   - Bloquear niveles 2 y 3.
   - Mostrar modales.
   - Volver a mundo.html.
   - Cerrar sesión.
============================================================ */



const MUNDO_ACTUAL = {

    id: 1,

    nombre:
        "Aprendamos a saludar",

    descripcion:
        "Aprende diferentes formas de saludar y conocer a otras personas."

};



const AVATARES = {

    gueguense: {
        archivo: "perfil_gueguense.png",
        nombre: "Güegüense"
    },

    guardabarranco: {
        archivo: "perfil_guardabarranco.png",
        nombre: "Guardabarranco"
    },

    gigantona: {
        archivo: "perfil_gigantona.png",
        nombre: "Gigantona"
    }

};


const RUTAS_ESTUDIANTE = {

    autismo:
        "autismo.html",

    tdah:
        "TDHA.html",

    auditivo:
        "auditivo.html",

    visual:
        "visual.html",

    neurotipico:
        "neuritipico.html"

};



const botonVolver =
    document.getElementById(
        "botonVolver"
    );


const botonPerfil =
    document.getElementById(
        "botonPerfil"
    );


const nombreEstudiante =
    document.getElementById(
        "nombreEstudiante"
    );


const avatarEncabezado =
    document.getElementById(
        "avatarEncabezado"
    );



const modalBloqueado =
    document.getElementById(
        "modalBloqueado"
    );


const cerrarModalBloqueado =
    document.getElementById(
        "cerrarModalBloqueado"
    );


const botonEntendidoBloqueado =
    document.getElementById(
        "botonEntendidoBloqueado"
    );


const tituloBloqueado =
    document.getElementById(
        "tituloBloqueado"
    );


const mensajeBloqueado =
    document.getElementById(
        "mensajeBloqueado"
    );


const modalPerfil =
    document.getElementById(
        "modalPerfil"
    );


const cerrarModalPerfil =
    document.getElementById(
        "cerrarModalPerfil"
    );


const avatarPerfil =
    document.getElementById(
        "avatarPerfil"
    );


const nombrePerfil =
    document.getElementById(
        "nombrePerfil"
    );


const correoPerfil =
    document.getElementById(
        "correoPerfil"
    );


const escuelaPerfil =
    document.getElementById(
        "escuelaPerfil"
    );


const docentePerfil =
    document.getElementById(
        "docentePerfil"
    );


const gradoPerfil =
    document.getElementById(
        "gradoPerfil"
    );


const ubicacionPerfil =
    document.getElementById(
        "ubicacionPerfil"
    );


const zonaPerfil =
    document.getElementById(
        "zonaPerfil"
    );


const heroesPerfil =
    document.getElementById(
        "heroesPerfil"
    );


const botonCerrarSesion =
    document.getElementById(
        "botonCerrarSesion"
    );



const opcionesAvatar =
    document.querySelectorAll(
        ".avatar-opcion"
    );


const niveles =
    document.querySelectorAll(
        ".nivel"
    );



let estudianteActivo = null;



let avatarAnterior = null;



function obtenerSesion() {

    const sesionGuardada =
        localStorage.getItem(
            "usuarioAISANKA"
        );


    if (!sesionGuardada) {

        window.location.href =
            "index.html";

        return null;

    }


    try {

        return JSON.parse(
            sesionGuardada
        );

    } catch (error) {

        console.error(
            "Error leyendo sesión:",
            error
        );


        localStorage.removeItem(
            "usuarioAISANKA"
        );


        window.location.href =
            "index.html";

        return null;

    }

}



function obtenerIdentificadorUsuario(
    correo
) {

    return String(
        correo || ""
    )
        .toLowerCase()
        .replace(
            /[^a-z0-9]/g,
            "_"
        );

}



function obtenerClavePerfil() {

    if (
        !estudianteActivo ||
        !estudianteActivo.correo
    ) {

        return null;

    }


    const identificador =
        obtenerIdentificadorUsuario(
            estudianteActivo.correo
        );


    return (
        "perfilAISANKA_" +
        identificador
    );

}


function obtenerPerfil() {

    const clave =
        obtenerClavePerfil();


    if (!clave) {

        return null;

    }


    const perfilGuardado =
        localStorage.getItem(
            clave
        );


    if (perfilGuardado) {

        try {

            return JSON.parse(
                perfilGuardado
            );

        } catch (error) {

            console.error(
                "Error leyendo perfil:",
                error
            );

        }

    }



    const perfilInicial = {

        nombre:
            estudianteActivo.nombre ||
            "Estudiante",

        correo:
            estudianteActivo.correo ||
            "",

        escuela:
            "CPACS",

        docente:
            "Henrry Montes",

        grado:
            "6.º grado",

        seccion:
            "A",

        ubicacion:
            "Jinotega",

        zona:
            "Área urbana",

        heroesColeccionados:
            0,

        avatar:
            "perfil_guardabarranco.png"

    };


    localStorage.setItem(

        clave,

        JSON.stringify(
            perfilInicial
        )

    );


    return perfilInicial;

}



function guardarPerfil(
    perfil
) {

    const clave =
        obtenerClavePerfil();


    if (!clave) {

        return false;

    }


    try {

        localStorage.setItem(

            clave,

            JSON.stringify(
                perfil
            )

        );

        return true;

    } catch (error) {

        console.error(
            "No se pudo guardar el perfil:",
            error
        );

        return false;

    }

}



function obtenerRutaAvatar(
    archivo
) {

    const avatar =
        archivo ||
        AVATARES.guardabarranco.archivo;


    return (
        "images/" +
        avatar
    );

}



function cargarPerfil() {

    const perfil =
        obtenerPerfil();


    if (!perfil) {

        return;

    }


    const nombre =

        perfil.nombre ||

        estudianteActivo.nombre ||

        "Estudiante";


    const rutaAvatar =
        obtenerRutaAvatar(
            perfil.avatar
        );


    avatarAnterior =
        perfil.avatar ||
        AVATARES.guardabarranco.archivo;



    avatarEncabezado.src =
        rutaAvatar;


    avatarEncabezado.alt =
        "Avatar de " +
        nombre;


    nombreEstudiante.textContent =
        nombre;


    /* ========================================================
       PERFIL
    ======================================================== */

    avatarPerfil.src =
        rutaAvatar;


    avatarPerfil.alt =
        "Avatar de " +
        nombre;


    nombrePerfil.textContent =
        nombre;


    correoPerfil.textContent =

        perfil.correo ||

        estudianteActivo.correo ||

        "—";


    escuelaPerfil.textContent =

        perfil.escuela ||

        "CPACS";


    docentePerfil.textContent =

        perfil.docente ||

        "Henrry Montes";


    gradoPerfil.textContent =

        perfil.grado ||

        "6.º grado";


    ubicacionPerfil.textContent =

        perfil.ubicacion ||

        "Jinotega";


    zonaPerfil.textContent =

        perfil.zona ||

        "Área urbana";


    heroesPerfil.textContent =

        Number(
            perfil.heroesColeccionados
        ) || 0;


    actualizarSelectorAvatar(
        perfil.avatar
    );

}



function actualizarSelectorAvatar(
    avatarActual
) {

    opcionesAvatar.forEach(

        function(opcion) {

            const avatar =
                opcion.dataset.avatar;


            const seleccionado =
                avatar === avatarActual;


            opcion.classList.toggle(
                "seleccionado",
                seleccionado
            );

        }

    );

}



function cambiarAvatar(
    nuevoAvatar
) {

    if (!nuevoAvatar) {

        return;

    }


    const perfil =
        obtenerPerfil();


    if (!perfil) {

        return;

    }


    const avatarPermitido =
        Object.values(
            AVATARES
        ).some(

            function(avatar) {

                return (
                    avatar.archivo ===
                    nuevoAvatar
                );

            }

        );


    if (!avatarPermitido) {

        console.warn(
            "Avatar no permitido:",
            nuevoAvatar
        );

        return;

    }



    if (
        perfil.avatar ===
        nuevoAvatar
    ) {

        return;

    }


    perfil.avatar =
        nuevoAvatar;


    if (
        guardarPerfil(
            perfil
        )
    ) {


        cargarPerfil();


        

        animarCambioAvatar();

    }

}


function animarCambioAvatar() {

    avatarPerfil.classList.remove(
        "avatar-cambiando"
    );


    avatarEncabezado.classList.remove(
        "avatar-cambiando"
    );



    void avatarPerfil.offsetWidth;


    avatarPerfil.classList.add(
        "avatar-cambiando"
    );


    avatarEncabezado.classList.add(
        "avatar-cambiando"
    );


    setTimeout(

        function() {

            avatarPerfil.classList.remove(
                "avatar-cambiando"
            );

            avatarEncabezado.classList.remove(
                "avatar-cambiando"
            );

        },

        600

    );

}


function obtenerCondicionEstudiante() {


    if (
        estudianteActivo &&
        estudianteActivo.estudiante
    ) {

        return estudianteActivo
            .estudiante
            .toLowerCase()
            .trim();

    }



    const condicion =
        localStorage.getItem(
            "condicionAISANKA"
        );


    if (condicion) {

        return condicion
            .toLowerCase()
            .trim();

    }


    return null;

}


function obtenerRutaEstudiante() {

    const condicion =
        obtenerCondicionEstudiante();


    if (!condicion) {

        return null;

    }


    return (
        RUTAS_ESTUDIANTE[
            condicion
        ] || null
    );

}



function entrarNivel(
    numeroNivel
) {


    if (
        numeroNivel === 1
    ) {

        const ruta =
            obtenerRutaEstudiante();


        if (!ruta) {

            mostrarModalBloqueado(

                "Perfil no identificado",

                "No pudimos identificar el perfil educativo de este estudiante. Regresa al inicio e inicia sesión nuevamente."

            );

            return;

        }


        const nivel =
            document.querySelector(
                '[data-nivel="1"]'
            );


        if (nivel) {

            nivel.classList.add(
                "nivel-seleccionado"
            );

        }


        setTimeout(

            function() {

                window.location.href =
                    ruta;

            },

            320

        );


        return;

    }



    mostrarModalBloqueado(

        "Nivel bloqueado",

        "El nivel " +
        numeroNivel +
        " todavía no ha sido habilitado por tu docente."

    );

}



function mostrarModalBloqueado(
    titulo,
    mensaje
) {

    tituloBloqueado.textContent =
        titulo;


    mensajeBloqueado.textContent =
        mensaje;


    modalBloqueado.classList.add(
        "activo"
    );


    modalBloqueado.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-abierto"
    );


    setTimeout(

        function() {

            cerrarModalBloqueado.focus();

        },

        120

    );

}


function cerrarBloqueado() {

    modalBloqueado.classList.remove(
        "activo"
    );


    modalBloqueado.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-abierto"
    );

}



function abrirPerfil() {

    cargarPerfil();


    modalPerfil.classList.add(
        "activo"
    );


    modalPerfil.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-abierto"
    );


    setTimeout(

        function() {

            cerrarModalPerfil.focus();

        },

        120

    );

}



function cerrarPerfil() {

    modalPerfil.classList.remove(
        "activo"
    );


    modalPerfil.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-abierto"
    );

}



function cerrarSesion() {

    const confirmar =
        window.confirm(
            "¿Quieres cerrar tu sesión de AISANKA?"
        );


    if (!confirmar) {

        return;

    }


    localStorage.removeItem(
        "usuarioAISANKA"
    );


    localStorage.removeItem(
        "condicionAISANKA"
    );


    window.location.href =
        "index.html";

}


function configurarNiveles() {

    niveles.forEach(

        function(nivel) {

            const numero =
                Number(
                    nivel.dataset.nivel
                );


            nivel.addEventListener(

                "click",

                function() {

                    entrarNivel(
                        numero
                    );

                }

            );



            nivel.addEventListener(

                "keydown",

                function(evento) {

                    if (
                        evento.key ===
                        "Enter" ||

                        evento.key ===
                        " "
                    ) {

                        evento.preventDefault();

                        entrarNivel(
                            numero
                        );

                    }

                }

            );

        }

    );

}


function configurarAvatares() {

    opcionesAvatar.forEach(

        function(opcion) {

            opcion.addEventListener(

                "click",

                function() {

                    const avatar =
                        opcion.dataset.avatar;


                    cambiarAvatar(
                        avatar
                    );

                }

            );



            opcion.addEventListener(

                "keydown",

                function(evento) {

                    if (
                        evento.key ===
                        "Enter" ||

                        evento.key ===
                        " "
                    ) {

                        evento.preventDefault();

                        const avatar =
                            opcion.dataset.avatar;


                        cambiarAvatar(
                            avatar
                        );

                    }

                }

            );

        }

    );

}



function volverAMundo() {

    window.location.href =
        "mundo.html";

}


function manejarTeclado(
    evento
) {

    if (
        evento.key !==
        "Escape"
    ) {

        return;

    }


    if (
        modalBloqueado.classList.contains(
            "activo"
        )
    ) {

        cerrarBloqueado();

        return;

    }


    if (
        modalPerfil.classList.contains(
            "activo"
        )
    ) {

        cerrarPerfil();

    }

}


function configurarModales() {

    modalBloqueado.addEventListener(

        "click",

        function(evento) {

            if (
                evento.target ===
                modalBloqueado
            ) {

                cerrarBloqueado();

            }

        }

    );


    modalPerfil.addEventListener(

        "click",

        function(evento) {

            if (
                evento.target ===
                modalPerfil
            ) {

                cerrarPerfil();

            }

        }

    );

}



function iniciarEventos() {

    botonVolver.addEventListener(
        "click",
        volverAMundo
    );


    botonPerfil.addEventListener(
        "click",
        abrirPerfil
    );


    cerrarModalBloqueado.addEventListener(
        "click",
        cerrarBloqueado
    );


    botonEntendidoBloqueado.addEventListener(
        "click",
        cerrarBloqueado
    );


    cerrarModalPerfil.addEventListener(
        "click",
        cerrarPerfil
    );


    botonCerrarSesion.addEventListener(
        "click",
        cerrarSesion
    );


    document.addEventListener(
        "keydown",
        manejarTeclado
    );


    configurarNiveles();


    configurarAvatares();


    configurarModales();

}


function iniciarPagina() {

    estudianteActivo =
        obtenerSesion();


    if (!estudianteActivo) {

        return;

    }


    cargarPerfil();


    iniciarEventos();

}



if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        iniciarPagina
    );

} else {

    iniciarPagina();

}