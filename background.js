chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "start" || message.action === "pause") {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var currentTab = tabs[0];
            if (currentTab) {
                chrome.tabs.sendMessage(currentTab.id, {action: message.action});
            }
        });
    }
    else if (message.type === "requestPrediction") {
        requestPrediction(message.number).then(data => {
            sendResponse({ prediction: data.prediction });
        }).catch(error => {
            console.error("Error fetching prediction:", error);
        });
    }
    return true;
});

function requestPrediction(latestNumber) {
    const apiURL = "http://localhost:5000/predict";
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: latestNumber })
    };

    return fetch(apiURL, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`);
            }
            return response.json();
        });
}
