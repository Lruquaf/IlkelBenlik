const {getNamedAccounts, ethers, network} = require("hardhat")
const {networkConfig} = require("../helper-hardhat-config")

async function main() {
    const chainId = network.config.chainId
    const owner = (await getNamedAccounts()).deployer
    const wl2 = (await getNamedAccounts()).wl2
    const zeroAddress = ethers.constants.AddressZero
    const contract = await ethers.getContract("IlkelBenlik", owner)
    const mintAmount = "1"
    const price = networkConfig[chainId].publicTokenPrice
    const to = wl2

    if (to == zeroAddress) {
        let ownerBalance = await contract.balanceOf(owner)
        console.log(`Starting balance: ${ownerBalance}`)

        const txResponse = await contract.externalWhitelistSaleMint(
            mintAmount,
            to
        )
        await txResponse.wait(1)
        ownerBalance = await contract.balanceOf(owner)
        console.log(`Ending balance: ${ownerBalance}`)
    } else {
        let wl2Balance = await contract.balanceOf(wl2)
        console.log(`Starting balance: ${wl2Balance}`)

        const txResponse = await contract.externalPublicSaleMint(mintAmount, to)
        await txResponse.wait(1)
        wl2Balance = await contract.balanceOf(wl2)
        console.log(`Ending balance: ${wl2Balance}`)
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
