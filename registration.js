const registrationForm = document.getElementById("registrationForm");

registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const user = {
        name: name,
        email: email,
        mobile: mobile,
        password: password
    };

    localStorage.setItem("shreyUser", JSON.stringify(user));

    alert("Registration successful!");

    window.location.href = "login.html";
});