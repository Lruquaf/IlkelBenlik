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
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "https://goerli"
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
        goerli: {
            chainId: 5,
            blockConfirmations: 6,
            url: GOERLI_RPC_URL,
            gasPrice: 35000000000,
            accounts: [
                PRIVATE_KEY,
                TEST_KEY_1,
                TEST_KEY_2,
                TEST_KEY_3,
                TEST_KEY_4,
                TEST_KEY_5,
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
            goerli: 0,
            mainnet: 0,
        },
        wl1: {
            default: 1,
            goerli: 1,
        },
        wl2: {
            default: 2,
            goerli: 2,
        },
        user1: {
            default: 3,
            goerli: 3,
        },
        user2: {
            default: 4,
            goerli: 4,
        },
        user3: {
            default: 5,
            goerli: 5,
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
