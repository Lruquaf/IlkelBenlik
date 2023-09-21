const {getNamedAccounts, ethers, network} = require("hardhat")
const {networkConfig} = require("../helper-hardhat-config")

async function main() {
    const chainId = network.config.chainId
    const owner = (await getNamedAccounts()).deployer
    const contract = await ethers.getContract("IlkelBenlik", owner)

    let contractBalance = await contract.contractBalance()
    console.log(`Starting contract balance: ${contractBalance}`)

    const txResponse = await contract.withdrawAll()
    await txResponse.wait(1)
    contractBalance = await contract.contractBalance()
    console.log(`Ending contract balance: ${contractBalance}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
