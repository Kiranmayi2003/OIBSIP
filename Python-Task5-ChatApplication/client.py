import socket
import threading
from datetime import datetime


# ---------------- CLIENT SETTINGS ----------------

HOST = "127.0.0.1"
PORT = 5000


# ---------------- USERNAME ----------------

username = input("Enter your username: ").strip()

if not username:
    username = "User"


# ---------------- CONNECT TO SERVER ----------------

client = socket.socket(
    socket.AF_INET,
    socket.SOCK_STREAM
)

try:
    client.connect((HOST, PORT))
except ConnectionRefusedError:
    print("\nCould not connect to the server.")
    print("Make sure server.py is running first.")
    client.close()
    exit()

client.send(username.encode("utf-8"))


# ---------------- RECEIVE MESSAGES ----------------

def receive_messages():

    while True:
        try:
            message = client.recv(1024)

            if not message:
                print("\nDisconnected from server.")
                break

            print("\n" + message.decode("utf-8"))
            print("You: ", end="", flush=True)

        except (ConnectionError, OSError):
            print("\nConnection to server lost.")
            break


# ---------------- SEND MESSAGES ----------------

def send_messages():

    while True:

        try:
            message = input("You: ")

            if message.lower() == "/quit":
                current_time = datetime.now().strftime("%H:%M:%S")
                print(f"[{current_time}] You left the chat.")

                try:
                    client.shutdown(socket.SHUT_RDWR)
                except:
                    pass

                client.close()
                break

            if message.strip():
                client.send(message.encode("utf-8"))

        except (ConnectionError, OSError, EOFError):
            break


# ---------------- START RECEIVING THREAD ----------------

receive_thread = threading.Thread(
    target=receive_messages,
    daemon=True
)

receive_thread.start()


# ---------------- START CHAT ----------------

print("\n" + "=" * 45)
print("          CHAT APPLICATION")
print("=" * 45)
print(f"Welcome, {username}!")
print("Type your message and press Enter.")
print("Type /quit to leave the chat.")
print("=" * 45)


# ---------------- SEND MESSAGES ----------------

send_messages()