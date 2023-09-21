const {network, ethers} = require("hardhat")
const {networkConfig, developmentChains} = require("../helper-hardhat-config")
const {verify} = require("../utils/verify")

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()

    const chainId = network.config.chainId
    console.log(chainId)

    const mintingContract = await ethers.getContract("IlkelBenlik")

    const args = [mintingContract.address]

    console.log("Deploying minter contract...")

    const minterContract = await deploy("MinterContract", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blocConfirmations || 1,
    })

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(minterContract.address, args)
    }
    console.log("Minter contract was deployed!")
}

module.exports.tags = ["all", "minterContract"]
