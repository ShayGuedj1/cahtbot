# Chatbot Application

This repository contains the code for a chatbot application that interacts with users, stores messages in a PostgreSQL database, caches messages in Redis, and sends messages to a RabbitMQ queue. The application is containerized using Docker and orchestrated using Kubernetes.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
  - [Docker](#docker)
  - [Kubernetes](#kubernetes)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

The chatbot application is designed to demonstrate a DevOps project. It includes a frontend interface for users to interact with the chatbot, a backend Flask application to handle requests, and integration with PostgreSQL, Redis, and RabbitMQ.

## Features

- User interaction with the chatbot through a web interface.
- Storage of messages in a PostgreSQL database.
- Caching of messages in Redis.
- Sending messages to a RabbitMQ queue.
- Display of previous users in the UI.

## Technologies

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Flask (Python)
- **Database**: PostgreSQL
- **Caching**: Redis
- **Message Queue**: RabbitMQ
- **Containerization**: Docker
- **Orchestration**: Kubernetes

## Prerequisites

- Docker
- Kubernetes (Minikube or a Kubernetes cluster)
- kubectl

## Setup

### Docker

**Build the Docker Image**:
```sh
docker build -t Dockerfile .
```
Push the Docker Image to Docker Hub:
```sh
docker push <YOUR-DOCKER-REPOSITORY:TAG>
```
### Kubernetes

**Deploy the app on k8s**  
Apply Kubernetes Configurations:
```sh
kubectl apply -f k8s/
```
Verify the Deployment:
```sh
kubectl get pods
```
```sh
kubectl get services
```
### Usage  
Access the Chatbot Application:  
Open your web browser and navigate to the external IP of the chatbot-service service.  
The external IP can be obtained using:  
```sh
kubectl get services
```
Minikube: 
```sh
minikube service chatbot-service --url
```
**Interact with the Chatbot:**  
Enter your name and follow the conversation flow.  

Contributing
Contributions are welcome! Please open an issue or submit a pull request.

**License**  
This project is licensed under the MIT License. See the LICENSE file for details.

**Contact**  
For any questions or support, please contact  shayguedj1@gmail.com .


