// Sample of user data to use for login
const users = [
    { username: "LAlewis", password: "wffbsm1#" },
    { username: "Aron Cockroach", password: "123crashoutking" },
    { username: "Rojah Davasca", password: "Roja123#" },
    { username: "Michael Jackson", password: "passw246" },
    { username: "Sirisha Chodavarapu", password: "passw123" },
];

let loginAttempts = 0; // Initializes login attempts to 0

// Login form submission
document.getElementById("loginForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Checks if the user exists in the users array
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        window.location.href = "products.html"; // Redirects to product page on successful login
    } else {
        loginAttempts++;
        document.getElementById("errorMessage").innerText = "Invalid username or password.";
        
        if (loginAttempts >= 3) {
            window.location.href = "error.html"; // Redirects to error page after 3 failed attempts
        }
    }
});
