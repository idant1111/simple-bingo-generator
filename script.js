document.getElementById('generateButton').addEventListener('click', generateBoard);
document.getElementById('boardSize').addEventListener('change', updateInputBoxes);
document.getElementById('generateInitialValuesButton').addEventListener('click', generateInitialValues);
document.getElementById('downloadButton').addEventListener('click', downloadBoard);

function updateInputBoxes() {
    const size = parseInt(document.getElementById('boardSize').value);
    const requiredPhrases = size * size + size;
    const inputArea = document.getElementById('inputArea');
    inputArea.innerHTML = ''; // Clear the input area

    for (let i = 0; i < requiredPhrases; i++) {
        addPhraseInput();
    }
}

function addPhraseInput() {
    const phraseInputContainer = document.createElement('div');
    phraseInputContainer.classList.add('phrase-input');

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.className = 'phrase';
    inputField.placeholder = 'Enter a phrase...';

    phraseInputContainer.appendChild(inputField);

    document.getElementById('inputArea').appendChild(phraseInputContainer);
}

function generateBoard() {
    const size = parseInt(document.getElementById('boardSize').value);
    const requiredPhrases = size * size + size;
    const phrases = Array.from(document.getElementsByClassName('phrase')).map(input => input.value.trim()).filter(Boolean);
    
    if (phrases.length < requiredPhrases) {
        alert(`Please enter at least ${requiredPhrases} phrases.`);
        return;
    }

    shuffleArray(phrases);

    const bingoCanvas = document.getElementById('bingoCanvas');
    const ctx = bingoCanvas.getContext('2d');
    const squareSize = 100;
    bingoCanvas.width = size * squareSize;
    bingoCanvas.height = size * squareSize;

    // Set background to white before drawing anything else
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, bingoCanvas.width, bingoCanvas.height);

    // Set text and border styles
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black'; // Text color
    ctx.strokeStyle = 'black'; // Border color

    // Draw phrases and grid
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const phrase = phrases.pop();
            const x = col * squareSize;
            const y = row * squareSize;
            ctx.strokeRect(x, y, squareSize, squareSize);
            ctx.fillText(phrase, x + squareSize / 2, y + squareSize / 2, squareSize - 10);
        }
    }

    bingoCanvas.style.display = 'block';
    document.getElementById('downloadButton').style.display = 'block';
}

function downloadBoard() {
    const bingoCanvas = document.getElementById('bingoCanvas');
    if (!bingoCanvas) {
        alert("Canvas element not found. Please generate the board first.");
        return;
    }

    const dataURL = bingoCanvas.toDataURL("image/png");

    const link = document.createElement('a');
    link.download = 'bingo-board.png';
    link.href = dataURL;
    document.body.appendChild(link); // Append link to the body
    link.click(); // Simulate click to trigger download
    document.body.removeChild(link); // Remove link after triggering download

    // Trigger confetti after the board has been downloaded
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#bb0000', '#ffffff'],
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function generateInitialValues() {
    const size = parseInt(document.getElementById('boardSize').value);
    const requiredPhrases = size * size + size;
    const inputFields = document.getElementsByClassName('phrase');

    for (let i = 0; i < requiredPhrases; i++) {
        if (inputFields[i]) {
            inputFields[i].value = `Phrase ${i + 1}`;
        }
    }
}

// Automatically generate input boxes on page load based on the default board size
updateInputBoxes();

// Initialize particles.js
particlesJS('particles-js',
  {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        }
      },
      "opacity": {
        "value": 0.3,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 0.5,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  }
);
