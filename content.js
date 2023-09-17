console.log("injected")
// Initialize the MutationObserver
const observer = new MutationObserver(extractDataFromPage);

// Listener for messages from popup
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {         console.log("GOT MESSAGE");
    if (message.action === "start") {
        console.log("GOT MESSAGE START");
        observer.observe(numbersDiv, { childList: true });
    } else if (message.action === "pause") {
        observer.disconnect();
        console.log("GOT MESSAGE START");
    }
});

let extractedData = [];

const numbersDiv = document.querySelector('.styles__PastBets-sc-179yjz-0.bHRowu');

// Function to extract the necessary data from the page
function extractDataFromPage() {
    const links = numbersDiv.querySelectorAll('a.Link-q08rh0-0.fObHbq');
    const firstNumber = parseFloat(links[0].textContent); // changed to first link
    const currentUnixTimestamp = Math.floor(Date.now() / 1000);
    console.log("getting the number: " + firstNumber)

    if (!extractedData.length || firstNumber !== extractedData[extractedData.length-1].number) {
        extractedData.push({
            number: firstNumber,
            timestamp: currentUnixTimestamp
        });
    }
}
