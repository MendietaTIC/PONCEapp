document.addEventListener('DOMContentLoaded', () => {
    // Configuración del reconocimiento de voz
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    const micButton = document.getElementById('mic-button');
    const largeTextbox = document.getElementById('large-textbox');

    recognition.lang = 'es-ES'; // Configura el idioma del reconocimiento

    // Cuando se hace clic en el botón del micrófono
    micButton.addEventListener('click', () => {
        try {
            recognition.start(); // Inicia el reconocimiento de voz
            micButton.textContent = "Escuchando..."; // Cambia el texto del botón
        } catch (error) {
            console.error("Error al iniciar el reconocimiento de voz:", error);
            micButton.textContent = "Error"; // Cambia el texto del botón en caso de error
        }
    });

    // Cuando el reconocimiento de voz comienza
    recognition.onstart = () => {
        micButton.textContent = "Escuchando...";
    };

    // Cuando el reconocimiento de voz termina
    recognition.onspeechend = () => {
        micButton.textContent = "🎤"; // Restablece el texto del botón
        recognition.stop(); // Detiene el reconocimiento
    };

    // Cuando ocurre un error
    recognition.onerror = (event) => {
        console.error("Error en el reconocimiento de voz:", event.error);
        micButton.textContent = "Error"; // Cambia el texto del botón en caso de error
    };

    // Cuando se recibe el resultado del reconocimiento
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        largeTextbox.value = transcript; // Muestra el texto reconocido en el textbox
    };
   
 
   
   // Obtiene las referencias a los elementos
    const clearMainTextboxButton = document.getElementById('clear-main-textbox');
    const clearLargeTextboxButton = document.getElementById('clear-large-textbox');
    const mainTextbox = document.getElementById('main-textbox');
    const largeTextbox = document.getElementById('large-textbox');

    // Maneja el evento de clic en el botón para limpiar el textbox principal
    clearMainTextboxButton.addEventListener('click', () => {
        mainTextbox.value = ''; // Limpia el contenido del textbox principal
    });

    // Maneja el evento de clic en el botón para limpiar el textbox grande
    clearLargeTextboxButton.addEventListener('click', () => {
        largeTextbox.value = ''; // Limpia el contenido del textbox grande
    });
  });
});
