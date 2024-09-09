/**
 * Initializes a Web3 instance using Infura as the Ethereum provider.
 * The Infura URL is stored securely in environment variables.
 * Exports both the Web3 instance and the Ethereum contract address to interact with.
 */
const Web3 = require('web3');
const dotenv = require('dotenv');

dotenv.config();

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));

const contractAddress = process.env.CONTRACT_ADDRESS; ;

module.exports = {
    web3,
    contractAddress,
};
