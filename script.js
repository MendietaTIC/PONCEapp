  document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('progress');
    progressBar.style.width = '100%';

    // Después de 4 segundos, redirige a la segunda pantalla
    setTimeout(() => {
        window.location.href = 'second.html';
    }, 5300);
});

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
   document.addEventListener('DOMContentLoaded', () => {
  const categoryButtons = document.querySelectorAll('#category-container .category-button');
  const pictogramContainer = document.getElementById('pictogram-container');

  const pictograms = {
    saludo: [
      { src: 'https://i.pinimg.com/236x/d0/5c/49/d05c490462edd8f16e9ca52b9c00976a.jpg', text: 'Saludo 1' },
      { src: 'https://i.pinimg.com/236x/1a/2d/19/1a2d19e7cb7952b56562dd94ae93ec97.jpg', text: 'Saludo 2' }
    ],
    transporte: [
      { src: 'https://i.pinimg.com/236x/d0/5c/49/d05c490462edd8f16e9ca52b9c00976a.jpg', text: 'Transporte 1' },
      { src: 'https://i.pinimg.com/236x/1a/2d/19/1a2d19e7cb7952b56562dd94ae93ec97.jpg', text: 'Transporte 2' }
    ],
    amor: [
      { src: 'https://i.pinimg.com/236x/36/9f/39/369f399c730a036d6e70b48aaee594c0.jpg', text: 'Amor 1' },
      { src: 'https://i.pinimg.com/236x/36/9f/39/369f399c730a036d6e70b48aaee594c0.jpg', text: 'Amor 2' }
    ],
    deporte: [
      { src: 'https://i.pinimg.com/236x/d0/5c/49/d05c490462edd8f16e9ca52b9c00976a.jpg', text: 'Deporte 1' },
      { src: 'https://i.pinimg.com/236x/1a/2d/19/1a2d19e7cb7952b56562dd94ae93ec97.jpg', text: 'Deporte 2' }
    ]
  };

  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-category');
      loadPictograms(category);
    });
  });

  function loadPictograms(category) {
    pictogramContainer.innerHTML = ''; // Limpiar contenedor

    const items = pictograms[category] || [];
    items.forEach(item => {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.text;
      img.title = item.text;
      img.addEventListener('click', () => {
        console.log(`Pictograma ${item.text} clickeado`);
      });
      pictogramContainer.appendChild(img);
    });
  }
});

});
