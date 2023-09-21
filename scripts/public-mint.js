const {getNamedAccounts, ethers, network} = require("hardhat")
const {networkConfig} = require("../helper-hardhat-config")

async function main() {
    const chainId = network.config.chainId
    const user2 = (await getNamedAccounts()).user2
    const contract = await ethers.getContract("IlkelBenlik", user2)
    const mintAmount = "1"
    const price = networkConfig[chainId].publicTokenPrice

    let user2Balance = await contract.balanceOf(user2)
    console.log(`Starting balance: ${user2Balance}`)

    const txResponse = await contract.publicSaleMint(mintAmount, {
        value: (mintAmount * price).toString(),
    })
    await txResponse.wait(1)
    user2Balance = await contract.balanceOf(user2)
    console.log(`Ending balance: ${user2Balance}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
