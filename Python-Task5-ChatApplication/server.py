import socket
import threading
from datetime import datetime


# ---------------- SERVER SETTINGS ----------------

HOST = "127.0.0.1"
PORT = 5000

clients = []
usernames = []


# ---------------- BROADCAST MESSAGE ----------------

def broadcast(message, sender=None):
    for client in clients:
        if client != sender:
            try:
                client.send(message)
            except:
                remove_client(client)


# ---------------- REMOVE CLIENT ----------------

def remove_client(client):
    if client in clients:
        index = clients.index(client)

        clients.remove(client)

        if index < len(usernames):
            username = usernames.pop(index)

        client.close()


# ---------------- HANDLE CLIENT ----------------

def handle_client(client, address):
    try:
        username = client.recv(1024).decode("utf-8")

        clients.append(client)
        usernames.append(username)

        print(f"{username} connected from {address}")

        join_time = datetime.now().strftime("%H:%M:%S")

        join_message = (
            f"[{join_time}] {username} joined the chat."
        ).encode("utf-8")

        broadcast(join_message, client)

        while True:
            message = client.recv(1024)

            if not message:
                break

            text = message.decode("utf-8")

            current_time = datetime.now().strftime("%H:%M:%S")

            formatted_message = (
                f"[{current_time}] {username}: {text}"
            ).encode("utf-8")

            print(formatted_message.decode("utf-8"))

            broadcast(formatted_message, client)

    except ConnectionError:
        pass

    finally:
        if client in clients:
            index = clients.index(client)

            clients.remove(client)

            if index < len(usernames):
                username = usernames.pop(index)

            leave_time = datetime.now().strftime("%H:%M:%S")

            leave_message = (
                f"[{leave_time}] {username} left the chat."
            ).encode("utf-8")

            broadcast(leave_message)

            print(f"{username} disconnected.")

        client.close()


# ---------------- START SERVER ----------------

server = socket.socket(
    socket.AF_INET,
    socket.SOCK_STREAM
)

server.setsockopt(
    socket.SOL_SOCKET,
    socket.SO_REUSEADDR,
    1
)

server.bind((HOST, PORT))

server.listen()

print("=" * 45)
print("        CHAT APPLICATION SERVER")
print("=" * 45)
print(f"Server running on {HOST}:{PORT}")
print("Waiting for clients...")
print("Press Ctrl+C to stop the server.")
print("=" * 45)


# ---------------- ACCEPT CLIENTS ----------------

while True:

    client, address = server.accept()

    thread = threading.Thread(
        target=handle_client,
        args=(client, address)
    )

    thread.start()

    print(f"Active connections: {threading.active_count() - 1}")