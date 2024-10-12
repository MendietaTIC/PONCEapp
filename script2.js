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
   
    //  añadir pictogramas al texbox_Main
  function agregarPictograma(pictogramaTexto) {
    var textBox1 = document.getElementById('textBox1');
    textBox1.value += ' ' + pictogramaTexto;  // Añade la palabra del pictograma al texto existente
}

  
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
            { src: 'https://imgur.com/0jMhvF1.png', text: 'Hola', gif: 'https://imgur.com/gCm9Xme.gif'},
            { src: 'https://imgur.com/uJcgD3m.png', text: 'OK', gif: 'https://imgur.com/CTSf234.gif'},
            { src: 'https://imgur.com/4isJHZV.png', text: 'Perdón' ,gif: 'https://imgur.com/cCIbOx0.gif'},
            { src: 'https://imgur.com/ykz2BHo.png', text: 'Por favor', gif: 'https://imgur.com/NQrRaXe.gif'},
            { src: 'https://imgur.com/81LKnZO.png', text: 'Puedes ayudarme',gif: 'https://imgur.com/nxBI7Xw.gif'},  
            { src: 'https://imgur.com/iBXkPri.png', text: '¿Como Estás?',gif: 'https://imgur.com/XjHwig8.gif'},
            { src: 'https://imgur.com/omz9Li2.png', text: 'Bienvenido' , gif: 'https://imgur.com/u4azcOa.gif'},
            { src: 'https://imgur.com/QzVmDit.png', text: 'Buenas Noches' ,gif: 'https://imgur.com/dXsrX7c.gif'},
            { src: 'https://imgur.com/iKfxBjl.png', text: 'Buenas Tardes',gif: 'https://imgur.com/7Gn5dX4.gif'},
            { src: 'https://imgur.com/9NJ3XjK.png', text: 'Buenos Días' , gif: 'https://imgur.com/y5xoOSX.gif'},
            { src: 'https://imgur.com/LTpjLd1.png', text: 'Disculpa' ,gif: 'https://imgur.com/7hFqsvv.gif'},
            { src: 'https://imgur.com/DrV0M55.png', text: 'Estoy Bien' ,gif: 'https://imgur.com/5kGGUxP.gif'},
            { src: 'https://imgur.com/TRGRCZr.png', text: 'Estoy mal' ,gif: 'https://imgur.com/5f202zR.gif'},
            { src: 'https://imgur.com/mr5ReMR.png', text: 'Gracias' ,gif: 'https://imgur.com/RVi4veK.gif'},
            { src: 'https://imgur.com/MVPNqS4.png', text: 'No' ,gif: 'https://imgur.com/vyTqnV5.gif'},
            { src: 'https://imgur.com/ltDOrIj.png', text: 'si', gif: 'https://imgur.com/q0qCp75.gif'},
            { src: 'https://imgur.com/m7ajgH5.png', text: 'adios', gif: 'https://imgur.com/jkMwS5V.gif'},
        ],
        Familia: [
            { src: 'https://imgur.com/0HHVmSK.png', text: 'Abuela',gif: 'https://imgur.com/5D79p3l.gif' },
            { src: 'https://imgur.com/aI2mU9z.png', text: 'Abuelo',gif: 'https://imgur.com/5D79p3l.gif'},
            { src: 'https://imgur.com/0myfCAN.png', text: 'Amigas',gif: 'https://imgur.com/1qxcekp.gif' },
            { src: 'https://imgur.com/mh3KqlT.png', text: 'Amigos',gif: 'https://imgur.com/1qxcekp.gif'},
            { src: 'https://imgur.com/Mok952t.png', text: 'Esposo',gif: 'https://imgur.com/dGniO7Q.gif'},
            { src: 'https://imgur.com/u8IgkZq.png', text: 'Mamá' ,gif: 'https://imgur.com/Xj4sF2i.gif'},
            { src: 'https://imgur.com/SUYdNQA.png', text: 'Hermana', gif: 'https://imgur.com/OcWr5dU.gif'},
            { src: 'https://imgur.com/JagBK3k.png', text: 'Hermano' ,gif: 'https://imgur.com/vvVnxPn.gif'},
            { src: 'https://imgur.com/0P2BLVj.png', text: 'Novio',gif: 'https://imgur.com/xAXpsbh.gif'},
            { src: 'https://imgur.com/a7rwAN2.png', text: 'Nuera' },
            { src: 'https://imgur.com/r38CYot.png', text: 'Papá' ,gif: 'https://imgur.com/5cBQPJG.gif'},
            { src: 'https://imgur.com/vGqGSFz.png', text: 'Primo' },
            { src: 'https://imgur.com/G9J3UVu.png', text: 'Sobrino' },
            { src: 'https://imgur.com/pg8jb4b.png', text: 'Yerno' ,gif: 'https://imgur.com/bvPc8Te.gif'},
            { src: 'https://imgur.com/8T7d4bm.png', text: 'Tío' },
          
          
        ],
      Colores: [
            { src: 'https://.jpg', text: 'Rojo' },
            { src: 'https://.jpg', text: 'verde' },
            { src: 'https://.jpg', text: 'naranja' },
            { src: 'https://.jpg', text: 'negro' },
            { src: 'https://.jpg', text: 'blanco' },
            { src: 'https://.jpg', text: 'Purpura' },
            { src: 'https://.jpg', text: 'Azul' }
        ],
      Tiempo: [
            { src: '.jpg', text: 'Lunes ' ,gif: 'https://imgur.com/eROeJkX.gif'},
            { src: '.jpg', text: 'Martes ',gif: 'https://imgur.com/bvPc8Te.gif'},
            { src: '.jpg', text: 'Miercoles' ,gif: 'https://imgur.com/ngisDb7.gif'},
            { src: '.jpg', text: 'Jueves' ,gif: 'https://imgur.com/rTRn6GT.gif'},
            { src: '.jpg', text: 'Viernes' ,gif: 'https://imgur.com/OLpi6uU.gif'},
            { src: '.jpg', text: 'Sabado' ,gif: 'https://imgur.com/eSg6aRd.gif'},
            { src: '.jpg', text: 'Domingo' ,gif: 'https://imgur.com/RjKoSKo.gif'},
            { src: '.jpg', text: 'Despues' ,gif: 'https://imgur.com/hSKagz8.gif'},
            { src: '.jpg', text: 'Antier' ,gif: 'https://imgur.com/WM6hU89.gif'},
            { src: '.jpg', text: 'Tarde' ,gif: 'https://imgur.com/i5qjeEW.gif'},
            { src: '.jpg', text: 'Ayer' ,gif: 'https://imgur.com/yCivOu0.gif'},
            { src: '.jpg', text: 'mañana' ,gif: 'https://imgur.com/iyTyYXm.gif'},
            { src: '.jpg', text: 'hoy' ,gif: 'https://imgur.com/OBJ53dp.gif'},
            { src: '.jpg', text: 'nunca' ,gif: 'https://imgur.com/JnwBGri.gif'},
            { src: '.jpg', text: 'Siempre',gif: 'https://imgur.com/TCNin6s.gif'}
        ],
      Compras: [
            { src: 'https://.jpg', text: 'Cuanto Vale' },
            { src: 'https://.jpg', text: 'Hay descuento' },
            { src: 'https://.jpg', text: 'Vuelto' },
            { src: 'https://.jpg', text: 'Al detalle' },
            { src: 'https://.jpg', text: 'Por mayor' },
       
        ],
      Números: [
            { src: 'https://imgur.com/Lphcoeo.jpg', text: '0',gif: 'https://imgur.com/InHwYfv.gif' },
            { src: 'https://imgur.com/ND7dfFa.jpg', text: '1',gif: 'https://imgur.com/zzS0ENo.gif' },
            { src: 'https://imgur.com/92EX1FF.jpg', text: '2',gif: 'https://imgur.com/yvgSth3.gif' },
            { src: 'https://imgur.com/jrNOG9b.jpg', text: '3',gif: 'https://imgur.com/9VAAuX1.gif' },
            { src: 'https://imgur.com/6iuRWM2.jpg', text: '4',gif: 'https://imgur.com/7drjckL.gif' },
            { src: 'https://imgur.com/ETBi5VL.jpg', text: '5',gif: 'https://imgur.com/r6v8wJc.gif' },
            { src: 'https://imgur.com/TD5fB0f.jpg', text: '6',gif: 'https://imgur.com/kmY8r8m.gif' },
            { src: 'https://imgur.com/0Ivu31z.jpg', text: '7',gif: 'https://imgur.com/Ydjnxbf.gif' },
            { src: 'https://imgur.com/c9LHP5r.jpg', text: '8',gif: 'https://imgur.com/FrPzced.gif' },
            { src: 'https://imgur.com/CqF76b4.jpg', text: '9',gif: 'https://imgur.com/F34feWb.gif' },
            { src: 'https://imgur.com/bfDnRIx.jpg', text: '100',gif: 'https://imgur.com/mFixwOm.gif'},
            
        ],
        Sentimientos: [
            { src: 'https://imgur.com/l0nYpkD.png', text: 'Feliz',gif: 'https://imgur.com/MoluuNm.gif'},
            { src: 'https://imgur.com/xWw7oYY.png', text: 'Aburrido',gif: 'https://imgur.com/KQ7M4Qt.gif' },
            { src: 'https://imgur.com/X8O2Ch4.png', text: 'Agradecido' },
            { src: 'https://imgur.com/l8yjOuA.png', text: 'Cansado',gif: 'https://imgur.com/U2OjX3O.gif'},
            { src: 'https://imgur.com/KEqyPuj.png', text: 'Celos',gif: 'https://imgur.com/S0qmaHG.gif'},
            { src: 'https://imgur.com/bUv4PMw.png', text: 'Sorpresa',gif: 'https://imgur.com/4kYBCd9.gif'},
            { src: 'https://imgur.com/Yw9MAAZ.png', text: 'Culposo' },
            { src: 'https://imgur.com/ySVNu7m.png', text: 'Enfermo',gif: 'https://imgur.com/5f202zR.gif' },
            { src: 'https://imgur.com/eI7uZpz.png', text: 'Enojo' ,gif: 'https://imgur.com/0Ck32Bv.gif'},
            { src: 'https://imgur.com/3UUhZc5.png', text: 'Envidia' },
            { src: 'https://imgur.com/Aa010Tm.png', text: 'Estresado',gif: 'https://imgur.com/VU99Def.gif'},
            { src: 'https://imgur.com/R44RLh1.png', text: 'Frustrado' },
            { src: 'https://imgur.com/LXb8w8b.png', text: 'Miedo',gif: 'https://imgur.com/rXPOZEJ.gif'},
            { src: 'https://imgur.com/v2RM0ju.png', text: 'Orgulloso',gif: 'https://imgur.com/UhOiMb5.gif'},
            { src: 'https://imgur.com/RyeykHd.png', text: 'Preocupado' },
            { src: 'https://imgur.com/hkMBNR5.png', text: 'Triste',gif: 'https://imgur.com/LCgwVXm.gif'}, 
            { src: 'https://imgur.com/r8hTMRR.png', text: 'Apenado' },
            { src: 'https://imgur.com/650hJsd.png', text: 'Asco',gif: 'https://imgur.com/dCNTcqq.gif' },
        ],
        Deporte: [
            { src: 'https://imgur.com/aYQ9x9r.png', text: 'Balon' },
            { src: 'https://imgur.com/5KgPWi2.png', text: 'Baloncesto' },
            { src: 'https://imgur.com/2c1HMYo.png', text: 'Baseball' ,gif: 'https://imgur.com/FK7VhUC.gif'},
            { src: 'https://imgur.com/PHNpjIC.png', text: 'Bicicleta',gif: 'https://imgur.com/sxbwBJt.gif'},
            { src: 'https://imgur.com/XSK2hcT.png', text: 'Boxeo' },  
            { src: 'https://imgur.com/qlfaoyY.png', text: 'Caminar',gif: 'https://imgur.com/qVXIqLq.gif'},
            { src: 'https://imgur.com/MyrZKXi.png', text: 'Competencia' },
            { src: 'https://imgur.com/hnHZwpk.png', text: 'Correr' },
            { src: 'https://imgur.com/obUsZcj.png', text: 'Ejercicio' },
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
            { src: 'https://i.pinimg.com/236x/d0/5c/49/d05c490462edd8f16e9ca52b9c00976a.jpg', text: 'Yo',gif: 'https://imgur.com/xcuk66z.gif'},
            { src: 'https://i.pinimg.com/236x/d0/5c/49/d05c490462edd8f16e9ca52b9c00976a.jpg', text: 'TU', gif: 'https://imgur.com/Uni8g4W.gif'},
            { src: 'https://i.pinimg.com/236x/d0/5c/49/d05c490462edd8f16e9ca52b9c00976a.jpg', text: 'Él', gif: 'https://imgur.com/DFMD5mH.gif'},
            { src: 'https://i.pinimg.com/236x/d0/5c/49/d05c490462edd8f16e9ca52b9c00976a.jpg', text: 'Nosotros', gif: 'https://imgur.com/L6pkD6U.gif'},
            { src: 'https://i.pinimg.com/236x/d0/5c/49/d05c490462edd8f16e9ca52b9c00976a.jpg', text: 'Ellos', gif: 'https://imgur.com/pevG8Uz.gif'},
            
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
