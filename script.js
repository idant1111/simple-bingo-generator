document.getElementById('generateButton').addEventListener('click', generateBoard);
document.getElementById('boardSize').addEventListener('change', updateInputBoxes);
document.getElementById('inputArea').addEventListener('click', handleInputAreaClick);
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

function handleInputAreaClick(e) {
    if (e.target.classList.contains('addPhrase')) {
        addPhraseInput();
    } else if (e.target.classList.contains('removePhrase')) {
        removePhraseInput(e.target);
    }
}

function addPhraseInput() {
    const phraseInputContainer = document.createElement('div');
    phraseInputContainer.classList.add('phrase-input');

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.className = 'phrase';
    inputField.placeholder = 'Enter a phrase...';

    const addButton = document.createElement('button');
    addButton.type = 'button';
    addButton.className = 'addPhrase';
    addButton.textContent = '+';

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'removePhrase';
    removeButton.textContent = '-';
    removeButton.style.display = 'inline-block';

    phraseInputContainer.appendChild(inputField);
    phraseInputContainer.appendChild(addButton);
    phraseInputContainer.appendChild(removeButton);

    document.getElementById('inputArea').appendChild(phraseInputContainer);
}

function removePhraseInput(button) {
    const inputArea = document.getElementById('inputArea');
    const size = parseInt(document.getElementById('boardSize').value);
    const requiredPhrases = size * size + size;
    if (inputArea.children.length > requiredPhrases) {
        button.parentElement.remove();
    }
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

    const canvas = document.getElementById('bingoCanvas');
    const ctx = canvas.getContext('2d');
    const squareSize = 100;
    canvas.width = size * squareSize;
    canvas.height = size * squareSize;

    // Set background to white before drawing anything else
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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

    canvas.style.display = 'block';
    document.getElementById('downloadButton').style.display = 'block';
}

function downloadBoard() {
    const canvas = document.getElementById('bingoCanvas');
    if (!canvas) {
        alert("Canvas element not found. Please generate the board first.");
        return;
    }

    const dataURL = canvas.toDataURL("image/png");

    const link = document.createElement('a');
    link.download = 'bingo-board.png';
    link.href = dataURL;
    document.body.appendChild(link); // Append link to the body
    link.click(); // Simulate click to trigger download
    document.body.removeChild(link); // Remove link after triggering download
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
