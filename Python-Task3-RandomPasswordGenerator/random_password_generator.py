import tkinter as tk
from tkinter import messagebox
import secrets
import string


# ---------------- WINDOW ----------------

window = tk.Tk()
window.title("Random Password Generator")
window.geometry("500x620")
window.resizable(False, False)
window.configure(bg="#eef3f8")


# ---------------- FUNCTIONS ----------------

def generate_password():
    try:
        length = int(length_entry.get())

        if length < 8:
            messagebox.showerror(
                "Invalid Length",
                "Password length must be at least 8 characters."
            )
            return

        characters = ""

        if uppercase_var.get():
            characters += string.ascii_uppercase

        if lowercase_var.get():
            characters += string.ascii_lowercase

        if numbers_var.get():
            characters += string.digits

        if symbols_var.get():
            characters += string.punctuation

        if not characters:
            messagebox.showerror(
                "No Character Type",
                "Please select at least two character types."
            )
            return

        selected_types = sum([
            uppercase_var.get(),
            lowercase_var.get(),
            numbers_var.get(),
            symbols_var.get()
        ])

        if selected_types < 2:
            messagebox.showerror(
                "Selection Required",
                "Please select at least two character types."
            )
            return

        password = ""

        # Guarantee at least one character from each selected type
        if uppercase_var.get():
            password += secrets.choice(string.ascii_uppercase)

        if lowercase_var.get():
            password += secrets.choice(string.ascii_lowercase)

        if numbers_var.get():
            password += secrets.choice(string.digits)

        if symbols_var.get():
            password += secrets.choice(string.punctuation)

        # Fill remaining characters
        while len(password) < length:
            password += secrets.choice(characters)

        # Shuffle password securely
        password_list = list(password)

        for i in range(len(password_list) - 1, 0, -1):
            j = secrets.randbelow(i + 1)
            password_list[i], password_list[j] = (
                password_list[j],
                password_list[i]
            )

        password = "".join(password_list)

        password_entry.config(state="normal")
        password_entry.delete(0, tk.END)
        password_entry.insert(0, password)
        password_entry.config(state="readonly")

        update_strength(password)

    except ValueError:
        messagebox.showerror(
            "Invalid Input",
            "Please enter a valid password length."
        )


def update_strength(password):
    score = 0

    if len(password) >= 8:
        score += 1

    if len(password) >= 12:
        score += 1

    if any(char.isupper() for char in password):
        score += 1

    if any(char.islower() for char in password):
        score += 1

    if any(char.isdigit() for char in password):
        score += 1

    if any(char in string.punctuation for char in password):
        score += 1

    if score <= 2:
        strength = "Weak"
        strength_color = "#e74c3c"

    elif score <= 4:
        strength = "Medium"
        strength_color = "#f39c12"

    else:
        strength = "Strong"
        strength_color = "#27ae60"

    strength_label.config(
        text=f"Password Strength: {strength}",
        fg=strength_color
    )


def copy_password():
    password = password_entry.get()

    if not password:
        messagebox.showwarning(
            "No Password",
            "Generate a password first."
        )
        return

    window.clipboard_clear()
    window.clipboard_append(password)

    messagebox.showinfo(
        "Copied",
        "Password copied to clipboard."
    )


def clear_password():
    password_entry.config(state="normal")
    password_entry.delete(0, tk.END)
    password_entry.config(state="readonly")

    strength_label.config(
        text="Password Strength: —",
        fg="#607080"
    )


# ---------------- TITLE ----------------

title = tk.Label(
    window,
    text="Password Generator",
    font=("Arial", 26, "bold"),
    bg="#eef3f8",
    fg="#1e3a5f"
)
title.pack(pady=(30, 5))


subtitle = tk.Label(
    window,
    text="Create a strong and secure password",
    font=("Arial", 12),
    bg="#eef3f8",
    fg="#607080"
)
subtitle.pack(pady=(0, 25))


# ---------------- MAIN CARD ----------------

card = tk.Frame(
    window,
    bg="white",
    padx=30,
    pady=25
)
card.pack(
    padx=30,
    fill="x"
)


# ---------------- LENGTH ----------------

length_label = tk.Label(
    card,
    text="Password Length",
    font=("Arial", 12, "bold"),
    bg="white",
    fg="#34495e"
)
length_label.pack(anchor="w")


length_entry = tk.Entry(
    card,
    font=("Arial", 14),
    relief="solid",
    bd=1
)
length_entry.insert(0, "12")
length_entry.pack(
    fill="x",
    pady=(8, 20)
)


# ---------------- OPTIONS ----------------

options_label = tk.Label(
    card,
    text="Include:",
    font=("Arial", 12, "bold"),
    bg="white",
    fg="#34495e"
)
options_label.pack(anchor="w")


uppercase_var = tk.BooleanVar(value=True)
lowercase_var = tk.BooleanVar(value=True)
numbers_var = tk.BooleanVar(value=True)
symbols_var = tk.BooleanVar(value=True)


uppercase_check = tk.Checkbutton(
    card,
    text="Uppercase Letters (A-Z)",
    variable=uppercase_var,
    bg="white",
    fg="#34495e",
    font=("Arial", 10),
    anchor="w"
)
uppercase_check.pack(fill="x")


lowercase_check = tk.Checkbutton(
    card,
    text="Lowercase Letters (a-z)",
    variable=lowercase_var,
    bg="white",
    fg="#34495e",
    font=("Arial", 10),
    anchor="w"
)
lowercase_check.pack(fill="x")


numbers_check = tk.Checkbutton(
    card,
    text="Numbers (0-9)",
    variable=numbers_var,
    bg="white",
    fg="#34495e",
    font=("Arial", 10),
    anchor="w"
)
numbers_check.pack(fill="x")


symbols_check = tk.Checkbutton(
    card,
    text="Symbols (!@#$...)",
    variable=symbols_var,
    bg="white",
    fg="#34495e",
    font=("Arial", 10),
    anchor="w"
)
symbols_check.pack(
    fill="x",
    pady=(0, 15)
)


# ---------------- GENERATE BUTTON ----------------

generate_button = tk.Button(
    card,
    text="Generate Password",
    font=("Arial", 13, "bold"),
    bg="#1e88e5",
    fg="white",
    activebackground="#1565c0",
    activeforeground="white",
    relief="flat",
    cursor="hand2",
    command=generate_password
)
generate_button.pack(
    fill="x",
    pady=(5, 8)
)


# ---------------- PASSWORD DISPLAY ----------------

password_entry = tk.Entry(
    window,
    font=("Arial", 13),
    justify="center",
    state="readonly",
    readonlybackground="white",
    relief="solid",
    bd=1
)
password_entry.pack(
    padx=30,
    fill="x",
    pady=(25, 10)
)


# ---------------- STRENGTH ----------------

strength_label = tk.Label(
    window,
    text="Password Strength: —",
    font=("Arial", 12, "bold"),
    bg="#eef3f8",
    fg="#607080"
)
strength_label.pack(pady=5)


# ---------------- ACTION BUTTONS ----------------

button_frame = tk.Frame(
    window,
    bg="#eef3f8"
)
button_frame.pack(pady=15)


copy_button = tk.Button(
    button_frame,
    text="Copy",
    font=("Arial", 11, "bold"),
    bg="#27ae60",
    fg="white",
    activebackground="#1e8449",
    relief="flat",
    cursor="hand2",
    command=copy_password,
    width=10
)
copy_button.pack(
    side="left",
    padx=5
)


clear_button = tk.Button(
    button_frame,
    text="Clear",
    font=("Arial", 11, "bold"),
    bg="#e8edf2",
    fg="#34495e",
    activebackground="#d5dde5",
    relief="flat",
    cursor="hand2",
    command=clear_password,
    width=10
)
clear_button.pack(
    side="left",
    padx=5
)


# ---------------- RUN ----------------

window.mainloop()