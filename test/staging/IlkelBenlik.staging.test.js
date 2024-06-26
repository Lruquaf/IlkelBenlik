const {network, getNamedAccounts, deployments, ethers} = require("hardhat")
const {
    developmentChains,
    networkConfig,
} = require("../../helper-hardhat-config")
const {assert, expect} = require("chai")
const {merkle} = require("../../utils/merkle")

developmentChains.includes(network.name) ? describe.skip :
describe("IlkelBenlik", async function () {
    let ilkelBenlik,
        wl1Connected,
        wl2Connected,
        user1Connected,
        user2Connected,
        user3Connected,
        admin1Connected

    let provider
    let deployer, wl1, wl2, user1, user2, user3, zeroAddress, admin1
    let chainId
    let closedState, whitelistState, publicState
    let publicTokenPrice, whitelistTokenPrice, baseUri, communityWallet

    beforeEach(async function () {
        chainId = network.config.chainId
        deployer = (await getNamedAccounts()).deployer
        wl1 = (await getNamedAccounts()).wl1
        wl2 = (await getNamedAccounts()).wl2
        user1 = (await getNamedAccounts()).user1
        user2 = (await getNamedAccounts()).user2
        user3 = (await getNamedAccounts()).user3
        admin1 = (await getNamedAccounts()).admin1
        zeroAddress = ethers.constants.AddressZero
        provider = new ethers.providers.Web3Provider(network.provider)
        ilkelBenlik = await ethers.getContract("IlkelBenlik", deployer)
        wl1Connected = await ethers.getContract("IlkelBenlik", wl1)
        wl2Connected = await ethers.getContract("IlkelBenlik", wl2)
        user1Connected = await ethers.getContract("IlkelBenlik", user1)
        user2Connected = await ethers.getContract("IlkelBenlik", user2)
        user3Connected = await ethers.getContract("IlkelBenlik", user3)
        admin1Connected = await ethers.getContract("IlkelBenlik", admin1)

        closedState = networkConfig[chainId].state["closed"]
        whitelistState = networkConfig[chainId].state["whitelist"]
        publicState = networkConfig[chainId].state["public"]
        publicTokenPrice = networkConfig[chainId].publicTokenPrice
        whitelistTokenPrice = networkConfig[chainId].whitelistTokenPrice
        baseUri = networkConfig[chainId].baseUri
        communityWallet = networkConfig[chainId].communityWallet
    })
    describe("end-to-end", async function () {
        describe("before-sale", async function () {
            it("mints the airdropped tokens to the recipient", async function () {
                const amount = "5"
                const txResponse = await ilkelBenlik.airdropMint(
                    deployer,
                    amount
                )
                await txResponse.wait(1)
                assert.equal(
                    (await ilkelBenlik.balanceOf(deployer)).toString(),
                    amount
                )
            })
            it("verifies the whitelist addresses as whitelist", async function () {
                const proof = await merkle(wl1)
                assert.equal(await ilkelBenlik.isWhitelisted(wl1, proof), true)
            })
            it("changes the state from closed to whitelist", async function () {
                const txResponse = await ilkelBenlik.changeState(whitelistState)
                await txResponse.wait(1)
                assert.equal(
                    (await ilkelBenlik.currentState()).toString(),
                    whitelistState
                )
            })
        })
        describe("whitelist-sale", async function () {
            it("mints the tokens to whitelist adresses", async function () {
                const amount = "3"
                const value = (amount * whitelistTokenPrice).toString()
                let proof = await merkle(wl1)
                let txResponse = await wl1Connected.whitelistSaleMint(
                    amount,
                    proof,
                    {
                        value: value,
                    }
                )
                await txResponse.wait(1)
                proof = await merkle(wl2)
                txResponse = await wl2Connected.whitelistSaleMint(
                    amount,
                    proof,
                    {
                        value: value,
                    }
                )
                await txResponse.wait(1)
                txResponse = await admin1Connected.externalWhitelistSaleMint(
                    wl1,
                    "1"
                )
                await txResponse.wait(1)
                txResponse = await admin1Connected.externalWhitelistSaleMint(
                    zeroAddress,
                    "1"
                )
                await txResponse.wait(1)
                assert.equal(
                    (await ilkelBenlik.balanceOf(admin1)).toString(),
                    "1"
                )
                assert.equal(
                    (await ilkelBenlik.balanceOf(wl1)).toString(),
                    parseInt(amount, 10) + 1
                )
                assert.equal(
                    (await ilkelBenlik.contractBalance()).toString(),
                    value * 2
                )
            })
            it("changes the state from whitelist to public", async function () {
                const txResponse = await ilkelBenlik.changeState(publicState)
                await txResponse.wait(1)
                assert.equal(
                    (await ilkelBenlik.currentState()).toString(),
                    publicState
                )
            })
        })
        describe("public-sale", async function () {
            it("mints the tokens to public addresses", async function () {
                const startingDeployerBalance = await ilkelBenlik.balanceOf(
                    deployer
                )
                const startingAdmin1Balance = await ilkelBenlik.balanceOf(
                    admin1
                )
                const amount = "3"
                const value = (amount * publicTokenPrice).toString()
                let txResponse = await ilkelBenlik.publicSaleMint(amount, {
                    value: value,
                    gasLimit: 500000,
                })
                await txResponse.wait(1)
                txResponse = await user1Connected.publicSaleMint(amount, {
                    value: value,
                    gasLimit: 500000,
                })
                await txResponse.wait(1)
                txResponse = await user1Connected.publicSaleMint(amount, {
                    value: value,
                    gasLimit: 500000,
                })
                await txResponse.wait(1)
                txResponse = await user2Connected.publicSaleMint(amount, {
                    value: value,
                    gasLimit: 500000,
                })
                await txResponse.wait(1)
                txResponse = await user2Connected.publicSaleMint(amount, {
                    value: value,
                    gasLimit: 500000,
                })
                await txResponse.wait(1)
                txResponse = await user3Connected.publicSaleMint(amount, {
                    value: value,
                    gasLimit: 500000,
                })
                await txResponse.wait(1)
                txResponse = await user3Connected.publicSaleMint(amount, {
                    value: value,
                    gasLimit: 500000,
                })
                await txResponse.wait(1)
                txResponse = await ilkelBenlik.publicSaleMint(amount, {
                    value: value,
                    gasLimit: 500000,
                })
                await txResponse.wait(1)
                txResponse = await ilkelBenlik.externalPublicSaleMint(
                    zeroAddress,
                    amount,
                    {
                        gasLimit: 500000,
                    }
                )
                await txResponse.wait(1)
                txResponse = await admin1Connected.externalPublicSaleMint(
                    user3,
                    amount,
                    {
                        gasLimit: 500000,
                    }
                )
                await txResponse.wait(1)
                txResponse = await admin1Connected.externalPublicSaleMint(
                    zeroAddress,
                    "2",
                    {
                        gasLimit: 500000,
                    }
                )
                await txResponse.wait(1)
                const endingDeployerBalance = await ilkelBenlik.balanceOf(
                    deployer
                )
                const endingAdmin1Balance = await ilkelBenlik.balanceOf(admin1)
                assert.equal(
                    (await ilkelBenlik.balanceOf(user1)).toString(),
                    amount * 2
                )
                assert.equal(
                    (await ilkelBenlik.contractBalance()).toString(),
                    (
                        parseInt(whitelistTokenPrice, 10) * 6 +
                        parseInt(value, 10) * 8
                    ).toString()
                )
                assert.equal(
                    (await ilkelBenlik.balanceOf(user3)).toString(),
                    parseInt(amount, 10) * 3
                )
                assert.equal(
                    endingDeployerBalance.toString(),
                    (parseInt(startingDeployerBalance) + 9).toString()
                )
                assert.equal(
                    endingAdmin1Balance.toString(),
                    (parseInt(startingAdmin1Balance) + 2).toString()
                )
            })
        })
        describe("after-sale", async function () {
            it("reveals the metadata correctly", async function () {
                const txResponse = await ilkelBenlik.reveal(baseUri)
                await txResponse.wait(1)
                assert.equal(
                    await ilkelBenlik.tokenURI("13"),
                    baseUri + "13" + ".json"
                )
                assert.equal(
                    await ilkelBenlik.tokenURI("3"),
                    (await ilkelBenlik.AIRDROP_BASE_URI()) + "3" + ".json"
                )
            })
            it("withdraws the funds to founder addresses", async function () {
                const txResponse = await ilkelBenlik.withdrawAll({
                    gasLimit: 500000,
                })
                await txResponse.wait(1)
                const communityWalletBalance =
                    await ilkelBenlik.provider.getBalance(communityWallet)
                assert.equal(
                    (await ilkelBenlik.contractBalance()).toString(),
                    "0"
                )
                assert(
                    communityWalletBalance.toString() >
                        (
                            (parseInt(whitelistTokenPrice * 8, 10) +
                                parseInt(publicTokenPrice * 32, 10)) /
                            20
                        ).toString()
                )
            })
        })
    })
})
