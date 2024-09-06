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
            { src: 'https://imgur.com/0jMhvF1.png', text: 'Hola', gif: 'https://imgur.com/JAmxawE.gif'},
            { src: 'https://imgur.com/uJcgD3m.png', text: 'OK' },
            { src: 'https://imgur.com/4isJHZV.png', text: 'Perdón' },
            { src: 'https://imgur.com/ykz2BHo.png', text: 'Por favor' },
            { src: 'https://imgur.com/81LKnZO.png', text: 'Puedes ayudarme' },  
            { src: 'https://imgur.com/iBXkPri.png', text: '¿Como Estás?' },
            { src: 'https://imgur.com/omz9Li2.png', text: 'Bienvenido' },
            { src: 'https://imgur.com/QzVmDit.png', text: 'Buenas Noches' },
            { src: 'https://imgur.com/iKfxBjl.png', text: 'Buenas Tardes' },
            { src: 'https://imgur.com/9NJ3XjK.png', text: 'Buenos Días' },
            { src: 'https://imgur.com/LTpjLd1.png', text: 'Disculpa' },
            { src: 'https://imgur.com/DrV0M55.png', text: 'Estoy Bien' },
            { src: 'https://imgur.com/TRGRCZr.png', text: 'Estoy mal' },
            { src: 'https://imgur.com/mr5ReMR.png', text: 'Gracias' },
            { src: 'https://imgur.com/MVPNqS4.png', text: 'No' },
            { src: 'https://imgur.com/ltDOrIj.png', text: 'si' },
        ],
        Transporte: [
            { src: 'https://i.pinimg.com/236x/d0/5c/49/d05c490462edd8f16e9ca52b9c00976a.jpg', text: 'Transporte 1' },
            { src: 'https://i.pinimg.com/236x/1a/2d/19/1a2d19e7cb7952b56562dd94ae93ec97.jpg', textpng: 'Transporte 2' }
        ],
        Amor: [
            { src: 'https://imgur.com/l0nYpkD.png', text: 'Feliz' },
            { src: 'https://imgur.com/xWw7oYY.png', text: 'Aburrido' },
            { src: 'https://imgur.com/X8O2Ch4.png', text: 'Agradecido' },
            { src: 'https://imgur.com/l8yjOuA.png', text: 'Cansado' },
            { src: 'https://imgur.com/KEqyPuj.png', text: 'Celos' },  
            { src: 'https://imgur.com/bUv4PMw.png', text: 'Sorpresa' },
            { src: 'https://imgur.com/Yw9MAAZ.png', text: 'Culposo' },
            { src: 'https://imgur.com/ySVNu7m.png', text: 'Enfermo' },
            { src: 'https://imgur.com/eI7uZpz.png', text: 'Enojo' },
            { src: 'https://imgur.com/3UUhZc5.png', text: 'Envidia' },
            { src: 'https://imgur.com/Aa010Tm.png', text: 'Estresado' },
            { src: 'https://imgur.com/R44RLh1.png', text: 'Frustrado' },
            { src: 'https://imgur.com/LXb8w8b.png', text: 'Miedo' },
            { src: 'https://imgur.com/v2RM0ju.png', text: 'Orgulloso' },
            { src: 'https://imgur.com/RyeykHd.png', text: 'Preocupado' },
            { src: 'https://imgur.com/hkMBNR5.png', text: 'Triste' },
            { src: 'https://imgur.com/r8hTMRR.png', text: 'Apenado' },
            { src: 'https://imgur.com/650hJsd.png', text: 'Asco' },
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
let selectedGIFs = [];  

function loadPictograms(category) {
    pictogramContainer.innerHTML = ''; // Limpiar contenedor

    const items = pictograms[category] || [];
    items.forEach(item => {
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.text;
        img.title = item.text;
        img.classList.add('pictogram-img');
        
        img.addEventListener('click', () => {
            mainTextbox.value += item.text + ' '; // Actualizar el textbox con el texto del pictograma
            selectedGIFs.push(item.gif); // Añadir el GIF correspondiente a la lista de seleccionados
        });

        pictogramContainer.appendChild(img);
    });
}

  
  
  
  
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
              selectedGIFs.push(item.gif); // Añadir el GIF correspondiente
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
      
      // Reproduce los GIFs
        selectedGIFs.forEach((gif, index) => {
            setTimeout(() => {
                document.getElementById('selected-gif').src = gif; // Cambia el GIF en el contenedor
            }, index * 5000); // Cambia cada GIF después de 2 segundos (ajústalo si es necesario)
        });
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'es-ES'; // Puedes cambiar el idioma si es necesario
        window.speechSynthesis.speak(utterance);
    }
});
   

  });
