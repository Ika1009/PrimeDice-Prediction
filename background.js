let isRunning = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "start") {
        isRunning = true;
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var currentTab = tabs[0];
            if (currentTab) {
                chrome.tabs.sendMessage(currentTab.id, {action: message.action});
            }
        });
    }
    else if (message.action === "pause") {
        isRunning = false;
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var currentTab = tabs[0];
            if (currentTab) {
                chrome.tabs.sendMessage(currentTab.id, {action: message.action});
            }
        });
    }
    else if (message.type === "requestPrediction") {
        let prediction = requestPrediction(message.number);
        sendResponse({ prediction: prediction });
        // Sending the prediction back to popup.js
        chrome.runtime.sendMessage({type: "prediction", prediction: prediction});
    }
    else if (message.type === "getState") {
        // Send the current state back as a response
        sendResponse({state: isRunning ? "running" : "paused"});
    }
    return true; // keep the connection open for asynchronous sendResponse
});

function requestPrediction(latestNumber) {
    return parseFloat((Math.random() * 100).toFixed(2));
}

// function requestPrediction(latestNumber) {
//     const apiURL = "http://localhost:5000/predict";
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ number: latestNumber })
//     };

//     return fetch(apiURL, requestOptions)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`Server error: ${response.statusText}`);
//             }
//             return response.json();
//         });
// }
