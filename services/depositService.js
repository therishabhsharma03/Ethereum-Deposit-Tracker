const { web3, contractAddress } = require('./web3Service');
const { sendTelegramNotification } = require('./notificationService');
const { depositCounter } = require('./metricsService');
const { logger } = require('./loggerService');

/**
 * Fetches and processes deposit events from the Ethereum blockchain.
 * Checks the last 10 blocks, logs the deposit details, and sends notifications.
 */
const fetchDeposits = async () => {
    try {
        console.log('Fetching deposits...');
        const latestBlock = await web3.eth.getBlockNumber(); 
        // const latestBlock = 20714005; for testing purpose , as there were no transaction occuring at this perticular time

        const events = await web3.eth.getPastLogs({
            fromBlock: latestBlock - 10, 
            toBlock: 'latest',
            address: contractAddress,
        });

        for (const event of events) {
            const receipt = await web3.eth.getTransactionReceipt(event.transactionHash);
            const block = await web3.eth.getBlock(event.blockNumber);
            const decodeData = web3.eth.abi.decodeParameters(['bytes32','uint256','bytes32'], event.data);

            const deposit = {
                blockNumber: event.blockNumber,
                blockTimestamp: block.timestamp,
                fee: web3.utils.fromWei(receipt.gasUsed.toString(), 'ether'),
                hash: event.transactionHash,
                pubkey: decodeData[0],
            };

            const message = `New deposit detected:
            - Block Number: ${deposit.blockNumber}
            - Pubkey: ${deposit.pubkey}
            - Fee: ${deposit.fee} ETH
            - Transaction Hash: ${deposit.hash}
            - Block Timestamp: ${deposit.blockTimestamp}`;

            logger.info('New deposit detected:', deposit);
            depositCounter.inc(); // Increment deposit count
            await sendTelegramNotification(message);
        }
    } catch (error) {
        logger.error('Error fetching deposits:', error); 
    }
};

module.exports = {
    fetchDeposits, 
};
