# DLC-link Chrome extension

Chrome extension to accept and broadcast Discreet Log Contracts

Install dependencies with:
```bash
npm install
```

# Running the application

## Running the test backend

Run the test backend with:
```bash
cd ../dlc-link-backend
cargo run
```

## Regtest

To run the application on regtest, start the bitcoind and electrs server using docker compose:
```bash
cd ../dlc-lib
docker-compose up
```

(To clear blockchain data run `docker-compose down -v`)

## Running the application as a Chrome extension

Build using:
```bash
npm run build
```

This will create a `dist` folder.
In Chrome, go to `Manage extensions`, enable `developer mode`, click `Load Unpack` and select the `dist` folder.
To clear data remove and re-load the extension.

## Running the application through the webpack development server

Change the `blockchainExplorerBaseUrl` in the configuration at `src/config.ts` to point to the proxy server:
```
  blockchainExplorerBaseUrl: 'http://localhost:8080/electrs/',
```

Start the server using:
```bash
npm start
```

# Storybook

Run storybook with:
```
npm run storybook
```
It is not fully working since removing `react-scripts` (some components have issues).