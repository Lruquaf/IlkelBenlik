const {network} = require("hardhat")
const {developmentChains} = require("../helper-hardhat-config")

module.exports = async function ({getNamedAccounts, deployments}) {
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()

    if (developmentChains.includes(network.name)) {
        console.log("Local network detected! Deploying mocks...")

        await deploy("TransferProxyMock", {
            from: deployer,
            args: [],
            log: true,
        })

        console.log("Mocks deployed!")
        console.log(
            "---------------------------------------------------------------------"
        )
    }
}

module.exports.tags = ["all", "mocks"]
