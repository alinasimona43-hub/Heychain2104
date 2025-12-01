/* ============================
      SISTEMA DE USUARIOS
   ============================ */

// Registrar usuario nuevo
function registrarUsuario() {
    const usuario = document.getElementById("reg-usuario").value.trim();
    const pass = document.getElementById("reg-pass").value.trim();
    const foto = document.getElementById("reg-foto").value.trim() || "default.png";

    if (usuario === "" || pass === "") {
        shake("register-box");
        return;
    }

    if (localStorage.getItem("user_" + usuario)) {
        alert("Ese nombre de usuario ya existe.");
        return;
    }

    const datos = {
        nombre: usuario,
        pass: pass,
        foto: foto,
        puntos: 0,
        juegos: {}
    };

    localStorage.setItem("user_" + usuario, JSON.stringify(datos));

    alert("Usuario registrado correctamente.");
    mostrarLogin();
}

// Iniciar sesión
function loginUsuario() {
    const usuario = document.getElementById("log-usuario").value.trim();
    const pass = document.getElementById("log-pass").value.trim();

    const datos = JSON.parse(localStorage.getItem("user_" + usuario));

    if (!datos || datos.pass !== pass) {
        shake("login-box");
        return;
    }

    localStorage.setItem("sesion", usuario);
    window.location.href = "index.html";
}

// Cerrar sesión
function logoutUsuario() {
    localStorage.removeItem("sesion");
    window.location.href = "login.html";
}

// Cargar usuario en el panel superior
function cargarUsuarioActual() {
    const usuarioId = localStorage.getItem("sesion");
    if (!usuarioId) return;

    const data = JSON.parse(localStorage.getItem("user_" + usuarioId));
    if (!document.getElementById("user-nombre")) return;

    document.getElementById("user-nombre").textContent = data.nombre;
    document.getElementById("user-puntos").textContent = "⭐ " + data.puntos;
    document.getElementById("user-foto").src = data.foto;
}

/* ============================
       SUMAR PUNTOS AUTOMÁTICOS
   ============================ */

setInterval(() => {
    const usuarioId = localStorage.getItem("sesion");
    if (!usuarioId) return;

    let data = JSON.parse(localStorage.getItem("user_" + usuarioId));
    data.puntos += 1;
    localStorage.setItem("user_" + usuarioId, JSON.stringify(data));

    const userPuntos = document.getElementById("user-puntos");
    if(userPuntos) userPuntos.textContent = "⭐ " + data.puntos;
}, 30000);

/* ============================
       INTERFAZ LOGIN/REGISTRO
   ============================ */

function mostrarLogin() {
    document.getElementById("login-box").style.display = "block";
    document.getElementById("register-box").style.display = "none";
}

function mostrarRegistro() {
    document.getElementById("login-box").style.display = "none";
    document.getElementById("register-box").style.display = "block";
}

function shake(id) {
    const box = document.getElementById(id);
    box.classList.add("shake");
    setTimeout(() => box.classList.remove("shake"), 500);
}

/* ============================
       ANIMACIÓN DE PARTÍCULAS
   ============================ */

const canvas = document.getElementById("fondo");
if (canvas) {
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particulas = [];
    for (let i = 0; i < 100; i++) {
        particulas.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 3 + 1,
            dx: Math.random() * 2 - 1,
            dy: Math.random() * 2 - 1,
        });
    }

    function animar() {
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particulas.forEach((p) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = "white";
            ctx.fill();

            p.x += p.dx;
            p.y += p.dy;

            if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        });

        requestAnimationFrame(animar);
    }

    animar();

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

/* ============================
         TÍTULO RGB
   ============================ */

const titulo = document.getElementById("titulo");
if (titulo) {
    let hue = 0;
    setInterval(() => {
        titulo.style.color = `hsl(${hue}, 100%, 50%)`;
        hue = (hue + 1) % 360;
    }, 50);
}

/* ============================
       MODAL PERFIL + SONIDO
   ============================ */

const sonidoClick = new Audio("click.mp3"); // sonido al hacer click en avatar

const userFoto = document.getElementById("user-foto");
if(userFoto){
    userFoto.addEventListener("click", ()=>{
        sonidoClick.play();

        const modal = document.getElementById("perfil-modal");
        modal.style.display = "flex";

        const userId = localStorage.getItem("sesion");
        if(!userId) return;
        const data = JSON.parse(localStorage.getItem("user_" + userId));

        // Datos del modal
        document.getElementById("perfil-foto-grande").src = data.foto || "default.png";
        document.getElementById("perfil-nombre").textContent = data.nombre;
        document.getElementById("perfil-estrellas").textContent = "⭐ " + data.puntos;

        // Juegos más jugados
        const juegosPanel = document.getElementById("juegos-mas-jugados");
        juegosPanel.innerHTML = "";
        if(data.juegos){
            Object.entries(data.juegos).forEach(([juego, minutos])=>{
                const div = document.createElement("div");
                div.classList.add("juego-item");
                div.innerHTML = `
                    <img src="thumb-${juego}.png" alt="${juego}">
                    <div>
                        <div>${juego}</div>
                        <div>He jugado ${minutos} minutos</div>
                    </div>
                `;
                juegosPanel.appendChild(div);
            });
        }
    });
}

// Cerrar modal
const cerrarPerfil = document.getElementById("cerrar-perfil");
if(cerrarPerfil){
    cerrarPerfil.addEventListener("click", ()=>{
        document.getElementById("perfil-modal").style.display="none";
    });
}
