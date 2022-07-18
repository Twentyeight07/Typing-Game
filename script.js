const d = document,
  quotes = [
    "When you have eliminated the impossible, whatever remains, however improbable, must be the truth.",
    "There is nothing more deceptive than an obvious fact.",
    "I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.",
    "I never make exceptions. An exception disproves the rule.",
    "What one man can invent another can discover.",
    "Nothing clears up a case so much as stating it to another person.",
    "Education never ends, Watson. It is a series of lessons, with the greatest for the last.",
  ];
// store the list of words and the index of the word the player is currently typing
let words = [],
  wordIndex = 0;
//The starting time
let startTime = Date.now();
//page elements
const $quote = d.getElementById("quote"),
  $message = d.getElementById("message"),
  $typedValue = d.getElementById("typed-value");
$startBtn = d.getElementById("start");

d.addEventListener("click", (e) => {
  if (e.target === $startBtn) {
    const quoteIndex = Math.floor(Math.random() * quotes.length),
      quote = quotes[quoteIndex];
    //We put the array into a string
    words = quote.split(" ");
    //Reset the word Index for tracking
    wordIndex = 0;
    //Reset the input class
    $typedValue.className = "";

    //UI updates
    // Create an array of span elements so we can set a class
    const spanWords = words.map(function (word) {
      return `<span>${word} </span>`;
    });

    //Convert into a string and add it to the quote element
    $quote.innerHTML = spanWords.join("");
    //Highlight the first word
    $quote.childNodes[0].className = "highlight";
    // Clear any prior messages
    $message.innerText = "";

    // Setup the textbox
    // Clear the textbox
    $typedValue.value = "";
    //Set focus
    $typedValue.focus();

    //Start de timer
    startTime = new Date().getTime();
  }
});

d.addEventListener("input", (e) => {
  if (e.target === $typedValue) {
    //We need to get the current Word
    const currentWord = words[wordIndex],
      typedValue = $typedValue.value;
    //We compare if currentWord is the same typedValue by the user

    if (typedValue === currentWord && wordIndex === words.length - 1) {
      //This is the end of the sentence
      //Display 'Success' to the player
      const elapsedTime = new Date().getTime() - startTime;
      const message = `Congratulations! you finished in ${
        elapsedTime / 1000
      } seconds`;
      $message.innerHTML = message;
    } else if (typedValue.endsWith(" ") && typedValue.trim() === currentWord) {
      //This is not the end of sentence, just end of word
      //Clear the value for the next word
      $typedValue.value = "";
      $typedValue.className = " ";
      //Move to the next word
      wordIndex++;
      // reset the class name for all elements in quote
      for (let wordElement of $quote.childNodes) {
        wordElement.className = "";
      }
      // highlight the new word
      $quote.childNodes[wordIndex].className = "highlight";
    } else if (currentWord.startsWith(typedValue)) {
      //Currently correct
      //Highlight the next word
      $typedValue.classname = "normal";
    } else {
      //Error state
      $typedValue.className = "error";
    }
  }
});
