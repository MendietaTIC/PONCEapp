document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('progress');
    progressBar.style.width = '100%';

    // Después de 4 segundos, redirige a la segunda pantalla
    setTimeout(() => {
        window.location.href = 'second.html';
    }, 4000);
});

document.addEventListener('DOMContentLoaded', () => {
    const micButton = document.getElementById('mic-button');
    const largeTextbox = document.getElementById('large-textbox');

    // Verifica si la API de SpeechRecognition está disponible
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert('Lo siento, tu navegador no soporta la API de reconocimiento de voz.');
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES'; // Configura el idioma del reconocimiento
    recognition.interimResults = false; // No queremos resultados provisionales

    micButton.addEventListener('click', () => {
        try {
            recognition.start();
        } catch (error) {
            console.error('Error al iniciar el reconocimiento de voz:', error);
            micButton.textContent = 'Error'; // Cambia el texto del botón en caso de error
        }
    });

    recognition.onstart = () => {
        micButton.textContent = 'Escuchando...'; // Cambia el texto del botón mientras escucha
    };

    recognition.onspeechend = () => {
        micButton.textContent = '🎤'; // Cambia el texto del botón después de terminar
        recognition.stop(); // Detiene el reconocimiento después de terminar de escuchar
    };

    recognition.onerror = (event) => {
        console.error('Error en el reconocimiento de voz:', event.error);
        micButton.textContent = 'Error'; // Indica un error en el botón
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        largeTextbox.value = transcript;
    };
});