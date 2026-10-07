const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

const loginMessage = document.getElementById("loginMessage");
const registerMessage = document.getElementById("registerMessage");

const dashboard = document.getElementById("dashboard");
const welcomeMessage = document.getElementById("welcomeMessage");

const logoutBtn = document.getElementById("logoutBtn");

const toggleButtons = document.querySelectorAll(".toggle-password");


/* SHOW REGISTER */

showRegister.addEventListener("click", () => {

    loginForm.classList.add("hidden");

    document.querySelector(".register-section")
        .classList.add("hidden");

    registerForm.classList.remove("hidden");

    clearMessages();

});


/* SHOW LOGIN */

showLogin.addEventListener("click", () => {

    registerForm.classList.add("hidden");

    loginForm.classList.remove("hidden");

    document.querySelector(".register-section")
        .classList.remove("hidden");

    clearMessages();

});


/* PASSWORD HASHING */

async function hashPassword(password) {

    const encoder = new TextEncoder();

    const data = encoder.encode(password);

    const hashBuffer =
        await crypto.subtle.digest("SHA-256", data);

    const hashArray =
        Array.from(new Uint8Array(hashBuffer));

    return hashArray
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");

}


/* REGISTER */

registerForm.addEventListener("submit", async (event) => {

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


    if (!name || !email || !password || !confirmPassword) {

        showMessage(
            registerMessage,
            "Please fill in all fields.",
            "error"
        );

        return;
    }


    if (password.length < 8) {

        showMessage(
            registerMessage,
            "Password must contain at least 8 characters.",
            "error"
        );

        return;
    }


    if (!/[0-9]/.test(password)) {

        showMessage(
            registerMessage,
            "Password must contain at least 1 number.",
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
        JSON.parse(localStorage.getItem("users")) || [];


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


    const hashedPassword =
        await hashPassword(password);


    const newUser = {

        name: name,

        email: email,

        password: hashedPassword

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


/* LOGIN */

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail")
            .value.trim()
            .toLowerCase();

    const password =
        document.getElementById("loginPassword")
            .value;


    if (!email || !password) {

        showMessage(
            loginMessage,
            "Please enter your email and password.",
            "error"
        );

        return;
    }


    const users =
        JSON.parse(localStorage.getItem("users")) || [];


    const hashedPassword =
        await hashPassword(password);


    const user =
        users.find(
            user =>
                user.email === email &&
                user.password === hashedPassword
        );


    if (!user) {

        showMessage(
            loginMessage,
            "Invalid email or password.",
            "error"
        );

        return;
    }


    localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
            name: user.name,
            email: user.email
        })
    );


    showDashboard(user);

});


/* DASHBOARD */

function showDashboard(user) {

    loginForm.classList.add("hidden");

    document.querySelector(".register-section")
        .classList.add("hidden");

    registerForm.classList.add("hidden");

    dashboard.classList.remove("hidden");

    welcomeMessage.textContent =
        `Welcome, ${user.name}! You are successfully logged in.`;

}


/* CHECK LOGIN SESSION */

function checkSession() {

    const loggedInUser =
        JSON.parse(
            localStorage.getItem("loggedInUser")
        );


    if (loggedInUser) {

        showDashboard(loggedInUser);

    }

}


/* LOGOUT */

logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("loggedInUser");

    dashboard.classList.add("hidden");

    loginForm.classList.remove("hidden");

    document.querySelector(".register-section")
        .classList.remove("hidden");

    loginForm.reset();

    clearMessages();

});


/* SHOW / HIDE PASSWORD */

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


/* MESSAGE */

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


/* CHECK SESSION ON PAGE LOAD */

checkSession();s