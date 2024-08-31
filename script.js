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
document.addEventListener('DOMContentLoaded', () => {
    const micButton = document.getElementById('mic-button');
    const largeTextbox = document.getElementById('large-textbox');
    const mainTextbox = document.getElementById('main-textbox');
    const sendButton = document.getElementById('send-button');
    const clearMainTextboxButton = document.getElementById('clear-main-textbox');
    const clearLargeTextboxButton = document.getElementById('clear-large-textbox');

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

    // Función para limpiar los textboxes
    const clearTextboxes = () => {
        mainTextbox.value = '';
        largeTextbox.value = '';
    };

    // Asocia los eventos de los botones de limpiar
    clearMainTextboxButton.addEventListener('click', () => {
        mainTextbox.value = '';
    });

    clearLargeTextboxButton.addEventListener('click', () => {
        largeTextbox.value = '';
    });
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

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert('Lo siento, tu navegador no soporta la API de reconocimiento de voz.');
        return;
    }

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

    clearMainTextboxButton.addEventListener('click', () => {
        mainTextbox.value = '';
    });

    clearLargeTextboxButton.addEventListener('click', () => {
        largeTextbox.value = '';
    });

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            loadPictograms(category);
        });
    });

    function loadPictograms(category) {
        // Ejemplo básico de cómo cargar pictogramas por categoría
        pictogramContainer.innerHTML = ''; // Limpiar contenedor
        const pictograms = {
            saludo: ['https://i.pinimg.com/236x/d0/5c/49/d05c490462edd8f16e9ca52b9c00976a.jpg','saludo2.png'],
            transporte: ['transporte1.png', 'transporte2.png','transporte3.png'],
            amor: ['amor1.png', 'amor2.png'],
            deporte: ['deporte1.png', 'deporte2.png']
        };

        const images = pictograms[category] || [];
        images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `${category} pictograma`;
            img.addEventListener('click', () => {
                // Aquí puedes definir lo que sucede cuando se hace clic en un pictograma
                console.log(`Pictograma ${src} clickeado`);
            });
            pictogramContainer.appendChild(img);
        });
    }
});
/// Actualizacion 

document.addEventListener('DOMContentLoaded', () => {
    const micButton = document.getElementById('mic-button');
    const largeTextbox = document.getElementById('large-textbox');
    const mainTextbox = document.getElementById('main-textbox');
    const sendButton = document.getElementById('send-button');
    const clearMainTextboxButton = document.getElementById('clear-main-textbox');
    const clearLargeTextboxButton = document.getElementById('clear-large-textbox');
    const categoryButtons = document.querySelectorAll('#category-container .category-button');
    const pictogramContainer = document.getElementById('pictogram-container');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert('Lo siento, tu navegador no soporta la API de reconocimiento de voz.');
        return;
    }

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

    clearMainTextboxButton.addEventListener('click', () => {
        mainTextbox.value = '';
    });

    clearLargeTextboxButton.addEventListener('click', () => {
        largeTextbox.value = '';
    });

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
            img.title = item.text; // Opcional: para mostrar el texto como una pista sobre la imagen
            img.addEventListener('click', () => {
                mainTextbox.value = item.text; // Actualizar el textbox con el texto del pictograma
                const gifImage = document.getElementById('selected-gif');
                gifImage.src = ''; // Opcional: puedes cambiar el GIF aquí si lo necesitas
            });
            pictogramContainer.appendChild(img);
        });
    }
});
//text a voz

document.addEventListener('DOMContentLoaded', () => {
    const micButton = document.getElementById('mic-button');
    const largeTextbox = document.getElementById('large-textbox');
    const mainTextbox = document.getElementById('main-textbox');
    const sendButton = document.getElementById('send-button');
    const clearMainTextboxButton = document.getElementById('clear-main-textbox');
    const clearLargeTextboxButton = document.getElementById('clear-large-textbox');
    const categoryButtons = document.querySelectorAll('#category-container .category-button');
    const pictogramContainer = document.getElementById('pictogram-container');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert('Lo siento, tu navegador no soporta la API de reconocimiento de voz.');
        return;
    }

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
            img.title = item.text; // Opcional: para mostrar el texto como una pista sobre la imagen
            img.addEventListener('click', () => {
                mainTextbox.value = item.text; // Actualizar el textbox con el texto del pictograma
                const gifImage = document.getElementById('selected-gif');
                gifImage.src = ''; // Opcional: puedes cambiar el GIF aquí si lo necesitas
            });
            pictogramContainer.appendChild(img);
        });
    }
});
