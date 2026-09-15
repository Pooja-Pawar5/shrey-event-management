// =========================
// MOBILE NAVBAR
// =========================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});


// Close mobile menu after clicking a link

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function (item) {

    item.addEventListener("click", function () {
        navLinks.classList.remove("active");
    });

});


// =========================
// BOOKING FORM
// =========================

const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("bookingMessage");

bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();


    // Get form values

    const name = document.getElementById("name").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const email = document.getElementById("email").value.trim();

    const eventType = document.getElementById("eventType").value;

    const eventDate = document.getElementById("eventDate").value;

    const guests = document.getElementById("guests").value;

    const selectedPackage = document.getElementById("package").value;

    const message = document.getElementById("message").value.trim();


    // =========================
    // VALIDATION
    // =========================

    if (name === "") {

        showMessage("Please enter your full name.");

        return;
    }


    // Phone validation

    const phonePattern = /^[0-9]{10}$/;

    if (!phonePattern.test(phone)) {

        showMessage(
            "Please enter a valid 10-digit mobile number."
        );

        return;
    }


    // Email validation

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        showMessage(
            "Please enter a valid email address."
        );

        return;
    }


    // Event type validation

    if (eventType === "") {

        showMessage(
            "Please select an event type."
        );

        return;
    }


    // Date validation

    if (eventDate === "") {

        showMessage(
            "Please select your event date."
        );

        return;
    }


    // Guests validation

    if (guests === "" || guests <= 0) {

        showMessage(
            "Please enter the number of guests."
        );

        return;
    }


    // Package validation

    if (selectedPackage === "") {

        showMessage(
            "Please select a package."
        );

        return;
    }


    // =========================
    // SUCCESS
    // =========================

    bookingMessage.textContent =
        "🎉 Booking submitted successfully! We will contact you soon.";

    bookingMessage.style.color = "#2e8b57";


    // Display booking information in console

    console.log("===== SHREY EVENT BOOKING =====");

    console.log("Name:", name);

    console.log("Phone:", phone);

    console.log("Email:", email);

    console.log("Event Type:", eventType);

    console.log("Event Date:", eventDate);

    console.log("Guests:", guests);

    console.log("Package:", selectedPackage);

    console.log("Message:", message);


    // Clear form

    bookingForm.reset();

});


// =========================
// SHOW ERROR MESSAGE
// =========================

function showMessage(message) {

    bookingMessage.textContent = "⚠️ " + message;

    bookingMessage.style.color = "#d9534f";

}


// =========================
// EVENT DATE VALIDATION
// =========================

const eventDateInput =
    document.getElementById("eventDate");


// Get today's date

const today = new Date();

const year = today.getFullYear();

const month =
    String(today.getMonth() + 1).padStart(2, "0");

const day =
    String(today.getDate()).padStart(2, "0");


// Format date as YYYY-MM-DD

const todayDate =
    `${year}-${month}-${day}`;


// Prevent selecting past date

eventDateInput.setAttribute(
    "min",
    todayDate
);


// =========================
// CURRENT YEAR
// =========================

document.getElementById("year").textContent =
    new Date().getFullYear();
    // =========================
// RAZORPAY PAYMENT
// =========================

const payBtn = document.getElementById("payBtn");
const paymentMessage = document.getElementById("paymentMessage");

if (payBtn) {
    payBtn.addEventListener("click", async function () {

        // Get selected package
        const selectedPackage =
            document.getElementById("package").value;

        // Package amount
        const packagePrices = {
            Basic: 15000,
            Premium: 35000,
            Luxury: 75000
        };

        // Check package
        if (selectedPackage === "") {
            paymentMessage.textContent =
                "⚠️ Please select a package first.";
            paymentMessage.style.color = "#d9534f";
            return;
        }

        const amount = packagePrices[selectedPackage];

        paymentMessage.textContent =
            "Processing payment...";
        paymentMessage.style.color = "#c9a227";

        try {

            // Send amount to backend
            const response = await fetch(
                "http://localhost:5000/create-order",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        amount: amount
                    })
                }
            );

            const order = await response.json();

            // Razorpay checkout
            const options = {
                key: "YOUR_RAZORPAY_KEY_ID",

                amount: order.amount,

                currency: "INR",

                name: "Shrey Event Management",

                description:
                    selectedPackage + " Event Package",

                order_id: order.id,

                handler: function (response) {

                    paymentMessage.textContent =
                        "🎉 Payment successful! Payment ID: " +
                        response.razorpay_payment_id;

                    paymentMessage.style.color = "#2e8b57";

                    console.log(
                        "Payment ID:",
                        response.razorpay_payment_id
                    );

                    console.log(
                        "Order ID:",
                        response.razorpay_order_id
                    );
                },

                theme: {
                    color: "#c9a227"
                }
            };

            const razorpay =
                new Razorpay(options);

            razorpay.open();

        } catch (error) {

            console.error(error);

            paymentMessage.textContent =
                "❌ Payment could not be started.";

            paymentMessage.style.color = "#d9534f";
        }
    });
}