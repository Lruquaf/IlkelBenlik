const {getNamedAccounts, ethers, network} = require("hardhat")
const {networkConfig} = require("../helper-hardhat-config")

async function main() {
    const chainId = network.config.chainId
    const wl1 = (await getNamedAccounts()).wl1
    const contract = await ethers.getContract("IlkelBenlik", wl1)
    const mintAmount = "2"
    const price = networkConfig[chainId].whitelistTokenPrice

    let wl1Balance = await contract.balanceOf(wl1)
    console.log(`Starting balance: ${wl1Balance}`)

    const txResponse = await contract.whitelistSaleMint(mintAmount, {
        value: (mintAmount * price).toString(),
    })
    await txResponse.wait(1)
    wl1Balance = await contract.balanceOf(wl1)
    console.log(`Ending balance: ${wl1Balance}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
