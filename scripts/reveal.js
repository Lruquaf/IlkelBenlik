const {getNamedAccounts, ethers, network} = require("hardhat")
const {networkConfig} = require("../helper-hardhat-config")

async function main() {
    const chainId = network.config.chainId
    const owner = (await getNamedAccounts()).deployer
    const contract = await ethers.getContract("IlkelBenlik", owner)
    const baseUri = networkConfig[chainId].baseUri

    let uri = await contract.tokenURI("1")
    console.log(`Previous URI: ${uri.toString()}`)

    txResponse = await contract.reveal(baseUri)
    await txResponse.wait(1)

    uri = await contract.tokenURI("1")
    console.log(`Current URI: ${uri.toString()}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
