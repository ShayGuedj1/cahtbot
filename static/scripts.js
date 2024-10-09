document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container');
    const messageInput = document.getElementById('message-input');

    function addBotMessage(message) {
        const botMessageDiv = document.createElement('div');
        botMessageDiv.classList.add('chat-message', 'bot-message');
        botMessageDiv.innerHTML = message;
        chatContainer.appendChild(botMessageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function addUserMessage(message) {
        const userMessageDiv = document.createElement('div');
        userMessageDiv.classList.add('chat-message', 'user-message');
        userMessageDiv.textContent = message;
        chatContainer.appendChild(userMessageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function sendMessage() {
        const message = messageInput.value;
        if (message.trim() === '') return;

        addUserMessage(message);

        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                addBotMessage(data.message);
            } else {
                addBotMessage('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            addBotMessage('Error: Unable to send message. Please try again.');
        });

        messageInput.value = '';
    }

    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    // Initial bot messages
    addBotMessage("Hi, what's your name?");

    // Simulate conversation flow
    let userName = '';
    let waitingForName = true;

    function handleUserInput(message) {
        if (waitingForName) {
            userName = message;
            waitingForName = false;
            setTimeout(() => {
                addBotMessage(`Hi ${userName}, nice to meet you!`);
                setTimeout(() => {
                    addBotMessage("My name is CloudBot and I am here to demonstrate a DevOps project for Shay Guedj.");
                    setTimeout(() => {
                        addBotMessage("Do you want more details? Please answer with yes/no");
                    }, 1000);
                }, 1000);
            }, 1000);
        } else {
            if (message.toLowerCase() === 'yes') {
                setTimeout(() => {
                    addBotMessage(`You can find more details here: <a href="https://github.com/ShayGuedj1/chatbot/blob/main/README.md" target="_blank">README</a>`);
                    setTimeout(() => {
                        addBotMessage("Have a nice day!!");
                    }, 1000);
                }, 1000);
            } else if (message.toLowerCase() === 'no') {
                setTimeout(() => {
                    addBotMessage("Well, this was fun, we should do it again sometime :)");
                    setTimeout(() => {
                        addBotMessage("Have a nice day!!");
                    }, 1000);
                }, 1000);
            } else {
                addBotMessage("Please answer with yes/no");
            }
        }
    }

    // Override sendMessage to handle conversation flow
    function sendMessage() {
        const message = messageInput.value;
        if (message.trim() === '') return;

        addUserMessage(message);
        handleUserInput(message);

        messageInput.value = '';
    }
});