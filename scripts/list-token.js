const {getNamedAccounts, ethers, network} = require("hardhat")
const {networkConfig} = require("../helper-hardhat-config")

async function main() {
    const chainId = network.config.chainId
    const owner = (await getNamedAccounts()).deployer
    const user2 = (await getNamedAccounts()).user2
    const contract = await ethers.getContract("IlkelBenlik", owner)
    const nftAddress = contract.address
    const marketplace = await ethers.getContract("TransferProxyMock", user2)
    const marketplaceAddress = marketplace.address

    let balance = await contract.balanceOf(marketplaceAddress)
    console.log(`Starting Marketplace balance: ${balance}`)

    const txResponse = await marketplace.listToken(nftAddress, "1")
    await txResponse.wait(1)
    balance = await contract.balanceOf(marketplaceAddress)
    console.log(`Ending Marketplace balance: ${balance}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
