const {getNamedAccounts, ethers, network} = require("hardhat")
const {networkConfig} = require("../helper-hardhat-config")

async function main() {
    const chainId = network.config.chainId
    const owner = (await getNamedAccounts()).deployer
    const contract = await ethers.getContract("IlkelBenlik", owner)

    const amount = "5"
    const recipient = "0x0808e2Dc6726C3aaCf57Faaf8823e90d625b1DEE"
    console.log(`Starting Balance: ${await contract.balanceOf(recipient)}`)
    const txResponse = await contract.airdropMint(recipient, amount)
    await txResponse.wait(1)
    console.log(
        `Ending Balance: ${(await contract.balanceOf(recipient)).toString()}`
    )
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
