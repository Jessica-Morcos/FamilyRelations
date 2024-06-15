// List of dictionary words
const dictionaryWords = ['parent', 'grandparent', 'sibling', 'cousin', 'child', 'niece', 'aunt', 'uncle'];
let selectedWords = [];
let wordIndexToReplace = null;

// Function to render the dictionary words
function renderDictionary(words) {
    const dictionary = document.getElementById('dictionary');
    dictionary.innerHTML = ''; // Clear previous words
    words.forEach(word => {
        const wordElement = document.createElement('span');
        wordElement.textContent = word;
        wordElement.addEventListener('click', () => addToSelectedWords(word));
        dictionary.appendChild(wordElement);
    });
}

// Function to render selected words in text input
function renderTextInput() {
    const textInput = document.getElementById('textInput');
    textInput.innerHTML = ''; 
    selectedWords.forEach((word, index) => {
        const wordElement = document.createElement('span');
        wordElement.textContent = word;
        wordElement.addEventListener('click', () => selectWordForReplacement(index));
        textInput.appendChild(wordElement);
        textInput.appendChild(document.createTextNode(' ')); 
    });
}

// Function to add word to selected words
function addToSelectedWords(word) {
    selectedWords.push(word);
    renderTextInput();
}

// Function to select a word for replacement
function selectWordForReplacement(index) {
    wordIndexToReplace = index;
    const replaceSelect = document.getElementById('replaceSelect');
    replaceSelect.innerHTML = ''; 
    dictionaryWords.forEach(word => {
        const optionElement = document.createElement('option');
        optionElement.value = word;
        optionElement.textContent = word;
        replaceSelect.appendChild(optionElement);
    });
    $('#replaceModal').modal('show');
}

// Function to confirm replacement
function confirmReplacement() {
    const replaceSelect = document.getElementById('replaceSelect');
    const replacementWord = replaceSelect.value;
    selectedWords[wordIndexToReplace] = replacementWord;
    renderTextInput();
    $('#replaceModal').modal('hide');
}


// Function to delete the selected word
function deleteWord() {
    if (wordIndexToReplace !== null) {
        selectedWords.splice(wordIndexToReplace, 1); 
        renderTextInput();
        $('#replaceModal').modal('hide');
    }
}
// Function to clear all selected words
function clearAllWords() {
    selectedWords = [];
    renderTextInput();
}


document.getElementById('replaceConfirmButton').addEventListener('click', confirmReplacement);


document.getElementById('deleteButton').addEventListener('click', deleteWord);


document.getElementById('clearButton').addEventListener('click', clearAllWords);

document.addEventListener('DOMContentLoaded', () => {
    renderDictionary(dictionaryWords);
});
