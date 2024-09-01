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
    try {
      recognition.start();
    } catch (error) {
      console.error("Error al iniciar el reconocimiento de voz:", error);
      micButton.textContent = "Error";
  

  recognition.onstart = () => {
    micButton.textContent = "Escuchando...";
  };

  recognition.onspeechend = () => {
    micButton.textContent = "🎤";
    recognition.stop();
  };

  recognition.onerror = (event) => {
    console.error("Error en el reconocimiento de voz:", event.error);
    micButton.textContent = "Error";
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    largeTextbox.value = transcript;
  };

  // Limpiar los textboxes
  clearMainTextboxButton.addEventListener("click", () => {
    mainTextbox.value = "";
  });

  clearLargeTextboxButton.addEventListener("click", () => {
    largeTextbox.value = "";
  });

  sendButton.addEventListener("click", () => {
    const textToSpeak = mainTextbox.value;
    if (textToSpeak) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = "es-ES"; // Puedes cambiar el idioma si es necesario
      window.speechSynthesis.speak(utterance);
    }
  });

  // Manejar los botones de categoría y cargar pictogramas
  document.addEventListener("DOMContentLoaded", () => {
    const categoryButtons = document.querySelectorAll(
      "#category-container .category-button"
    );
    const pictogramContainer = document.getElementById("pictogram-container");

    const pictograms = {
      saludo: [
        {
          src: "https://i.pinimg.com/236x/d0/5c/49/d05c490462edd8f16e9ca52b9c00976a.jpg",
          text: "Saludo 1",
        },
        {
          src: "https://i.pinimg.com/236x/1a/2d/19/1a2d19e7cb7952b56562dd94ae93ec97.jpg",
          text: "Saludo 2",
        },
      ],
      transporte: [
        {
          src: "https://i.pinimg.com/236x/d0/5c/49/d05c490462edd8f16e9ca52b9c00976a.jpg",
          text: "Transporte 1",
        },
        {
          src: "https://i.pinimg.com/236x/1a/2d/19/1a2d19e7cb7952b56562dd94ae93ec97.jpg",
          text: "Transporte 2",
        },
      ],
      amor: [
        {
          src: "https://i.pinimg.com/236x/36/9f/39/369f399c730a036d6e70b48aaee594c0.jpg",
          text: "Amor 1",
        },
        {
          src: "https://i.pinimg.com/236x/36/9f/39/369f399c730a036d6e70b48aaee594c0.jpg",
          text: "Amor 2",
        },
      ],
      deporte: [
        {
          src: "https://i.pinimg.com/236x/d0/5c/49/d05c490462edd8f16e9ca52b9c00976a.jpg",
          text: "Deporte 1",
        },
        {
          src: "https://i.pinimg.com/236x/1a/2d/19/1a2d19e7cb7952b56562dd94ae93ec97.jpg",
          text: "Deporte 2",
        },
      ],
    };

    categoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.getAttribute("data-category");
        loadPictograms(category);
      });
    });

    function loadPictograms(category) {
      pictogramContainer.innerHTML = ""; // Limpiar contenedor

      const items = pictograms[category] || [];
      items.forEach((item) => {
        const img = document.createElement("img");
        img.src = item.src;
        img.alt = item.text;
        img.title = item.text;
        img.addEventListener("click", () => {
          console.log(`Pictograma ${item.text} clickeado`);
        });
        pictogramContainer.appendChild(img);
      });
    }
  });
});
