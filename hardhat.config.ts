import { HardhatUserConfig } from "hardhat/config";

// PLUGINS
import "@gelatonetwork/web3-functions-sdk/hardhat-plugin";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "hardhat-deploy";

// ================================= TASKS =========================================

// Process Env Variables
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const accounts: string[] = PRIVATE_KEY ? [PRIVATE_KEY] : [];

// ================================= CONFIG =========================================
const config: HardhatUserConfig = {
  w3f: {
    rootDir: "./web3-functions",
    debug: false,
    networks: ["holesky", "sepolia", "hardhat"], //(multiChainProvider) injects provider for these networks
  },

  namedAccounts: {
    deployer: {
      default: 0,
    },
  },

  defaultNetwork: "holesky",
  networks: {
    hardhat: {
      forking: {
        url: `https://ethereum-holesky-rpc.publicnode.com`,
        // blockNumber:6211000 ,
      },
    },

    // Shared Testnet
    holesky: {
      accounts,
      chainId: 17000,
      url: `https://ethereum-holesky-rpc.publicnode.com`,
    },
    sepolia: {
      accounts,
      chainId: 11155111,
      url: `https://eth-sepolia.g.alchemy.com/v2/EwnedielN_UbkKyxpCWdk1PRDvghACov`,
    },
    arbSepolia: {
      accounts,
      chainId: 421614,
      url: `https://arb-sepolia.g.alchemy.com/v2/1kcWqynxqbmReSnettyXbJw6l0YFhmnQ`,
    },
    blueberry: {
      accounts,
      chainId: 88153591557,
      url: `https://rpc.arb-blueberry.gelato.digital`,
    },
    raspberry: {
      accounts,
      chainId: 123420111,
      url: `https://rpc.opcelestia-raspberry.gelato.digital`,
    },
    blackberry: {
      accounts,
      chainId: 94204209,
      url: `https://rpc.polygon-blackberry.gelato.digital`,
    },
  },
  etherscan: {
    apiKey: {
      blueberry: "xxx",
    },
    customChains: [
      {
        network: "blueberry",
        chainId: 88153591557,
        urls: {
          apiURL: "https://arb-blueberry.gelatoscout.com/api",
          browserURL: "https://arb-blueberry.gelatoscout.com",
        },
      },
    ],
  },

  solidity: {
    compilers: [
      {
        version: "0.8.23",

        settings: {
          evmVersion: "paris",
          optimizer: { enabled: true, runs: 200 },
        },
      },
    ],
  },

  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
};

export default config;
