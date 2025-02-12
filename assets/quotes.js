let quotes = []; // Store quotes globally
let previousQuote = ""; // Store the previous quote

// Function to fetch and store quotes
async function loadQuotes() {
    try {
        const response = await fetch('assets/quotes.txt'); // Fetch the quotes file
        const text = await response.text(); // Read as text
        quotes = text.split('\n').filter(q => q.trim() !== ""); // Convert to array and remove empty lines

        displayRandomQuote(); // Show a random quote initially
    } catch (error) {
        console.error("Error loading quotes:", error);
        document.getElementById('quote').innerText = "Failed to load quotes.";
    }
}

// Function to display a random quote
function displayRandomQuote() {
    if (quotes.length > 0) {
        const quoteElement = document.getElementById('quote');

        // Fade out effect
        quoteElement.style.opacity = "0";

        setTimeout(() => {
            // Select a random quote that is different from the previous one
            let randomQuote;
            do {
                randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            } while (randomQuote === previousQuote); // Ensure it's not the same as the last one

            quoteElement.innerText = randomQuote;
            previousQuote = randomQuote; // Update the previous quote

            // Fade in effect
            quoteElement.style.opacity = "1";
        }, 300); // Matches transition duration
    }
}

loadQuotes(); // Load quotes when the page loads
