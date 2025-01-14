# Ethereum Deposit Tracker
<!-- Content -->
## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
  - [Running Locally](#running-locally)
  - [Running with Docker](#running-with-docker)
- [Monitoring and Metrics](#monitoring-and-metrics)
  - [Prometheus Integration](#prometheus-integration)
  - [Grafana Dashboard](#grafana-dashboard)
- [Notifications](#notifications)
- [Troubleshooting](#troubleshooting)
- [Platform-Specific Notes](#platform-specific-notes)

## Introduction
The Ethereum Deposit Tracker is a tool designed to monitor ETH deposits to the Beacon Deposit Contract on the Ethereum blockchain. It provides real-time tracking of deposit events, metrics collection via Prometheus, visualization through Grafana, and notifications through Telegram.

## Features
- Real-time monitoring of Ethereum deposits
- Prometheus integration for metrics collection
- Grafana dashboard for data visualization
- Telegram notifications for new deposits
- Docker support for easy deployment
- Cross-platform compatibility (Ubuntu and Windows)

## Prerequisites
- Node.js (v14 or later)
- Docker and Docker Compose (optional, for containerized deployment)
- Git
- Infura Project ID (for Ethereum network access)
- Telegram Bot Token (optional, for notifications)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ethereum-deposit-tracker.git
   cd ethereum-deposit-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

Create a `.env` file in the project root directory with the following content:

```
INFURA_PROJECT_ID=your-infura-project-id
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
TELEGRAM_CHAT_ID=your-telegram-chat-id
ETH_CONTRACT_ADDRESS=0x00000000219ab540356cBB839Cbe05303d7705Fa
PORT=5000
PROMETHEUS_PORT=9090
```

Replace the placeholder values with your actual Infura Project ID and Telegram bot credentials.

## Running the Application

### Running Locally

To run the application without Docker:

```bash
node app.js
```

### Running with Docker

1. Build the Docker image:
   ```bash
   docker build -t ethereum-deposit-tracker .
   ```

2. Run the containers using Docker Compose:
   ```bash
   docker compose up -d
   ```

This command starts the Ethereum Deposit Tracker, Prometheus, and Grafana containers.

To stop the application:

```bash
docker compose down
```

## Monitoring and Metrics

### Prometheus Integration

Metrics are exposed at the `/metrics` endpoint. Ensure your `prometheus.yml` includes the following job:

```yaml
scrape_configs:
  - job_name: 'ethereum-deposit-tracker'
    static_configs:
      - targets: ['ethereum-deposit-tracker:5000']
```

### Grafana Dashboard

1. Access Grafana at `http://localhost:3000` (default credentials: admin/admin)
2. Add Prometheus as a data source
3. Import or create a dashboard to visualize the Ethereum deposit metrics

## Notifications

The application sends notifications to Telegram when new deposits are detected. Ensure you've configured the Telegram bot token and chat ID in the `.env` file.

## Troubleshooting

- **Docker permission issues**: On Ubuntu, add your user to the Docker group:
  ```bash
  sudo usermod -aG docker $USER
  ```
  Log out and back in for changes to take effect.

- **Metrics not appearing**: Verify Prometheus configuration and ensure it can reach the `/metrics` endpoint.

- **Telegram notifications not working**: Double-check your bot token and chat ID in the `.env` file.

## Platform-Specific Notes

### Ubuntu
- Install build essentials if you encounter compilation issues:
  ```bash
  sudo apt-get update
  sudo apt-get install build-essential
  ```

### Windows
- Use PowerShell or Command Prompt with admin privileges for Docker commands.
- If using WSL 2, ensure proper configuration with Docker Desktop.
- For Node.js native module issues, try `npm install --no-optional`.

