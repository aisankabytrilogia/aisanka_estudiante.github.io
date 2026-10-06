/* AISANKA — Lógica interactiva de mundos, navegación, acceso, perfil, avatares, modales y gestos. */

const MUNDOS = [
    {
        id: 1,
        nombre: "Aprendamos a saludar",
        imagen: "images/mundo1.png",
        fondo: "fondo-mundo-1",
        habilitado: true,
        descripcion:
            "Aprende diferentes formas de saludar y conocer a otras personas."
    },

    {
        id: 2,
        nombre: "Miembros de la familia",
        imagen: "images/mundo2.png",
        fondo: "fondo-mundo-2",
        habilitado: false,
        descripcion:
            "Conoce y aprende sobre los diferentes miembros de una familia."
    },

    {
        id: 3,
        nombre: "Colores",
        imagen: "images/mundo3.png",
        fondo: "fondo-mundo-3",
        habilitado: false,
        descripcion:
            "Descubre los colores y aprende a reconocerlos."
    }
];

const fondoMundos =
    document.getElementById("fondoMundos");

const nombreEstudiante =
    document.getElementById("nombreEstudiante");

const avatarEncabezado =
    document.getElementById("avatarEncabezado");

const imagenMundo =
    document.getElementById("imagenMundo");

const zonaImagenMundo =
    document.getElementById("zonaImagenMundo");

const nombreMundo =
    document.getElementById("nombreMundo");

const descripcionMundo =
    document.getElementById("descripcionMundo");

const tarjetaMundo =
    document.getElementById("tarjetaMundo");

const candadoMundo =
    document.getElementById("candadoMundo");

const etiquetaEstado =
    document.getElementById("etiquetaEstado");

const botonEntrarMundo =
    document.getElementById("botonEntrarMundo");

const textoBotonMundo =
    document.getElementById("textoBotonMundo");

const textoNumeroMundo =
    document.getElementById("textoNumeroMundo");

const numeroTarjeta =
    document.getElementById("numeroTarjeta");

const botonAnterior =
    document.getElementById("botonAnterior");

const botonSiguiente =
    document.getElementById("botonSiguiente");

const indicadores =
    document.querySelectorAll(".indicador");

const botonPerfil =
    document.getElementById("botonPerfil");

const indicadorInteraccion =
    document.getElementById(
        "indicadorInteraccion"
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

const botonesAvatar =
    document.querySelectorAll(
        ".avatar-opcion"
    );

const botonCerrarSesion =
    document.getElementById(
        "botonCerrarSesion"
    );

let mundoActual = 0;

let estudianteActivo = null;

let inicioToqueX = 0;

let inicioToqueY = 0;

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
            "Error leyendo la sesión:",
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

function iniciarPagina() {

    estudianteActivo =
        obtenerSesion();

    if (!estudianteActivo) {
        return;
    }

    nombreEstudiante.textContent =
        estudianteActivo.nombre ||
        "Estudiante";

    cargarPerfil();

    mostrarMundo(0);
}

function obtenerIdentificadorUsuario(
    correo
) {

    return String(correo || "")
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
        localStorage.getItem(clave);

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

function guardarPerfil(perfil) {

    const clave =
        obtenerClavePerfil();

    if (!clave) {
        return;
    }

    localStorage.setItem(
        clave,
        JSON.stringify(perfil)
    );
}

function cargarPerfil() {

    const perfil =
        obtenerPerfil();

    if (!perfil) {
        return;
    }

    const rutaAvatar =
        "images/" +
        (
            perfil.avatar ||
            "perfil_guardabarranco.png"
        );

    avatarEncabezado.src =
        rutaAvatar;

    avatarPerfil.src =
        rutaAvatar;

    nombrePerfil.textContent =
        perfil.nombre ||
        estudianteActivo.nombre ||
        "Estudiante";

    correoPerfil.textContent =
        perfil.correo ||
        estudianteActivo.correo ||
        "";

    escuelaPerfil.textContent =
        perfil.escuela ||
        "CPACS";

    docentePerfil.textContent =
        perfil.docente ||
        "Henrry Montes";

    gradoPerfil.textContent =
        perfil.grado ||
        "6.º grado";

    if (ubicacionPerfil) {

        ubicacionPerfil.textContent =
            perfil.ubicacion ||
            "Jinotega";
    }

    if (zonaPerfil) {

        zonaPerfil.textContent =
            perfil.zona ||
            "Área urbana";
    }

    heroesPerfil.textContent =
        perfil.heroesColeccionados ||
        0;

    botonesAvatar.forEach(
        function(boton) {

            const avatar =
                boton.dataset.avatar;

            boton.classList.toggle(
                "seleccionado",
                avatar === perfil.avatar
            );
        }
    );
}

function mostrarMundo(indice) {

    if (indice < 0) {

        indice =
            MUNDOS.length - 1;
    }

    if (indice >= MUNDOS.length) {

        indice = 0;
    }

    mundoActual =
        indice;

    const mundo =
        MUNDOS[mundoActual];

    tarjetaMundo.classList.remove(
        "animando"
    );

    void tarjetaMundo.offsetWidth;

    tarjetaMundo.classList.add(
        "animando"
    );

    imagenMundo.classList.remove(
        "imagen-entrada"
    );

    void imagenMundo.offsetWidth;

    imagenMundo.classList.add(
        "imagen-entrada"
    );

    imagenMundo.src =
        mundo.imagen;

    imagenMundo.alt =
        mundo.nombre;

    nombreMundo.textContent =
        mundo.nombre;

    descripcionMundo.textContent =
        mundo.descripcion;

    numeroTarjeta.textContent =
        String(mundo.id).padStart(
            2,
            "0"
        );

    textoNumeroMundo.textContent =
        mundo.id;

    fondoMundos.className =
        "fondo-mundos";

    fondoMundos.classList.add(
        mundo.fondo
    );

    if (mundo.habilitado) {

        tarjetaMundo.classList.remove(
            "bloqueado"
        );

        etiquetaEstado.className =
            "etiqueta-estado";

        etiquetaEstado.innerHTML =
            `
                <i class="fa-solid fa-unlock"></i>
                <span>Disponible</span>
            `;

        textoBotonMundo.textContent =
            "COMENZAR MUNDO " +
            mundo.id;

        botonEntrarMundo.setAttribute(
            "aria-label",
            "Comenzar mundo " +
            mundo.id
        );

        zonaImagenMundo.setAttribute(
            "aria-label",
            "Entrar al mundo " +
            mundo.id
        );

        indicadorInteraccion.innerHTML =
            `
                <i class="fa-solid fa-arrow-pointer"></i>
                <span>Explorar</span>
            `;

    } else {

        tarjetaMundo.classList.add(
            "bloqueado"
        );

        etiquetaEstado.className =
            "etiqueta-estado bloqueado";

        etiquetaEstado.innerHTML =
            `
                <i class="fa-solid fa-lock"></i>
                <span>Bloqueado</span>
            `;

        textoBotonMundo.textContent =
            "VER MUNDO " +
            mundo.id;

        botonEntrarMundo.setAttribute(
            "aria-label",
            "Ver información del mundo bloqueado"
        );

        zonaImagenMundo.setAttribute(
            "aria-label",
            "Ver información del mundo bloqueado"
        );

        indicadorInteraccion.innerHTML =
            `
                <i class="fa-solid fa-lock"></i>
                <span>Ver información</span>
            `;
    }

    actualizarIndicadores();
}

function actualizarIndicadores() {

    indicadores.forEach(
        function(indicador, indice) {

            const activo =
                indice === mundoActual;

            indicador.classList.toggle(
                "activo",
                activo
            );

            indicador.setAttribute(
                "aria-current",
                activo
                    ? "true"
                    : "false"
            );
        }
    );
}

function siguienteMundo() {

    mostrarMundo(
        mundoActual + 1
    );
}

function anteriorMundo() {

    mostrarMundo(
        mundoActual - 1
    );
}

function entrarAlMundo() {

    const mundo =
        MUNDOS[mundoActual];

    if (!mundo) {
        return;
    }

    if (!mundo.habilitado) {

        mostrarModalBloqueado(
            mundo
        );

        return;
    }

    if (mundo.id === 1) {

        window.location.href =
            "nivel.html";
    }
}

function mostrarModalBloqueado(
    mundo
) {

    mensajeBloqueado.textContent =
        'El mundo "' +
        mundo.nombre +
        '" todavía no ha sido habilitado por tu docente.';

    modalBloqueado.classList.add(
        "activo"
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

function cerrarModalMundo() {

    modalBloqueado.classList.remove(
        "activo"
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

    document.body.classList.add(
        "modal-abierto"
    );

    setTimeout(
        function() {

            cerrarModalPerfil.focus();

        },
        100
    );
}

function cerrarPerfil() {

    modalPerfil.classList.remove(
        "activo"
    );

    document.body.classList.remove(
        "modal-abierto"
    );
}

function cambiarAvatar(
    boton
) {

    const nuevoAvatar =
        boton.dataset.avatar;

    const perfil =
        obtenerPerfil();

    if (!perfil) {
        return;
    }

    perfil.avatar =
        nuevoAvatar;

    guardarPerfil(
        perfil
    );

    const ruta =
        "images/" +
        nuevoAvatar;

    avatarEncabezado.src =
        ruta;

    avatarPerfil.src =
        ruta;

    botonesAvatar.forEach(
        function(opcion) {

            opcion.classList.remove(
                "seleccionado"
            );
        }
    );

    boton.classList.add(
        "seleccionado"
    );
}

function cerrarSesion() {

    localStorage.removeItem(
        "usuarioAISANKA"
    );

    localStorage.removeItem(
        "condicionAISANKA"
    );

    window.location.href =
        "index.html";
}

function manejarTeclado(
    evento
) {

    if (
        modalBloqueado.classList.contains(
            "activo"
        )
    ) {

        if (
            evento.key === "Escape"
        ) {

            cerrarModalMundo();
        }

        return;
    }

    if (
        modalPerfil.classList.contains(
            "activo"
        )
    ) {

        if (
            evento.key === "Escape"
        ) {

            cerrarPerfil();
        }

        return;
    }

    if (
        evento.key === "ArrowRight"
    ) {

        siguienteMundo();
    }

    if (
        evento.key === "ArrowLeft"
    ) {

        anteriorMundo();
    }

    if (
        evento.key === "Enter" &&
        document.activeElement ===
            zonaImagenMundo
    ) {

        entrarAlMundo();
    }
}

function iniciarGestos() {

    tarjetaMundo.addEventListener(
        "touchstart",
        function(evento) {

            inicioToqueX =
                evento.changedTouches[0]
                    .screenX;

            inicioToqueY =
                evento.changedTouches[0]
                    .screenY;
        },
        {
            passive: true
        }
    );

    tarjetaMundo.addEventListener(
        "touchend",
        function(evento) {

            const finalX =
                evento.changedTouches[0]
                    .screenX;

            const finalY =
                evento.changedTouches[0]
                    .screenY;

            const diferenciaX =
                finalX -
                inicioToqueX;

            const diferenciaY =
                finalY -
                inicioToqueY;

            if (
                Math.abs(
                    diferenciaX
                ) < 45
            ) {
                return;
            }

            if (
                Math.abs(
                    diferenciaX
                ) <
                Math.abs(
                    diferenciaY
                )
            ) {
                return;
            }

            if (
                diferenciaX < 0
            ) {

                siguienteMundo();

            } else {

                anteriorMundo();
            }
        },
        {
            passive: true
        }
    );
}

function iniciarEventos() {

    botonAnterior.addEventListener(
        "click",
        anteriorMundo
    );

    botonSiguiente.addEventListener(
        "click",
        siguienteMundo
    );

    botonEntrarMundo.addEventListener(
        "click",
        entrarAlMundo
    );

    zonaImagenMundo.addEventListener(
        "click",
        entrarAlMundo
    );

    zonaImagenMundo.addEventListener(
        "keydown",
        function(evento) {

            if (
                evento.key === "Enter" ||
                evento.key === " "
            ) {

                evento.preventDefault();

                entrarAlMundo();
            }
        }
    );

    botonPerfil.addEventListener(
        "click",
        abrirPerfil
    );

    cerrarModalBloqueado.addEventListener(
        "click",
        cerrarModalMundo
    );

    botonEntendidoBloqueado.addEventListener(
        "click",
        cerrarModalMundo
    );

    cerrarModalPerfil.addEventListener(
        "click",
        cerrarPerfil
    );

    botonCerrarSesion.addEventListener(
        "click",
        cerrarSesion
    );

    modalBloqueado.addEventListener(
        "click",
        function(evento) {

            if (
                evento.target ===
                modalBloqueado
            ) {

                cerrarModalMundo();
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

    indicadores.forEach(
        function(indicador) {

            indicador.addEventListener(
                "click",
                function() {

                    const indice =
                        Number(
                            indicador.dataset
                                .mundo
                        );

                    mostrarMundo(
                        indice
                    );
                }
            );
        }
    );

    botonesAvatar.forEach(
        function(boton) {

            boton.addEventListener(
                "click",
                function() {

                    cambiarAvatar(
                        boton
                    );
                }
            );
        }
    );

    document.addEventListener(
        "keydown",
        manejarTeclado
    );

    iniciarGestos();
}

iniciarEventos();

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