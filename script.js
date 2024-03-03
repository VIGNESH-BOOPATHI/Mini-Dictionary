document.addEventListener('DOMContentLoaded', function() {
    const wordInput = document.getElementById('wordInput');
    const searchButton = document.getElementById('searchButton');
    const definitionElement = document.querySelector('.definition');
  
    // Add event listener to the search button
    searchButton.addEventListener('click', async function() {
      const word = wordInput.value.trim();
      if (word !== '') {
        try {
          // Fetch definition data for the input word
          const definitionData = await fetchDefinition(word);
          // Display the definition on the webpage
          displayDefinition(definitionData);
        } catch (error) {
          console.error('Error fetching definition:', error);
        }
      }
    });
  
    // Function to fetch definition data from the API
    async function fetchDefinition(word) {
      try {
        // Fetch data from the API using the input word
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        // Check if the response is successful
        if (!response.ok) {
          throw new Error('Failed to fetch definition');
        }
        // Parse the JSON response and return it
        return await response.json();
      } catch (error) {
        // If an error occurs during fetching or parsing, throw the error
        throw error;
      }
    }
  
    // Function to display definition data on the webpage
    function displayDefinition(definitionData) {
      // Check if definitionData contains any entries
      if (definitionData.length > 0) {
        let html = '';
        // Loop through each entry in definitionData
        definitionData.forEach(entry => {
          // Check if meanings array is present in the entry
          if (entry.meanings.length > 0) {
            // Extract definition and part of speech from the entry
            const meanings = entry.meanings[0];
            const definition = meanings.definitions[0]?.definition || 'No definition found';
            const partOfSpeech = meanings.partOfSpeech || 'No part of speech found';
  
            // Construct HTML for definition and part of speech
            html += `<div class="meaning">
              <p><strong>Definition:</strong> ${definition}</p>
              <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>
            </div>
            <hr>`; // Add a horizontal line after each entry
          } else {
            // If meanings array is empty, display a message
            html += '<div class="meaning"><p>No definition found.</p></div><hr>';
          }
        });
  
        // Set the innerHTML of definitionElement to the constructed HTML
        definitionElement.innerHTML = html;
      } else {
        // If definitionData is empty, display a message
        definitionElement.innerHTML = '<p>No definition found.</p>';
      }
    }
  });
  