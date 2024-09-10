
# Luganodes-Task-Ethereum-Deposit-Tracker

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Docker Setup](#docker-setup)
  - [Docker Installation](#docker-installation)
  - [Running the Application with Docker](#running-the-application-with-docker)
  - [Stopping the Application](#stopping-the-application)
- [Prometheus and Grafana Setup](#prometheus-and-grafana-setup)
  - [Exposing Metrics](#exposing-metrics)
  - [Prometheus Configuration](#prometheus-configuration)
  - [Grafana Dashboard](#grafana-dashboard)
  - [Creating Alerts](#creating-alerts)
- [Telegram Notifications](#telegram-notifications)
- [Troubleshooting](#troubleshooting)


## Introduction
The Ethereum Deposit Tracker is designed to monitor ETH deposits to the Beacon Deposit Contract. It listens for real-time deposit events on the Ethereum blockchain, stores deposit information, and sends notifications through a variety of means, including Telegram. Additionally, the project integrates Prometheus and Grafana to visualize metrics and alert on deposit activity.

## Features
- Real-time Ethereum deposit tracking.
- Prometheus integration for metrics collection.
- Grafana integration for visualization and alerting.
- Telegram notifications for new deposits.

## Prerequisites
- Docker and Docker Compose installed on your machine.
- Prometheus and Grafana configured for monitoring and alerting.
- A Telegram bot API token for notifications (optional).

## Environment Variables
Create a `.env` file in the root directory of the project and configure the following:

```bash
INFURA_PROJECT_ID=your-infura-project-id
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
TELEGRAM_CHAT_ID=your-telegram-chat-id
ETH_CONTRACT_ADDRESS=0x00000000219ab540356cBB839Cbe05303d7705Fa
PORT=5000
PROMETHEUS_PORT=9090
```

## Installation
If running outside Docker, install the dependencies locally:

```bash
npm install
```

## Running the Application

### Run Locally
```bash
node app.js
```
However, I recommend running via Docker for easier setup.

## Docker Setup

### Docker Installation
Make sure you have Docker installed on your machine. You can follow the official instructions [here](https://docs.docker.com/get-docker/).

### Running the Application with Docker
To build and run the Docker container for the project, use the following commands:

#### Build the Docker image:
```bash
docker build -t eth-deposit-tracker .
```
#### Run the Docker container:
```bash
docker-compose up -d
```
This will run the application, Prometheus, and Grafana all at once using docker-compose.

### Stopping the Application
To stop the Docker containers:

```bash
docker-compose down
```

## Prometheus and Grafana Setup

### Exposing Metrics
Metrics from the Ethereum Deposit Tracker are exposed at the `/metrics` endpoint. The app collects metrics such as deposit counts and exposes them for Prometheus to scrape.

### Prometheus Configuration
In your `prometheus.yml`, make sure you have a job defined for scraping the `/metrics` endpoint:

```yaml
scrape_configs:
  - job_name: 'eth-deposit-tracker'
    static_configs:
      - targets: ['eth-deposit-tracker:5000']
```

Once configured, restart Prometheus and ensure it’s successfully scraping the metrics from the deposit tracker.

### Grafana Dashboard
1. Install Grafana by following the instructions from [Grafana's official website](https://grafana.com/get).
2. Add Prometheus as a data source in Grafana.
3. Create a dashboard to visualize the metrics exposed by the `/metrics` endpoint.

### Creating Alerts
You can set up Grafana alerts based on the metrics collected. For example, you can create an alert that triggers when a new Ethereum deposit is detected.

1. Go to your Grafana dashboard.
2. Click on "Alert" and configure it based on the metric `eth_deposit_count`.
3. Set up notifications to be sent via the channel of your choice (e.g., email, Slack).

## Telegram Notifications
This project includes a feature for sending Telegram notifications when a new deposit is detected.

### Setup
1. Create a Telegram bot by following the instructions [here](https://core.telegram.org/bots#botfather).
2. Add your bot token and chat ID to the `.env` file.
3. The application will automatically send deposit alerts to your specified chat.

## Troubleshooting

- **Permission Issues**: If Docker commands fail with permission errors, try adding your user to the Docker group:
  
  ```bash
  sudo usermod -aG docker $USER
  ```
  Then log out and log back in for changes to take effect.

- **Metrics Not Showing in Prometheus**: Ensure that your `prometheus.yml` configuration is correct, and Prometheus is able to scrape the metrics from the specified `/metrics` endpoint.

- **Telegram Bot Issues**: Double-check your bot token and chat ID in the `.env` file. Also, verify that your bot has permission to send messages to your chat.


