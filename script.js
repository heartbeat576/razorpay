// JavaScript for Razorpay Payment Integration

// Show payment details form based on selected payment type
function choosePaymentType(type) {
    document.getElementById('payment-type-selection').style.display = 'none';
    document.getElementById('payment-details-form').style.display = 'block';
    document.getElementById('card-type').value = type.charAt(0).toUpperCase() + type.slice(1) + " Card";
}

document.getElementById('payment-form').onsubmit = function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const amountInput = document.getElementById('amount').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;

    // Basic validation
    if (!amountInput || amountInput <= 0) {
        alert("Please enter a valid amount.");
        return;
    }
    if (cardNumber.length !== 16 || cvv.length !== 3) {
        alert("Please enter valid card details.");
        return;
    }

    // Convert amount from INR to paise (1 INR = 100 paise)
    const amountInPaise = amountInput * 100;

    // Simulating payment initiation process
    const options = {
        "key": "YOUR_KEY_ID", // Replace with your Razorpay Key ID
        "amount": amountInPaise, // Amount in paise
        "currency": "INR",
        "name": name,
        "description": "Test Transaction",
        "image": "https://your-logo-url.com/logo.png", // Replace with your logo
        "handler": function (response) {
            // Move to OTP stage
            moveToOTPStage(response.razorpay_payment_id);
        },
        "prefill": {
            "name": name,
            "email": email,
            "contact": phone
        },
        "theme": {
            "color": "#3399cc"
        }
    };

    const rzp = new Razorpay(options);
    rzp.open();
};

// Function to move to OTP stage after successful payment initiation
function moveToOTPStage(paymentId) {
    document.getElementById('payment-details-form').style.display = 'none';
    document.getElementById('otp-stage').style.display = 'block';
    document.getElementById('payment-id').innerText = paymentId;
}

// Handle OTP form submission
document.getElementById('otp-form').onsubmit = function(e) {
    e.preventDefault();
    const otp = document.getElementById('otp').value;

    if (otp === '123456') { // Simulated OTP check
        document.getElementById('otp-stage').style.display = 'none';
        document.getElementById('payment-success').style.display = 'block';
    } else {
        document.getElementById('otp-response').innerText = "Incorrect OTP. Please try again.";
    }
};
