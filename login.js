const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const savedUser = localStorage.getItem("shreyUser");

    if (!savedUser) {
        alert("No account found. Please register first.");
        return;
    }

    const user = JSON.parse(savedUser);

    if (email === user.email && password === user.password) {

        localStorage.setItem("isLoggedIn", "true");

        alert("Login successful!");

        window.location.href = "dashboard.html";

    } else {
        alert("Invalid email or password!");
    }
});