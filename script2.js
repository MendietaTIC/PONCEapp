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
            { src: 'https://imgur.com/0jMhvF1.png', text: 'Hola', gif: 'https://i.imgur.com/jkMwS5V.gif'},
            { src: 'https://imgur.com/uJcgD3m.png', text: 'OK', gif: 'https://imgur.com/CTSf234.gif'},
            { src: 'https://imgur.com/4isJHZV.png', text: 'Perdón' ,gif: 'https://imgur.com/cCIbOx0.gif'},
            { src: 'https://imgur.com/ykz2BHo.png', text: 'Por favor', gif: 'https://imgur.com/NQrRaXe.gif'},
            { src: 'https://imgur.com/81LKnZO.png', text: 'Puedes ayudarme',gif: 'https://imgur.com/nxBI7Xw.gif'},  
            { src: 'https://imgur.com/iBXkPri.png', text: '¿Como Estás?',gif: 'https://imgur.com/XjHwig8.gif'},
            { src: 'https://imgur.com/omz9Li2.png', text: 'Bienvenido' , gif: 'https://imgur.com/u4azcOa.gif'},
            { src: 'https://imgur.com/QzVmDit.png', text: 'Buenas Noches' ,gif: 'https://imgur.com/dXsrX7c.gif'},
            { src: 'https://imgur.com/iKfxBjl.png', text: 'Buenas Tardes',gif: 'https://imgur.com/7Gn5dX4.gif'},
            { src: 'https://imgur.com/9NJ3XjK.png', text: 'Buenos Días' , gif: 'https://imgur.com/y5xoOSX.gif'},
            { src: 'https://imgur.com/LTpjLd1.png', text: 'Disculpa' ,gif: 'https://imgur.com/5kGGUxP.gif'},
            { src: 'https://imgur.com/DrV0M55.png', text: 'Estoy Bien' ,gif: 'https://imgur.com/5kGGUxP.gif'},
            { src: 'https://imgur.com/TRGRCZr.png', text: 'Estoy mal' ,gif: 'https://imgur.com/5f202zR.gif'},
            { src: 'https://imgur.com/mr5ReMR.png', text: 'Gracias' ,gif: 'https://imgur.com/vyTqnV5.gif'},
            { src: 'https://imgur.com/MVPNqS4.png', text: 'No' ,gif: 'https://imgur.com/q0qCp75.gif'},
            { src: 'https://imgur.com/ltDOrIj.png', text: 'si', gif: 'https://imgur.com/osUhU0J.gif'},
        ],
        Familia: [
            { src: 'https://imgur.com/0HHVmSK.png', text: 'Abuela' },
            { src: 'https://imgur.com/aI2mU9z.png', text: 'Abuelo' },
            { src: 'https://imgur.com/0myfCAN.png', text: 'Amigas' },
            { src: 'https://imgur.com/mh3KqlT.png', text: 'Amigos' },
            { src: 'https://imgur.com/Mok952t.png', text: 'Esposo' },
            { src: 'https://imgur.com/u8IgkZq.png', text: 'Mamá' },
            { src: 'https://imgur.com/SUYdNQA.png', text: 'Hermana' },
            { src: 'https://imgur.com/JagBK3k.png', text: 'Hermano' },
            { src: 'https://imgur.com/0P2BLVj.png', text: 'Novio' },
            { src: 'https://imgur.com/a7rwAN2.png', text: 'Nuera' },
            { src: 'https://imgur.com/r38CYot.png', text: 'Papá' },
            { src: 'https://imgur.com/vGqGSFz.png', text: 'Primo' },
            { src: 'https://imgur.com/hyPBCIJ.png', text: 'Sobrina' },
            { src: 'https://imgur.com/G9J3UVu.png', text: 'Sobrino' },
            { src: 'https://imgur.com/pg8jb4b.png', text: 'Yerno' },
            { src: 'https://imgur.com/8T7d4bm.png', text: 'Tío' },
          
          
        ],
      Colores: [
            { src: 'https://i.pinimg.com/236x/d0/5c/49/d05c490462edd8f16e9ca52b9c00976a.jpg', text: 'Transporte 1' },
            { src: 'https://i.pinimg.com/236x/1a/2d/19/1a2d19e7cb7952b56562dd94ae93ec97.jpg', textpng: 'Transporte 2' }
        ],
      Tiempo: [
            { src: 'https://i.pinimg.com/236x/d0/5c/49/d05c490462edd8f16e9ca52b9c00976a.jpg', text: 'Transporte 1' },
            { src: 'https://i.pinimg.com/236x/1a/2d/19/1a2d19e7cb7952b56562dd94ae93ec97.jpg', textpng: 'Transporte 2' }
        ],
      Compras: [
            { src: 'https://i.pinimg.com/236x/d0/5c/49/d05c490462edd8f16e9ca52b9c00976a.jpg', text: 'Transporte 1' },
            { src: 'https://i.pinimg.com/236x/1a/2d/19/1a2d19e7cb7952b56562dd94ae93ec97.jpg', textpng: 'Transporte 2' }
        ],
      Números: [
            { src: 'https://i.pinimg.com/236x/d0/5c/49/d05c490462edd8f16e9ca52b9c00976a.jpg', text: 'Transporte 1' },
            { src: 'https://i.pinimg.com/236x/1a/2d/19/1a2d19e7cb7952b56562dd94ae93ec97.jpg', textpng: 'Transporte 2' }
        ],
        Sentimientos: [
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
            { src: 'https://imgur.com/aYQ9x9r.png', text: 'Balon' },
            { src: 'https://imgur.com/5KgPWi2.png', text: 'Baloncesto' },
            { src: 'https://imgur.com/2c1HMYo.png', text: 'Baseball' },
            { src: 'https://imgur.com/PHNpjIC.png', text: 'Bicicleta' },
            { src: 'https://imgur.com/XSK2hcT.png', text: 'Boxeo' },  
            { src: 'https://imgur.com/qlfaoyY.png', text: 'Caminar' },
            { src: 'https://imgur.com/MyrZKXi.png', text: 'Competencia' },
            { src: 'https://imgur.com/hnHZwpk.png', text: 'Correr' },
            { src: 'https://imgur.com/obUsZcjz.png', text: 'Ejercicio' },
            { src: 'https://imgur.com/mbxkdxw.png', text: 'Entrenador' },
            { src: 'https://imgur.com/dw4JKYu.png', text: 'Futbol' },
            { src: 'https://imgur.com/b9zn06x.png', text: 'Ganador' },
            { src: 'https://imgur.com/qUra9ai.png', text: 'jugar' },
            { src: 'https://imgur.com/Q1FA3n5.png', text: 'pesas' },
            { src: 'https://imgur.com/WRgvoku.png', text: 'Nadar' },
            { src: 'https://imgur.com/Lo74TyP.png', text: 'Partido' },
            { src: 'https://imgur.com/WeKScrX.png', text: 'Saltar' },
            { src: 'https://imgur.com/TwaL6US.png', text: 'Yoga' },
            { src: 'https://imgur.com/DWz8qwS.png', text: 'Zumba' },
        ],
       Sujeto: [
            { src: 'https://i.pinimg.com/236x/d0/5c/49/d05c490462edd8f16e9ca52b9c00976a.jpg', text: 'Yo' },
            { src: 'https://i.pinimg.com/236x/d0/5c/49/d05c490462edd8f16e9ca52b9c00976a.jpg', text: 'TU' },
            { src: 'https://i.pinimg.com/236x/d0/5c/49/d05c490462edd8f16e9ca52b9c00976a.jpg', text: 'Él' },
            { src: 'https://i.pinimg.com/236x/d0/5c/49/d05c490462edd8f16e9ca52b9c00976a.jpg', text: 'Nosotros' },
            { src: 'https://i.pinimg.com/236x/d0/5c/49/d05c490462edd8f16e9ca52b9c00976a.jpg', text: 'Ellos' },
            
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
            }, index * 3000); // Cambia cada GIF después de 3 segundos (ajústalo si es necesario)
        });
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'es-ES'; // Puedes cambiar el idioma si es necesario
        window.speechSynthesis.speak(utterance);
    }
});
 
  
  // Las palabras seleccionadas se almacenan en un array llamado 'selectedWords'
let selectedWords = []; // Array para almacenar las palabras seleccionadas

// Función para limpiar el textbox principal y reiniciar la caché de palabras seleccionadas
document.getElementById("clear-main-textbox").addEventListener("click", function() {
   

  
  // Limpiar el contenido del textbox principal
    document.getElementById("main-textbox").value = "";

    // Limpiar la caché de palabras seleccionadas
    selectedWords = [];

    // Reiniciar cualquier otra caché relacionada (si es necesario)
    
    selectedGIFs = [];

    // Restaurar el GIF principal en el contenedor de GIFs
    document.getElementById("selected-gif").src = 'https://imgur.com/u4azcOa.gif?cid=790b76118ma61zm4gszrdt0cgyvdkutqh2zwmuqipqt5ihbf&ep=v1_gifs_search&rid=giphy.gif';

    console.log("Caché de palabras seleccionadas limpiada");

    // Limpiar el contenedor de GIFs si hay alguno mostrado
    const gifContainer = document.getElementById("gif-container");
    gifContainer.innerHTML = ''; // Limpiar cualquier GIF actual
    const defaultGif = document.createElement("img");
    defaultGif.src = 'https://imgur.com/u4azcOa.gif?cid=790b76118ma61zm4gszrdt0cgyvdkutqh2zwmuqipqt5ihbf&ep=v1_gifs_search&rid=giphy.gif'; // URL de tu GIF principal
    gifContainer.appendChild(defaultGif);  
  
});

  // Función para manejar la selección de pictogramas
function selectPictogram(pictogramWord, gifURL) {
    // Añadir la palabra del pictograma al array
    selectedWords.push(pictogramWord);

    // Actualizar el textbox con las palabras seleccionadas
    document.getElementById("main-textbox").value = selectedWords.join(' ');

    // Añadir el GIF correspondiente a la caché de GIFs seleccionados
    selectedGIFs.push(gifURL);
}

// Función para manejar el envío del texto a voz
document.getElementById("send-button").addEventListener("click", function() {
    // Convertir el texto del textbox a voz
    let text = document.getElementById("main-textbox").value;
    if (text) {
        // Aquí puedes implementar la conversión de texto a voz
        console.log("Convirtiendo a voz: " + text);
      
  
      
      
      // Aplicando unos cambios a texto a voz
   
   
      
    // probando hasta aqui 
      
      // Mostrar los GIFs correspondientes a las palabras seleccionadas
        const gifContainer = document.getElementById("gif-container");
        gifContainer.innerHTML = ''; // Limpiar cualquier GIF previo

        selectedGIFs.forEach(gifURL => {
            const imgElement = document.createElement("img");
            imgElement.src = gifURL;
            imgElement.style.width = "200px"; // Ajusta el tamaño del GIF
            imgElement.style.height = "200px";
            gifContainer.appendChild(imgElement);
        });
    }
});
  
// Función para manejar el envío del texto a voz
document.getElementById("send-button").addEventListener("click", function() {
    // Convertir el texto del textbox a voz
    let text = document.getElementById("main-textbox").value;
    if (text) {
        console.log("Convirtiendo a voz: " + text);

        // Mostrar los GIFs correspondientes a las palabras seleccionadas con un retraso de 3 segundos entre cada uno
        const gifContainer = document.getElementById("gif-container");
        gifContainer.innerHTML = ''; // Limpiar cualquier GIF previo

        // Función para mostrar cada GIF con retraso
        function showGIFsSequentially(index) {
            if (index < selectedGIFs.length) {
                const imgElement = document.createElement("img");
                imgElement.src = selectedGIFs[index];
                imgElement.style.width = "200px"; // Ajusta el tamaño del GIF si es necesario
                imgElement.style.height = "200px";
                gifContainer.innerHTML = ''; // Limpia el contenedor antes de mostrar el siguiente GIF
                gifContainer.appendChild(imgElement);

                // Llamar a la función para mostrar el siguiente GIF después de 2.5 segundos
                setTimeout(function() {
                    showGIFsSequentially(index + 1);
                }, 2500);
            }
        }

        // Iniciar la secuencia de GIFs
        showGIFsSequentially(0);
    }

    
});


});
