const {getNamedAccounts, ethers, network} = require("hardhat")
const {networkConfig} = require("../helper-hardhat-config")

async function main() {
    const chainId = network.config.chainId
    const owner = (await getNamedAccounts()).deployer
    const user3 = (await getNamedAccounts()).user3
    const zeroAddress = ethers.constants.AddressZero
    const contract = await ethers.getContract("IlkelBenlik", owner)
    const mintAmount = "1"
    const to = user3

    if (to == zeroAddress) {
        let ownerBalance = await contract.balanceOf(owner)
        console.log(`Starting balance: ${ownerBalance}`)

        const txResponse = await contract.externalPublicSaleMint(mintAmount, to)
        await txResponse.wait(1)
        ownerBalance = await contract.balanceOf(owner)
        console.log(`Ending balance: ${ownerBalance}`)
    } else {
        let user3Balance = await contract.balanceOf(user3)
        console.log(`Starting balance: ${user3Balance}`)

        const txResponse = await contract.externalPublicSaleMint(mintAmount, to)
        await txResponse.wait(1)
        user3Balance = await contract.balanceOf(user3)
        console.log(`Ending balance: ${user3Balance}`)
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
