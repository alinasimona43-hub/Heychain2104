// Login básico
function login() {
    const user = document.getElementById('usuario').value;
    const pass = document.getElementById('contrasena').value;
    if(user && pass){
        alert("Bienvenido, " + user + "!");
        document.getElementById('login').style.display = 'none';
    } else {
        alert("Introduce usuario y contraseña");
    }
}

// Título RGB animado
let titulo = document.getElementById("titulo");
let hue = 0;
setInterval(() => {
    titulo.style.color = `hsl(${hue}, 100%, 50%)`;
    hue = (hue + 1) % 360;
}, 50);

// Fondo con partículas
const canvas = document.getElementById("fondo");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particulas = [];
for(let i=0; i<100; i++){
    particulas.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        r: Math.random()*3+1,
        dx: Math.random()*2-1,
        dy: Math.random()*2-1
    });
}

function animar(){
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    particulas.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = "white";
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if(p.x<0||p.x>canvas.width) p.dx*=-1;
        if(p.y<0||p.y>canvas.height) p.dy*=-1;
    });
    requestAnimationFrame(animar);
}
animar();
