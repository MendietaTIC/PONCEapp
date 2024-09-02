document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('progress-bar');
    let progress = 0;

    // Configura la barra de progreso para que se llene en 4 segundos
    const duration = 5200; // Duración en milisegundos
    const intervalTime = 50; // Intervalo de actualización en milisegundos
    const increment = (100 / (duration / intervalTime)); // Incremento en porcentaje

    // Inicializa el ancho de la barra de progreso
    progressBar.style.width = '0%';

    // Función para actualizar la barra de progreso
    const interval = setInterval(() => {
        progress += increment;
        progressBar.style.width = `${Math.min(progress, 100)}%`; // Limita el ancho al 100%

        if (progress >= 100) {
            clearInterval(interval); // Detiene el intervalo cuando llega al 100%
            // Redirige a la segunda página
            window.location.href = 'second.html';
        }
    }, intervalTime);
});

