[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Solarity Front End

**Everything about Solarity ecosystem and more.**

## What

This repository hosts the Solarity front end website that is available [here](https://solarity.dev/). One of the amazing features of the site is Solidity tools:

- **ABI utilities**: `ABI` / `packed` encoder and decoder.
- **Hash functions**: `keccak256`, `sha256`, `ripemd160`, `poseidon16`.
- **Coverters**: `ether` units converter, number converter, hex to ascii converter.
- **UNIX epoch tools**: date to timestamp and timestamp to human data, duration converter.
- **Address utils**: set of common addesses, `create` and `create2` address predictors.
- **Constants page**: set of common `bytes32` constants.
- **Ecrecover tool**: check ECDSA signatures.

## Development guide

1. Create the `.env` file in the root of the repository following the example [`.env.example`](.env.example) file.

2. Make sure to install the necessary dependencies:

```bash
yarn install
```

3. Serve the application:

```bash
yarn start # development server

yarn build # production build

yarn preview # preview the production build
```

4. Check out the [nuxtjs documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.

## Disclaimer

GLHF!
