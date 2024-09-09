
# **Ethereum Deposit Tracker**

## **Table of Contents**

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Prometheus and Grafana Setup](#prometheus-and-grafana-setup)
  - [Exposing Metrics](#exposing-metrics)
  - [Prometheus Configuration](#prometheus-configuration)
  - [Grafana Dashboard](#grafana-dashboard)
  - [Creating Alerts](#creating-alerts)
- [Telegram Notifications](#telegram-notifications)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## **Introduction**

Ethereum Deposit Tracker is a Node.js-based project that monitors Ethereum Beacon Chain deposits using Infura as a blockchain provider. The tracker captures deposit events from the Beacon Deposit Contract and logs key details such as the block number, timestamp, fee, transaction hash, and public key of the deposit. Additionally, it provides metrics via a `/metrics` endpoint for Prometheus, integrates Telegram notifications for real-time alerts, and visualizes deposit data using a Grafana dashboard.

## **Features**

- Monitors Ethereum Beacon Chain deposits in real time.
- Tracks details of deposits, such as block number, timestamp, gas fee, transaction hash, and public key.
- Logs deposit data using the `winston` logger.
- Provides Prometheus metrics to monitor deposits.
- Sends Telegram alerts for new deposits.
- Visualizes deposit data in Grafana.

## **Prerequisites**

Before setting up this project, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [NPM](https://www.npmjs.com/)
- [Prometheus](https://prometheus.io/) (for metrics collection)
- [Grafana](https://grafana.com/) (for data visualization)

## **Environment Variables**

The project requires the following environment variables for configuration:

```
PORT=5000
TELEGRAM_BOT_TOKEN=<your_telegram_bot_token>
TELEGRAM_CHAT_ID=<your_telegram_chat_id>
INFURA_PROJECT_ID=<your_infura_project_id>
PROMETHEUS_PORT=9100
```

- `TELEGRAM_BOT_TOKEN`: Your Telegram bot token for sending notifications.
- `TELEGRAM_CHAT_ID`: Chat ID where notifications will be sent.
- `INFURA_PROJECT_ID`: Your Infura project ID for Ethereum blockchain interaction.
- `PROMETHEUS_PORT`: The port on which Prometheus will scrape the data from your `/metrics` endpoint.

## **Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/eth-deposit-tracker.git
   ```

2. Navigate to the project directory:

   ```bash
   cd eth-deposit-tracker
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file and fill in the environment variables as described in the [Environment Variables](#environment-variables) section.

## **Running the Application**

To start the application, run the following command:

```bash
npm start
```

This will start the server on the port specified in your `.env` file (default is 5000) and begin tracking Ethereum deposits. The application will also expose a `/metrics` endpoint for Prometheus to scrape metrics.

## **Prometheus and Grafana Setup**

### **Exposing Metrics**

The `/metrics` endpoint exposes the following metrics:

- `eth_deposit_count`: Number of new deposits detected.

You can scrape this data using Prometheus.

### **Prometheus Configuration**

1. Install [Prometheus](https://prometheus.io/download/).
2. Open your `prometheus.yml` configuration file and add the following target under the `scrape_configs` section:

   ```yaml
   scrape_configs:
     - job_name: 'eth-deposit-tracker'
       static_configs:
         - targets: ['localhost:5000']  # Replace with the actual IP and port if needed
   ```

3. Start Prometheus and ensure it's scraping the metrics from your `/metrics` endpoint.

   ```bash
   prometheus --config.file=prometheus.yml
   ```

4. Verify that `localhost:5000` appears in Prometheus under "Targets" (you can access this via `http://localhost:9090/targets`).

### **Grafana Dashboard**

1. Install [Grafana](https://grafana.com/docs/grafana/latest/setup/install/).
2. Log in to Grafana (`http://localhost:3000`).
3. Add Prometheus as a data source.
4. Create a new dashboard and add a panel to visualize `eth_deposit_count`.
   - Set the data source to Prometheus.
   - Query: `eth_deposit_count`
5. Save the dashboard.

### **Creating Alerts**

1. In Grafana, navigate to your dashboard.
2. Edit the panel where you visualize the deposits.
3. Go to the "Alerts" tab and create a new alert.
4. Set conditions (e.g., `eth_deposit_count > 0`).
5. Configure the notification channel (e.g., Slack, Email, or Telegram) for alerts.
6. Save the alert configuration.

## **Telegram Notifications**

To enable Telegram notifications:

1. Create a new bot using [BotFather](https://core.telegram.org/bots#botfather) on Telegram and get the `TELEGRAM_BOT_TOKEN`.
2. Find your chat ID by messaging the bot and using the Telegram API to get your chat ID.
3. Ensure you have `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` set in your `.env` file.
4. When a new deposit is detected, a notification with the deposit details will be sent to your Telegram chat.

## **Troubleshooting**

### **Common Issues:**

1. **Undefined Pubkey:**
   - Ensure that you're correctly decoding the `data` field using `web3.eth.abi.decodeParameters`. Refer to the contract ABI for the correct parameter types.

2. **Prometheus Targets Not Appearing:**
   - Check the `prometheus.yml` file and ensure the target `localhost:5000` is added correctly under `scrape_configs`.
   - Ensure that your application exposes the `/metrics` endpoint.

3. **Telegram Notifications Not Sending:**
   - Verify that the `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are correctly set in the `.env` file.
   - Check that the Telegram bot has permissions to send messages to your chat.

## **Contributing**

If you would like to contribute to this project, feel free to open an issue or submit a pull request. Contributions are always welcome!

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

# Luganodes-Task-Ethereum-Deposit-Tracker
