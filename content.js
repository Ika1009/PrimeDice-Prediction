console.log("injected");

// Create a new DOM element to display the prediction number
let predictionElement = document.createElement("h1"); // h1 for big text
predictionElement.style.fontSize = "2em"; // Set font size
predictionElement.style.color = "white"; // Set text color

// Append the prediction element to the body or any other container on the webpage
document.body.prepend(predictionElement);

// Initialize the MutationObserver
const observer = new MutationObserver(extractDataFromPage);

// Listener for messages from popup
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "start") {
        console.log("GOT MESSAGE START");
        observer.observe(numbersDiv, {childList: true});
    } else if (message.action === "pause") {
        observer.disconnect();
        console.log("GOT MESSAGE PAUSE");
    }
});

const numbersDiv = document.querySelector('.styles__PastBets-sc-179yjz-0.bHRowu');

// Function to extract the necessary data from the page
function extractDataFromPage() {
    const links = numbersDiv.querySelectorAll('a.Link-q08rh0-0.fObHbq');
    const firstNumber = parseFloat(links[0].textContent);

    console.log("getting the number: " + firstNumber)

    // Send message to background script to request prediction
    chrome.runtime.sendMessage({type: "requestPrediction", number: firstNumber}, response => {
        console.log("Response Data:", response);

        // Assuming 'response.prediction' contains the prediction number
        let prediction = response.prediction;

        // Update the text content of the predictionElement
        predictionElement.textContent = `Prediction Number: ${prediction}`;
        console.log(predictionElement);
    });
}
