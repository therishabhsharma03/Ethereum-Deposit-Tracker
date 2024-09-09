/**
 * Express server setup to periodically fetch Ethereum deposit events and expose Prometheus metrics.
 * Deposits are fetched every 60 seconds, and the /metrics endpoint allows Prometheus to scrape metrics.
 */
const express = require('express');
const dotenv = require('dotenv');
const { fetchDeposits } = require('./services/depositService');
const { registerPrometheusMetrics } = require('./services/metricsService');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Fetch deposits every 60 seconds
setInterval(fetchDeposits, 60000);

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', registerPrometheusMetrics.contentType);
    res.end(await registerPrometheusMetrics.metrics());
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
