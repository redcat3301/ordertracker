const API_KEY = 'AIzaSyBWkvsUZPm-t1KM8xWgrVyhwK09pS6jPpc';
const SHEET_ID = '1Xiha9IN2f5cyKKFAQY5pci2KcId_JzfvO_MwTcwf8kE';
const RANGE = 'Sheet1!A2:Z';

async function fetchOrderStatus() {
    const orderId = document.getElementById('order-id').value.trim();
    const orderInput = document.getElementById('order-id');
    const messageBox = document.getElementById('order-id-message');
    
    if (!orderId) {
        alert('Please enter an Order ID');
        return;
    }

    try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`);
        const data = await response.json();
        const rows = data.values;

        const order = rows.find(row => row[0] === orderId);

        if (order) {
            document.getElementById('order-id-display').innerText = order[0];
            document.getElementById('product-name').innerText = order[6];
            document.getElementById('status').innerText = order[9];
            document.getElementById('order-date').innerText = order[1];
            document.getElementById('payment-gateway').innerText = order[8];
            document.getElementById('customer-name').innerText = order[2]
            document.getElementById('order-info').classList.remove('hidden');

            // Success message
            //showMessage('Successful!', 'green');
            orderInput.style.border = '2px solid green';
        } else {
            // Error message
            //showMessage('Wrong Order ID. Please, check again.', 'red');
            orderInput.style.border = '2px solid red';
            document.getElementById('order-info').classList.add('hidden');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error retrieving order data. Please try again later.');
    }
}

function showMessage(message, color) {
    const messageBox = document.getElementById('order-id-message');
    messageBox.innerText = message;
    messageBox.style.color = color;
    messageBox.style.display = 'block';

    // setTimeout(() => {
    //     messageBox.style.display = 'none';
    // }, 10000); // Hide message after 1 minute (1000--->1second)
}

// Handle "Enter" key for form submission
document.getElementById('order-id').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        fetchOrderStatus();
    }
});
