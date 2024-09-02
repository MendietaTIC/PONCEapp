document.addEventListener('DOMContentLoaded', () => {
  // Animación de las letras "PONCE"
  const ponceText = "PONCE";
  const lettersContainer = document.getElementById('letters');

  if (lettersContainer) {
    let delay = 0;
    ponceText.split('').forEach((letter) => {
      const span = document.createElement('span');
      span.textContent = letter;
      span.style.position = 'relative';
      span.style.display = 'inline-block';
      span.style.left = '100%'; // Posición inicial fuera de pantalla a la derecha
      span.style.opacity = '0'; // Oculto inicialmente

      // Animación
      setTimeout(() => {
        span.style.transition = 'left 0.5s ease, opacity 0.5s ease';
        span.style.left = '0'; // Mover letra a su posición correcta
        span.style.opacity = '1'; // Hacerla visible
      }, delay);

      delay += 500; // Incrementar el delay para la animación de cada letra
      lettersContainer.appendChild(span);
    });
  }

  // Barra de progreso y redirección a la segunda página
  const progressBar = document.getElementById('progress');
  if (progressBar) {
    progressBar.style.width = '0%'; // Inicializa la barra de progreso
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      progressBar.style.width = `${progress}%`;

      if (progress >= 100) {
        clearInterval(interval);
        // Redireccionar a la segunda página después de que la barra esté completa
        window.location.href = 'second.html';
      }
    }, 40); // Ajuste para que dure 4 segundos en total
  }
  
  // La parte del reconocimiento de voz y manejo de textboxes queda intacta
  try {
    recognition.start();
  } catch (error) {
    console.error("Error al iniciar el reconocimiento de voz:", error);
    micButton.textContent = "Error";
  }

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

  // Enviar texto usando síntesis de voz
  sendButton.addEventListener("click", () => {
    const textToSpeak = mainTextbox.value;
    if (textToSpeak) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'es-ES'; // Puedes cambiar el idioma si es necesario
      window.speechSynthesis.speak(utterance);
    }
  });
});
