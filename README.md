# To run this project on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost.
Typically at http://localhost:3000/



# Simple Contract DApp

This is a simple decentralized application (DApp) that interacts with a Solidity smart contract deployed on the Ethereum blockchain.

## Smart Contract

The smart contract (SimpleContract.sol) has the following functions:

1. `setValue(uint256 _newValue)`: Sets the value stored in the contract.
2. `getValue()`: Retrieves the current value stored in the contract.

## Frontend Application

The front-end application (index.html and app.js) provides a user interface to interact with the smart contract. It allows users to set a new value and view the current value stored in the contract.

### Prerequisites

- MetaMask extension installed in your browser.
- Ethereum account with testnet or mainnet Ether.

### Usage

1. Clone this repository.

2. Deploy the smart contract to the Ethereum blockchain using your preferred method (Remix, Truffle, etc.).

3. Replace `YOUR_CONTRACT_ADDRESS` in `app.js` with the deployed contract address.

4. Open `index.html` in a web browser.

5. Connect your MetaMask wallet to the DApp.

6. Enter a new value and click "Set Value" to update the contract.

7. The current value stored in the contract will be displayed on the page.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
