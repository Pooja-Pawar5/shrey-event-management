const isLoggedIn = localStorage.getItem("isLoggedIn");
const savedUser = localStorage.getItem("shreyUser");

if (isLoggedIn !== "true" || !savedUser) {
    window.location.href = "login.html";
}

const user = JSON.parse(savedUser);

document.getElementById("userName").textContent = user.name;

document.getElementById("profileName").textContent = user.name;
document.getElementById("profileEmail").textContent = user.email;
document.getElementById("profileMobile").textContent = user.mobile;

document.getElementById("profileBtn").addEventListener("click", function () {

    const profileBox = document.getElementById("profileBox");

    if (profileBox.style.display === "block") {
        profileBox.style.display = "none";
    } else {
        profileBox.style.display = "block";
    }
});

document.getElementById("logoutBtn").addEventListener("click", function () {

    localStorage.removeItem("isLoggedIn");

    window.location.href = "login.html";
});