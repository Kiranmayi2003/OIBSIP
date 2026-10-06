 # Chat Application

A real-time multi-client chat application built using Python socket programming and threading as part of the **Oasis Infobyte Python Programming Internship**.

## Features

- Real-time communication between multiple clients
- Client-server architecture
- Multiple users can connect simultaneously
- Username support
- Timestamped messages
- Join and leave notifications
- `/quit` command to leave the chat
- Multithreading for handling multiple clients
- Connection error handling

## Technologies Used

- Python
- Socket Programming
- Threading

## Project Structure

```text
Python-Task5-ChatApplication/
├── server.py
├── client.py
├── README.md
├── chat-server.png
├── chat-kiran.png
└── chat-arch.png
```

## How to Run

### 1. Start the Server

Open a terminal in the project folder and run:

```bash
python server.py
```

### 2. Start a Client

Open another terminal and run:

```bash
python client.py
```

Enter a username and start chatting.

### 3. Connect Multiple Clients

Open additional terminals and run `client.py` again with different usernames.

### 4. Leave the Chat

Type:

```text
/quit
```

to leave the chat.

## How It Works

The application uses a **client-server architecture**.

- The server listens for incoming client connections.
- Each connected client is handled using a separate thread.
- Messages are broadcast to connected clients.
- Usernames and timestamps are displayed with chat messages.
- Clients can leave the chat using the `/quit` command.

## Internship

**Organization:** Oasis Infobyte  
**Track:** Python Programming  
**Task:** Chat Application