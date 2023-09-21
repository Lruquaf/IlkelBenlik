const {network, ethers} = require("hardhat")
const {networkConfig, developmentChains} = require("../helper-hardhat-config")
const {verify} = require("../utils/verify")
const whitelists = require("../whitelists.json")
const {MerkleTree} = require("merkletreejs")
const keccak256 = require("keccak256")

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()

    const whitelistArray = whitelists.whitelists
    let leaves = whitelistArray.map((address) => keccak256(address))
    let merkleTree = new MerkleTree(leaves, keccak256, {sortPairs: true})
    let rootHash = merkleTree.getHexRoot()
    // console.log(rootHash)

    const chainId = network.config.chainId
    console.log(chainId)

    const maxTokens = networkConfig[chainId].maxTokens
    const maxTokensForWhitelist = networkConfig[chainId].maxTokensForWhitelist
    const maxTokensForAirdrop = networkConfig[chainId].maxTokensForAirdrop
    const whitelistTokenPrice = networkConfig[chainId].whitelistTokenPrice
    const publicTokenPrice = networkConfig[chainId].publicTokenPrice
    const maxAmountPerMint = networkConfig[chainId].maxAmountPerMint
    const maxAmountPerAccount = networkConfig[chainId].maxAmountPerAccount
    const maxAmountPerWhitelist = networkConfig[chainId].maxAmountPerWhitelist
    let raribleTransferProxy
    if (developmentChains.includes(network.name)) {
        conduit = await ethers.getContract("TransferProxyMock")
        raribleTransferProxy = conduit.address
    } else {
        raribleTransferProxy = networkConfig[chainId].raribleTransferProxy
    }
    const founder1 = networkConfig[chainId].founder1
    const founder2 = networkConfig[chainId].founder2
    const communityWallet = networkConfig[chainId].communityWallet
    const merkleRoot = rootHash

    const args = [
        maxTokens,
        maxTokensForWhitelist,
        maxTokensForAirdrop,
        whitelistTokenPrice,
        publicTokenPrice,
        maxAmountPerMint,
        maxAmountPerWhitelist,
        maxAmountPerAccount,
        raribleTransferProxy,
        founder1,
        founder2,
        communityWallet,
        merkleRoot,
    ]

    console.log("Deploying token contract...")

    const ilkelBenlik = await deploy("IlkelBenlik", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(ilkelBenlik.address, args)
    }
    console.log("Token contract was deployed!")
}

module.exports.tags = ["all", "ilkelBenlik"]
