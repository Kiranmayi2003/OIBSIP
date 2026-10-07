# Login Authentication System

A frontend-based Login Authentication System built as part of the **Oasis Infobyte Web Development & Design Internship**.

The application allows users to create an account, log in using their registered credentials, access a protected dashboard, and securely log out within the browser.

## Features

- User registration
- Email validation through HTML form controls
- Password validation
- Minimum 8-character password requirement
- At least 1 number required in the password
- Confirm password matching
- Show/Hide password functionality
- Duplicate email detection
- Login authentication
- Generic error message for incorrect credentials
- SHA-256 password hashing before storing passwords
- Login session using browser Local Storage
- Protected dashboard access based on login session
- Session cleared on logout
- Successful login dashboard
- Basic form validation
- Responsive design for desktop and mobile devices
- Clean and modern user interface

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- Web Crypto API
- Local Storage API

## Project Structure

```text
WebDev-L2-LoginAuthentication/
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to Run

1. Download or clone this repository.
2. Open the `WebDev-L2-LoginAuthentication` folder.
3. Open `index.html` in a modern web browser.
4. Create an account using a valid email and password.
5. Log in using the registered credentials.
6. Access the dashboard after successful authentication.
7. Use the Logout button to end the login session.

No server or additional installation is required.

## How It Works

### Registration

Users provide their name, email address, password, and password confirmation.

The application validates the registration details, checks for duplicate email addresses, and verifies that the password contains at least 8 characters and 1 number.

Before the password is stored, it is converted into a SHA-256 hash using the Web Crypto API.

### Login

Users enter their registered email and password.

The entered password is hashed using SHA-256 and compared with the stored password hash.

If the credentials are valid, a login session is created in Local Storage and the user is shown the dashboard.

If the credentials are incorrect, a general **"Invalid email or password"** message is displayed.

### Protected Dashboard

The dashboard is displayed only when a valid login session exists.

When the page loads, the application checks Local Storage for the active login session. If no session exists, the login screen remains visible.

### Logout

The **Logout** button removes the active login session from Local Storage and returns the user to the login screen.

## Security Note

This project demonstrates frontend authentication concepts for internship and learning purposes.

Although passwords are hashed using SHA-256 instead of being stored directly, frontend-only authentication with Local Storage is **not suitable for production applications**.

A production authentication system should use a secure backend, a password-hashing algorithm such as bcrypt or Argon2, secure session handling, and a protected database.

## Internship

**Organization:** Oasis Infobyte  
**Track:** Web Development & Design  
**Level:** Level 2  
**Task:** Login Authentication System