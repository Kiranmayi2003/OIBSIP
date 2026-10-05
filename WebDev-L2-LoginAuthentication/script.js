const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

const loginMessage = document.getElementById("loginMessage");
const registerMessage = document.getElementById("registerMessage");

const dashboard = document.getElementById("dashboard");
const welcomeMessage = document.getElementById("welcomeMessage");

const logoutBtn = document.getElementById("logoutBtn");

const toggleButtons =
    document.querySelectorAll(".toggle-password");


/* =========================
   SHOW REGISTER
========================= */

showRegister.addEventListener("click", () => {

    loginForm.classList.add("hidden");

    document.querySelector(".register-section")
        .classList.add("hidden");

    registerForm.classList.remove("hidden");

    clearMessages();
});


/* =========================
   SHOW LOGIN
========================= */

showLogin.addEventListener("click", () => {

    registerForm.classList.add("hidden");

    loginForm.classList.remove("hidden");

    document.querySelector(".register-section")
        .classList.remove("hidden");

    clearMessages();
});


/* =========================
   REGISTER
========================= */

registerForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name =
        document.getElementById("registerName")
            .value.trim();

    const email =
        document.getElementById("registerEmail")
            .value.trim()
            .toLowerCase();

    const password =
        document.getElementById("registerPassword")
            .value;

    const confirmPassword =
        document.getElementById("confirmPassword")
            .value;


    if (password.length < 6) {

        showMessage(
            registerMessage,
            "Password must contain at least 6 characters.",
            "error"
        );

        return;
    }


    if (password !== confirmPassword) {

        showMessage(
            registerMessage,
            "Passwords do not match.",
            "error"
        );

        return;
    }


    const users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];


    const existingUser =
        users.find(user => user.email === email);


    if (existingUser) {

        showMessage(
            registerMessage,
            "An account with this email already exists.",
            "error"
        );

        return;
    }


    const newUser = {
        name: name,
        email: email,
        password: password
    };


    users.push(newUser);

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );


    showMessage(
        registerMessage,
        "Account created successfully!",
        "success"
    );


    registerForm.reset();


    setTimeout(() => {

        registerForm.classList.add("hidden");

        loginForm.classList.remove("hidden");

        document.querySelector(".register-section")
            .classList.remove("hidden");

        clearMessages();

    }, 1000);
});


/* =========================
   LOGIN
========================= */

loginForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail")
            .value.trim()
            .toLowerCase();

    const password =
        document.getElementById("loginPassword")
            .value;


    const users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];


    const user =
        users.find(
            user =>
                user.email === email &&
                user.password === password
        );


    if (!user) {

        showMessage(
            loginMessage,
            "Invalid email or password.",
            "error"
        );

        return;
    }


    showDashboard(user);
});


/* =========================
   DASHBOARD
========================= */

function showDashboard(user) {

    loginForm.classList.add("hidden");

    document.querySelector(".register-section")
        .classList.add("hidden");

    registerForm.classList.add("hidden");

    dashboard.classList.remove("hidden");

    welcomeMessage.textContent =
        `Welcome, ${user.name}! You are successfully logged in.`;
}


/* =========================
   LOGOUT
========================= */

logoutBtn.addEventListener("click", () => {

    dashboard.classList.add("hidden");

    loginForm.classList.remove("hidden");

    document.querySelector(".register-section")
        .classList.remove("hidden");

    loginForm.reset();

    clearMessages();
});


/* =========================
   SHOW / HIDE PASSWORD
========================= */

toggleButtons.forEach(button => {

    button.addEventListener("click", () => {

        const input =
            document.getElementById(
                button.dataset.target
            );


        if (input.type === "password") {

            input.type = "text";

            button.textContent = "Hide";

        } else {

            input.type = "password";

            button.textContent = "Show";
        }
    });
});


/* =========================
   MESSAGE
========================= */

function showMessage(element, message, type) {

    element.textContent = message;

    element.className =
        `message ${type}`;
}


function clearMessages() {

    loginMessage.textContent = "";

    registerMessage.textContent = "";

    loginMessage.className = "message";

    registerMessage.className = "message";
}