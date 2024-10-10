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
- [Endpoints](#endpoints)
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
