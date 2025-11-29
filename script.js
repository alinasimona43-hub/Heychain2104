// Tu juego de Scratch
const juegos = [
    "https://scratch.mit.edu/projects/1190684640/embed"
];

// Contenedor donde se insertará el juego
const contenedor = document.getElementById("juegos-container");

// Crear el iframe dinámicamente
juegos.forEach(url => {
    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.width = "485";
    iframe.height = "402";
    iframe.allowTransparency = true;
    iframe.frameBorder = "0";
    iframe.scrolling = "no";
    iframe.allowFullscreen = true;

    contenedor.appendChild(iframe);
});

