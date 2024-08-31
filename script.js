document.addEventListener('DOMContentLoaded', () => {
    const micButton = document.getElementById('mic-button');
    const largeTextbox = document.getElementById('large-textbox');
    const mainTextbox = document.getElementById('main-textbox');
    const sendButton = document.getElementById('send-button');
    const clearMainTextboxButton = document.getElementById('clear-main-textbox');
    const clearLargeTextboxButton = document.getElementById('clear-large-textbox');
    const categoryButtons = document.querySelectorAll('#category-container .category-button');
    const pictogramContainer = document.getElementById('pictogram-container');
    
    // Verifica si la API de SpeechRecognition está disponible
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert('Lo siento, tu navegador no soporta la API de reconocimiento de voz.');
        return;
    }


  
  const gifImage = document.getElementById('selected-gif');
gifImage.src = ''; // Opcional: puedes cambiar el GIF aquí si lo necesitas


    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.interimResults = false;

    micButton.addEventListener('click', () => {
        try {
            recognition.start();
        } catch (error) {
            console.error('Error al iniciar el reconocimiento de voz:', error);
            micButton.textContent = 'Error';
        }
    });

    recognition.onstart = () => {
        micButton.textContent = 'Escuchando...';
    };

    recognition.onspeechend = () => {
        micButton.textContent = '🎤';
        recognition.stop();
    };

    recognition.onerror = (event) => {
        console.error('Error en el reconocimiento de voz:', event.error);
        micButton.textContent = 'Error';
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        largeTextbox.value = transcript;
    };

    // Limpiar los textboxes
    clearMainTextboxButton.addEventListener('click', () => {
        mainTextbox.value = '';
    });

    clearLargeTextboxButton.addEventListener('click', () => {
        largeTextbox.value = '';
    });

    sendButton.addEventListener('click', () => {
        const textToSpeak = mainTextbox.value;
        if (textToSpeak) {
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            utterance.lang = 'es-ES'; // Puedes cambiar el idioma si es necesario
            window.speechSynthesis.speak(utterance);
        }
    });

    // Manejar los botones de categoría y cargar pictogramas
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            loadPictograms(category);
        });
    });

    function loadPictograms(category) {
        pictogramContainer.innerHTML = ''; // Limpiar contenedor
        const pictograms = {
            saludo: [
                { src: 'images/saludo1.png', text: 'Saludo 1' },
                { src: 'images/saludo2.png', text: 'Saludo 2' }
            ],
            transporte: [
                { src: 'images/transporte1.png', text: 'Transporte 1' },
                { src: 'images/transporte2.png', text: 'Transporte 2' }
            ],
            amor: [
                { src: 'images/amor1.png', text: 'Amor 1' },
                { src: 'images/amor2.png', text: 'Amor 2' }
            ],
            deporte: [
                { src: 'images/deporte1.png', text: 'Deporte 1' },
                { src: 'images/deporte2.png', text: 'Deporte 2' }
            ]
        };

        const items = pictograms[category] || [];
        items.forEach(item => {
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.text;
            img.title = item.text;
            img.addEventListener('click', () => {
                mainTextbox.value = item.text; // Actualizar el textbox con el texto del pictograma
                const gifImage = document.getElementById('selected-gif');
                gifImage.src = ''; // Puedes cambiar el GIF si es necesario
            });
            pictogramContainer.appendChild(img);
        });
    }
});
