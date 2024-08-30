document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('progress');
    progressBar.style.width = '100%';

    // Después de 4 segundos, redirige a la segunda pantalla
    setTimeout(() => {
        window.location.href = 'second.html';
    }, 4000);
});
