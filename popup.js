document.addEventListener("DOMContentLoaded", function() {
    chrome.runtime.sendMessage({type: "getState"}, function(response) {
        const button = document.getElementById('toggleButton');
        button.innerText = response.state === "running" ? "Pause" : "Start";
    });
});

document.getElementById('toggleButton').addEventListener('click', function() {
    const currentText = this.innerText;

    if (currentText === 'Pause') {
        this.innerText = 'Start';
        chrome.runtime.sendMessage({action: "pause"});
    } else {
        this.innerText = 'Pause';
        chrome.runtime.sendMessage({action: "start"});
    }
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log(message);
    if (message.type === "prediction") {
        document.getElementById('prediction').textContent = message.prediction;
    }
});
