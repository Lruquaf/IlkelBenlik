const {getNamedAccounts, ethers, network} = require("hardhat")
const {networkConfig} = require("../helper-hardhat-config")

async function main() {
    const chainId = network.config.chainId
    const owner = (await getNamedAccounts()).deployer
    const contract = await ethers.getContract("IlkelBenlik", owner)

    const previousState = await contract.currentState()
    console.log(`Previous state: ${previousState}`)

    const newState = networkConfig[chainId].state["whitelist"] // closed, whitelist, public
    txResponse = await contract.changeState(newState)
    await txResponse.wait(1)
    const currentState = await contract.currentState()
    console.log(`Current state: ${currentState}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
