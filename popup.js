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

// Assuming background script will send a message with the prediction number
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.prediction) {
        document.getElementById('prediction').textContent = message.prediction;
    }
});