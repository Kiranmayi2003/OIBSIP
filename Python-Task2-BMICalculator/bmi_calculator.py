import tkinter as tk
from tkinter import messagebox


# ---------------- WINDOW ----------------

window = tk.Tk()
window.title("BMI Calculator")
window.geometry("420x650")
window.resizable(False, False)
window.configure(bg="#eef3f8")


# ---------------- FUNCTIONS ----------------

def calculate_bmi():
    try:
        weight = float(weight_entry.get())
        height = float(height_entry.get())

        if weight <= 0 or height <= 0:
            messagebox.showerror(
                "Invalid Input",
                "Please enter valid values."
            )
            return

        bmi = weight / (height ** 2)

        if bmi < 18.5:
            category = "Underweight"
            result_color = "#e67e22"

        elif bmi < 25:
            category = "Normal"
            result_color = "#27ae60"

        elif bmi < 30:
            category = "Overweight"
            result_color = "#f39c12"

        else:
            category = "Obese"
            result_color = "#e74c3c"

        result_label.config(
            text=f"BMI: {bmi:.2f}\nCategory: {category}",
            fg=result_color
        )

    except ValueError:
        messagebox.showerror(
            "Invalid Input",
            "Please enter valid values."
        )


def clear_fields():
    weight_entry.delete(0, tk.END)
    height_entry.delete(0, tk.END)

    result_label.config(
        text="",
        fg="#1e3a5f"
    )

    weight_entry.focus_set()


# ---------------- TITLE ----------------

title = tk.Label(
    window,
    text="BMI Calculator",
    font=("Arial", 26, "bold"),
    bg="#eef3f8",
    fg="#1e3a5f"
)
title.pack(pady=(35, 5))


subtitle = tk.Label(
    window,
    text="Check your Body Mass Index",
    font=("Arial", 12),
    bg="#eef3f8",
    fg="#607080"
)
subtitle.pack(pady=(0, 25))


# ---------------- INPUT CARD ----------------

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


# ---------------- WEIGHT ----------------

weight_label = tk.Label(
    card,
    text="Weight (kg)",
    font=("Arial", 12, "bold"),
    bg="white",
    fg="#34495e"
)
weight_label.pack(anchor="w")


weight_entry = tk.Entry(
    card,
    font=("Arial", 14),
    relief="solid",
    bd=1
)
weight_entry.pack(
    fill="x",
    pady=(8, 20)
)


# ---------------- HEIGHT ----------------

height_label = tk.Label(
    card,
    text="Height (m)",
    font=("Arial", 12, "bold"),
    bg="white",
    fg="#34495e"
)
height_label.pack(anchor="w")


height_entry = tk.Entry(
    card,
    font=("Arial", 14),
    relief="solid",
    bd=1
)
height_entry.pack(
    fill="x",
    pady=(8, 20)
)


# ---------------- KEYBOARD NAVIGATION ----------------

weight_entry.bind(
    "<Return>",
    lambda event: height_entry.focus_set()
)

height_entry.bind(
    "<Return>",
    lambda event: calculate_bmi()
)


# ---------------- CALCULATE BUTTON ----------------

calculate_button = tk.Button(
    card,
    text="Calculate BMI",
    font=("Arial", 13, "bold"),
    bg="#1e88e5",
    fg="white",
    activebackground="#1565c0",
    activeforeground="white",
    relief="flat",
    cursor="hand2",
    command=calculate_bmi
)
calculate_button.pack(
    fill="x",
    pady=(5, 8)
)


# ---------------- CLEAR BUTTON ----------------

clear_button = tk.Button(
    card,
    text="Clear",
    font=("Arial", 11),
    bg="#e8edf2",
    fg="#34495e",
    activebackground="#d5dde5",
    relief="flat",
    cursor="hand2",
    command=clear_fields
)
clear_button.pack(
    fill="x"
)


# ---------------- RESULT ----------------

result_label = tk.Label(
    window,
    text="",
    font=("Arial", 17, "bold"),
    bg="#eef3f8",
    fg="#1e3a5f"
)
result_label.pack(
    pady=30
)


# ---------------- BMI GUIDE ----------------

guide = tk.Label(
    window,
    text="BMI Guide\n"
         "Underweight: < 18.5   |   Normal: 18.5 - 24.9\n"
         "Overweight: 25 - 29.9   |   Obese: 30+",
    font=("Arial", 9),
    bg="#eef3f8",
    fg="#607080",
    justify="center"
)
guide.pack(
    pady=(0, 15)
)


# ---------------- RUN ----------------

weight_entry.focus_set()

window.mainloop()