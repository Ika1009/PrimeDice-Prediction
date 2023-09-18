console.log("injected");

// Initialize the MutationObserver
const observer = new MutationObserver(extractDataFromPage);

// Listener for messages from popup
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "start") {
        console.log("GOT MESSAGE START");
        observer.observe(numbersDiv, { childList: true });
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
    });
}
