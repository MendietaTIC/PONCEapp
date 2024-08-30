window.onload = function() {
    var progress = document.getElementById('progress');
    var width = 0;
    var interval = setInterval(function() {
        if (width >= 100) {
            clearInterval(interval);
            window.location.href = "second.html"; // Navega a la segunda pantalla
        } else {
            width++;
            progress.style.width = width + '%';
        }
    }, 40); // 40ms para completar en 4 segundos
};