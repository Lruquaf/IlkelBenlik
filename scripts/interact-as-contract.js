const {getNamedAccounts, ethers, network} = require("hardhat")
const {networkConfig} = require("../helper-hardhat-config")

async function main() {
    const chainId = network.config.chainId
    const owner = (await getNamedAccounts()).deployer
    const user1 = (await getNamedAccounts()).user1
    const minterContract = await ethers.getContract("MinterContract", owner)
    const nftContrct = await ethers.getContract("IlkelBenlik", owner)
    const publicState = networkConfig[chainId].state["public"]
    const amount = "2"
    const tokenPrice = networkConfig[chainId]["tokenPrice"]

    let txResponse = await nftContrct.changeState(publicState)
    await txResponse.wait(1)

    try {
        txResponse = await minterContract.mintToken(amount, {
            value: (amount * tokenPrice).toString(),
        })
        await txResponse.wait(1)
    } catch (error) {
        console.log(error)
    }
    console.log((await nftContrct.balanceOf(minterContract.address)).toString())
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
