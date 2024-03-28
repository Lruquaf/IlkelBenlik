const networkConfig = {
    31337: {
        name: "localhost",
        maxTokens: "210",
        maxTokensForWhitelist: "50",
        maxTokensForAirdrop: "10",
        whitelistTokenPrice: ethers.utils.parseEther("1"),
        publicTokenPrice: ethers.utils.parseEther("1.1"),
        maxAmountPerMint: "30",
        maxAmountPerAccount: "50",
        maxAmountPerWhitelist: "20",
        baseUri: "ipfs://ilkelBenlik/",
        founder1: "0x71bE63f3384f5fb98995898A86B02Fb2426c5788",
        founder2: "0xFABB0ac9d68B0B445fB7357272Ff202C5651694a",
        communityWallet: "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec",
        state: {
            closed: "0",
            whitelist: "1",
            public: "2",
        },
        whitelist: [
            "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", // wl1
            "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", // wl2
        ],
    },
    11155111: {
        name: "sepolia",
        maxTokens: "45",
        maxTokensForWhitelist: "8",
        maxTokensForAirdrop: "5",
        whitelistTokenPrice: ethers.utils.parseEther("0.01"),
        publicTokenPrice: ethers.utils.parseEther("0.011"),
        maxAmountPerMint: "5",
        maxAmountPerAccount: "10",
        maxAmountPerWhitelist: "5",
        raribleTransferProxy: "0x21B0B84FfAB5A8c48291f5eC9D9FDb9aef574052",
        founder1: "0xF0D3CfBb898A19C1bDbdEdcC22546CEF0768bb97",
        founder2: "0x8b162525d54853d5a5a9d7784BE568aE479F0c20",
        communityWallet: "0xCC7f39Ca6C9188eb88E8062d42461Dc7ec05041A",
        // "ipfs://bafybeifjjh7mrt2ec5xljc2yqp2favdyueb3ddygbl2xffnfhj4644qn24/"
        baseUri: process.env.SEPOLIA_BASE_URI,
        state: {
            closed: "0",
            whitelist: "1",
            public: "2",
        },
        whitelist: [
            "0xA7a44587F24bcA4513A8B5D9e8320B1B297efA1c", // wl1
            "0x0d087823f0B0E6d5d7dE7eD56636763eeCB52945", // wl2
        ],
    },
    // 1: {
    //     name: "mainnet",
    //     maxTokens: ,
    //     maxTokensForWhitelist: ,
    //     whitelistTokenPrice: ethers.utils.parseEther(""),
    //     publicTokenPrice: ethers.utils.parseEther(""),
    //     maxAmountPerMint: ,
    //     maxAmountPerAccount: ,
    //     maxAmountPerWhitelist: ,
    //     raribleTransferProxy: "",
    //     founder1: "",
    //     founder2: "",
    //     communityWallet: "",
    //     baseUri:,
    //     state: {
    //         closed: "0",
    //         whitelist: "1",
    //         public: "2",
    //     },
    // },
}

const developmentChains = ["hardhat", "localhost"]

module.exports = {networkConfig, developmentChains}
