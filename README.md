# Setup

1. Install MetaMask (Chrome Extension), Truffle, and Ganache
2. Run Ganache as local testnet blockchain node
3. Migrate Truffle: `truffle migrate --reset`
   - if you encounter error, delete json files in build/contracts, and then rerun the migration
4. Run lite-server: `npm run dev`
5. Change network to Ganache local testnet http://127.0.0.1:7545 (add this URL to custom RPC)
6. Login to MetaMask if you already have a wallet, or use Ganache's mnemonic to 'restore from seed phrase' for first time login
7. Use one address provided by Ganache as the active account
8. Refresh localhost:3000 (which is opened by lite-server)
9. You're now on the dApp


# Testing

1. Install Truffle and Ganache
2. Run Ganache as local testnet blockchain node
3. Migrate Truffle: `truffle migrate --reset`
   - if you encounter error, delete json files in build/contracts, and then rerun the migration
4. Run test suites: `truffle test`