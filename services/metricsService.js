/**
 * Initializes Prometheus metrics for tracking the count of ETH deposits.
 * The `depositCounter` increments each time a deposit is detected, and the
 * Prometheus `register` is exported for exposing metrics to be scraped.
 */
const client = require('prom-client');

const depositCounter = new client.Counter({
    name: 'eth_deposit_count',
    help: 'Count of ETH deposits',
});

const registerPrometheusMetrics = client.register;

module.exports = {
    depositCounter,
    registerPrometheusMetrics,
};
