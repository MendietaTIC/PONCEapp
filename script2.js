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
 
    // Maneja el evento de clic en el botón para limpiar el textbox principal
    clearMainTextboxButton.addEventListener('click', () => {
        mainTextbox.value = ''; // Limpia el contenido del textbox principal
    });

    // Maneja el evento de clic en el botón para limpiar el textbox grande
    clearLargeTextboxButton.addEventListener('click', () => {
        largeTextbox.value = ''; // Limpia el contenido del textbox grande
    });
  // Obtiene las referencias a los botones de categoría y al contenedor de pictogramas
    const categoryButtons = document.querySelectorAll('#category-container .category-button');
    const pictogramContainer = document.getElementById('pictogram-container');

    // Define los pictogramas para cada categoría
    const pictograms = {
        Saludo: [
             { src: 'https://drive.google.com/uc?export=view&id=1SNysTbBTFlkVDJPPuDhgi1sxG6xEi4x4', text: 'Saludo 1' },
            { src: 'https://drive.google.com/uc?export=view&id=18GFH-ld8VetSZ92RAoVbpVOgM42a_cQi', text: 'Saludo 2' }
        ],
        Transporte: [
            { src: 'https://i.pinimg.com/236x/d0/5c/49/d05c490462edd8f16e9ca52b9c00976a.jpg', text: 'Transporte 1' },
            { src: 'https://i.pinimg.com/236x/1a/2d/19/1a2d19e7cb7952b56562dd94ae93ec97.jpg', text: 'Transporte 2' }
        ],
        Amor: [
            { src: 'https://i.pinimg.com/236x/36/9f/39/369f399c730a036d6e70b48aaee594c0.jpg', text: 'Amor 1' },
            { src: 'https://i.pinimg.com/236x/36/9f/39/369f399c730a036d6e70b48aaee594c0.jpg', text: 'Amor 2' }
        ],
        Deporte: [
            { src: 'https://i.pinimg.com/236x/d0/5c/49/d05c490462edd8f16e9ca52b9c00976a.jpg', text: 'Deporte 1' },
            { src: 'https://i.pinimg.com/236x/1a/2d/19/1a2d19e7cb7952b56562dd94ae93ec97.jpg', text: 'Deporte 2' }
        ]
    };

    // Maneja el evento de clic en los botones de categoría
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            loadPictograms(category);
        });
    });

    // Carga los pictogramas según la categoría seleccionada
    function loadPictograms(category) {
        pictogramContainer.innerHTML = ''; // Limpia el contenedor de pictogramas
        const items = pictograms[category] || [];
        items.forEach(item => {
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.text;
            img.title = item.text;
            img.addEventListener('click', () => {
                console.log(`Pictograma ${item.text} clickeado`);
                // Aquí puedes agregar más acciones si es necesario
            });
            pictogramContainer.appendChild(img);
        });
    }
  // Añadir texto del pictograma al textbox1 y concatenar si ya tiene contenido
  const sendButton = document.getElementById('send-button');
pictogramContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
        const pictogramText = event.target.alt;
        mainTextbox.value = mainTextbox.value ? `${mainTextbox.value} ${pictogramText}` : pictogramText;
    }
});

// Convertir el texto en mainTextbox a voz cuando se presiona el botón "Enviar"
sendButton.addEventListener('click', () => {
    const textToSpeak = mainTextbox.value;
    if (textToSpeak) {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'es-ES'; // Puedes cambiar el idioma si es necesario
        window.speechSynthesis.speak(utterance);
    }
});

  });
