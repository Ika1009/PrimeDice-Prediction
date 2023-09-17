chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Check for action in the message
    if (message.action === "start" || message.action === "pause") {
        // Get the active tab
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var currentTab = tabs[0];
            if (currentTab) {
                // Send the message directly to the content script in the active tab
                chrome.tabs.sendMessage(currentTab.id, {action: message.action});
            }
        });
    }
});
