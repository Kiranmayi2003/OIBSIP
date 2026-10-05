# Login Authentication System

A frontend-based Login Authentication System built as part of the **Oasis Infobyte Web Development & Design Internship**.

The application allows users to create an account, log in using their registered credentials, and log out within the browser.

## Features

- User registration
- Login authentication
- Email validation through HTML form controls
- Password validation
- Minimum 6-character password requirement
- Confirm password matching
- Show/Hide password functionality
- Duplicate email detection
- Login error handling
- Successful login dashboard
- Logout functionality
- User data stored using browser Local Storage
- Responsive design for desktop and mobile devices
- Clean and modern user interface

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
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
3. Open `index.html` in any modern web browser.
4. Create an account.
5. Log in using the registered email and password.

No server or additional installation is required.

## How It Works

### Registration

Users provide their name, email address, password, and password confirmation.

The application validates the information and stores the registered user in the browser's Local Storage.

### Login

Users enter their registered email and password.

The application checks the stored credentials and displays a successful login dashboard when the credentials are correct.

### Logout

The **Logout** button returns the user to the login screen.

## Important Note

This project demonstrates frontend authentication concepts for internship and learning purposes.

For a production application, authentication should be handled through a secure backend with proper password hashing, session management, and database security.

## Internship

**Organization:** Oasis Infobyte  
**Track:** Web Development & Design  
**Level:** Level 2  
**Task:** Login Authentication System