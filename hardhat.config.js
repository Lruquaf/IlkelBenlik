require("dotenv").config()
require("@nomicfoundation/hardhat-toolbox")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey"
const TEST_KEY_1 = process.env.TEST_KEY_1 || "0xkey"
const TEST_KEY_2 = process.env.TEST_KEY_2 || "0xkey"
const TEST_KEY_3 = process.env.TEST_KEY_3 || "0xkey"
const TEST_KEY_4 = process.env.TEST_KEY_4 || "0xkey"
const TEST_KEY_5 = process.env.TEST_KEY_5 || "0xkey"
const ADMIN_1 = process.env.ADMIN_1 || "0xkey"
const ADMIN_2 = process.env.ADMIN_2 || "0xkey"
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://sepolia"
// const ETHEREUM_RPC_URL =
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key"

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        version: "0.8.20",
        settings: {
            optimizer: {
                enabled: true,
                runs: 9999,
                details: {
                    yul: true,
                    yulDetails: {
                        optimizerSteps: "u",
                    },
                },
            },
            viaIR: true,
        },
    },
    // MAINNET GECERKEN BU ALANA mainnet
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            blockConfirmations: 1,
        },
        localhost: {
            chainId: 31337,
            blockConfirmations: 1,
        },
        sepolia: {
            chainId: 11155111,
            blockConfirmations: 6,
            url: SEPOLIA_RPC_URL,
            gasPrice: 35000000000,
            accounts: [
                PRIVATE_KEY,
                TEST_KEY_1,
                TEST_KEY_2,
                TEST_KEY_3,
                TEST_KEY_4,
                TEST_KEY_5,
                ADMIN_1,
                ADMIN_2
            ],
        },
        // mainnet: {
        //     chainId:,
        //     blockConfirmations:,
        //     url: ETHEREUM_RPC_URL,
        //     accounts: ,
        // },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    namedAccounts: {
        deployer: {
            default: 0,
            sepolia: 0,
            mainnet: 0,
        },
        admin1: {
            default: 18,
            sepolia: 6,
        },
        admin1: {
            default: 19,
            sepolia: 7,
        },
        wl1: {
            default: 1,
            sepolia: 1,
        },
        wl2: {
            default: 2,
            sepolia: 2,
        },
        user1: {
            default: 3,
            sepolia: 3,
        },
        user2: {
            default: 4,
            sepolia: 4,
        },
        user3: {
            default: 5,
            sepolia: 5,
        },
        founder1: {
            default: 11,
        },
        founder2: {
            default: 12,
        },
        communityWallet: {
            default: 13,
        },
    },
    mocha: {
        timeout: 100000000,
    },
    gasReporter: {
        enabled: false,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
        outputFile: "gas-report.txt",
        // gasPrice: 50,
        token: "ETH",
        noColors: true,
        excludeContracts: ["MinterContract", "TransferProxyMock"],
    },
}
