async function getNewQuote() {
  const quoteText = document.getElementById("quoteText");
  const quoteAuthor = document.getElementById("quoteAuthor");

  // Add fade-out effect
  quoteText.classList.add("fade-out");
  quoteAuthor.classList.add("fade-out");

  // Wait for fade-out animation
  await new Promise((resolve) => setTimeout(resolve, 300));

  quoteText.innerHTML = '<div class="loading">Loading...</div>';
  quoteAuthor.textContent = "";

  try {
    // Try API Ninjas Quotes API (no CORS issues)
    const apiNinjasResponse = await fetchWithTimeout(
      "https://api.api-ninjas.com/v1/quotes?category=inspirational",
      {
        timeout: 5000,
        headers: {
          "X-Api-Key": "DEMO",
        },
      }
    );

    if (apiNinjasResponse && apiNinjasResponse.ok) {
      const data = await apiNinjasResponse.json();
      if (data && data.length > 0) {
        updateQuote(quoteText, quoteAuthor, data[0].quote, data[0].author);
        return;
      }
    }

    // Try DummyJSON Quotes API (reliable, no auth needed)
    const dummyResponse = await fetchWithTimeout(
      "https://dummyjson.com/quotes/random",
      { timeout: 5000 }
    );

    if (dummyResponse && dummyResponse.ok) {
      const data = await dummyResponse.json();
      updateQuote(quoteText, quoteAuthor, data.quote, data.author);
      return;
    }

    // Try Quotable API with CORS proxy
    const response = await fetchWithTimeout(
      "https://cors-anywhere.herokuapp.com/https://api.quotable.io/random",
      { timeout: 5000 }
    );

    if (response && response.ok) {
      const data = await response.json();
      updateQuote(quoteText, quoteAuthor, data.content, data.author);
      return;
    }

    // Try type.fit API
    const altResponse = await fetchWithTimeout("https://type.fit/api/quotes", {
      timeout: 5000,
    });
    if (altResponse && altResponse.ok) {
      const quotes = await altResponse.json();
      const q = quotes[Math.floor(Math.random() * quotes.length)];
      updateQuote(
        quoteText,
        quoteAuthor,
        q.text || q.content || "No quote available",
        q.author || "Unknown"
      );
      return;
    }

    // If all APIs failed, show error message
    throw new Error("All APIs failed");
  } catch (error) {
    console.error("Unable to fetch quotes from APIs:", error);
    // Show error message
    updateQuote(
      quoteText,
      quoteAuthor,
      "Unable to fetch quotes at the moment. Please check your internet connection and try again.",
      "System"
    );
  }
}

// Helper function to update quote with fade-in animation
function updateQuote(quoteTextEl, quoteAuthorEl, content, author) {
  quoteTextEl.textContent = `"${content}"`;
  quoteAuthorEl.textContent = `— ${author}`;

  // Remove fade-out and add fade-in
  quoteTextEl.classList.remove("fade-out");
  quoteAuthorEl.classList.remove("fade-out");
  quoteTextEl.classList.add("fade-in");
  quoteAuthorEl.classList.add("fade-in");

  // Remove fade-in class after animation completes
  setTimeout(() => {
    quoteTextEl.classList.remove("fade-in");
    quoteAuthorEl.classList.remove("fade-in");
  }, 500);
}

// Helper: fetch with timeout. Returns response or null on timeout/network error.
async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 5000, headers = {} } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(resource, {
      signal: controller.signal,
      headers: headers,
    });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    console.warn(`Fetch failed for ${resource}:`, err.message || err);
    return null;
  }
}

// Auto-init: call getNewQuote when the DOM is ready and wire a button if present
document.addEventListener("DOMContentLoaded", () => {
  // initial quote
  getNewQuote();

  // If there's a button with id "newQuoteBtn", wire it
  const btn = document.getElementById("newQuoteBtn");
  if (btn) btn.addEventListener("click", getNewQuote);
});
