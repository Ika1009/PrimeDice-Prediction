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

// Observe the numbersDiv for any childList mutations
const observer = new MutationObserver(extractDataFromPage);
observer.observe(numbersDiv, { childList: true });

// Function to save the accumulated extracted data as a CSV
function saveToCSV() {
    let csvContent = 'Number, Timestamp, IP\n';
    for (let item of extractedData) {
        csvContent += `${item.number}, ${item.timestamp}, 109.92.107.112\n`;
    }
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    // Naming the CSV to include the current date-time for uniqueness
    const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', '_').replace(/:/g, '-');
    a.download = `data_${currentDateTime}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// Schedule the save function to run every hour
setInterval(function() {
    saveToCSV();
}, 1800 * 1000);
