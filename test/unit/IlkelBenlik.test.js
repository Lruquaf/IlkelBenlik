const {network, getNamedAccounts, deployments, ethers} = require("hardhat")
const {
    developmentChains,
    networkConfig,
} = require("../../helper-hardhat-config")
const {assert, expect} = require("chai")
const {merkle} = require("../../utils/merkle")

!developmentChains.includes(network.name) ? describe.skip :
describe("IlkelBenlik", async function () {
    let ilkelBenlik,
        transferProxyMock,
        minterContract,
        attackerConnectedContract,
        wl1ConnectedContract,
        wl2ConnectedContract,
        user1ConnectedContract,
        admin1ConnectedContract
    let provider
    let deployer,
        attacker,
        wl1,
        wl2,
        user1,
        communityWallet,
        zeroAddress,
        admin1
    let chainId
    let closedState, whitelistState, publicState
    let publicTokenPrice, baseUri, founder2

    beforeEach(async function () {
        chainId = network.config.chainId
        deployer = (await getNamedAccounts()).deployer
        attacker = (await getNamedAccounts()).user1
        wl1 = (await getNamedAccounts()).wl1
        wl2 = (await getNamedAccounts()).wl2
        user1 = (await getNamedAccounts()).user1
        communityWallet = (await getNamedAccounts()).communityWallet
        whitelists = [
            (await getNamedAccounts()).wl1,
            (await getNamedAccounts()).wl2,
        ]
        admin1 = (await getNamedAccounts()).admin1
        zeroAddress = ethers.constants.AddressZero
        provider = new ethers.providers.Web3Provider(network.provider)
        await deployments.fixture(["all"])
        ilkelBenlik = await ethers.getContract("IlkelBenlik", deployer)
        transferProxyMock = await ethers.getContract(
            "TransferProxyMock",
            deployer
        )
        minterContract = await ethers.getContract("MinterContract", deployer)
        attackerConnectedContract = await ethers.getContract(
            "IlkelBenlik",
            attacker
        )
        wl1ConnectedContract = await ethers.getContract("IlkelBenlik", wl1)
        wl2ConnectedContract = await ethers.getContract("IlkelBenlik", wl2)
        user1ConnectedContract = await ethers.getContract("IlkelBenlik", user1)
        admin1ConnectedContract = await ethers.getContract(
            "IlkelBenlik",
            admin1
        )
        closedState = networkConfig[chainId].state["closed"]
        whitelistState = networkConfig[chainId].state["whitelist"]
        publicState = networkConfig[chainId].state["public"]
        whitelistTokenPrice = networkConfig[chainId].whitelistTokenPrice
        publicTokenPrice = networkConfig[chainId].publicTokenPrice
        baseUri = networkConfig[chainId].baseUri
        founder2 = networkConfig[chainId].founder2
    })
    describe("constructor", async function () {
        it("initializes the contract correctly", async function () {
            const maxTokens = await ilkelBenlik.MAX_TOKENS()
            const publicTokenPrice = await ilkelBenlik.PUBLIC_TOKEN_PRICE()
            const transferProxyAddress =
                await ilkelBenlik.raribleTransferProxy()
            const results = await ilkelBenlik.royaltyInfo("1", publicTokenPrice)
            const feeReceiver = results[0]
            const royaltyFee = results[1].toString()
            // Ideally should be 1 assert per "it"
            assert.equal(
                networkConfig[chainId]["maxTokens"],
                maxTokens.toString()
            )
            assert.equal(
                networkConfig[chainId]["publicTokenPrice"],
                publicTokenPrice.toString()
            )
            assert.equal(
                transferProxyMock.address,
                transferProxyAddress.toString()
            )
            assert.equal(feeReceiver, founder2)
            assert.equal(royaltyFee, (publicTokenPrice / 20).toString())
            assert.equal(await ilkelBenlik.COMMUNITY_WALLET(), communityWallet)
            let proof = await merkle(wl1)
            assert.equal(await ilkelBenlik.isWhitelisted(wl1, proof), true)
            proof = await merkle(user1)
            assert.equal(await ilkelBenlik.isWhitelisted(user1, proof), false)
        })
    })
    describe("changeState", async function () {
        it("fails if caller is not owner", async function () {
            const newState = publicState
            await expect(
                attackerConnectedContract.changeState(newState)
            ).to.be.revertedWith("Ownable: caller is not the owner")
        })
        it("fails if airdrop has not finished yet", async function () {
            const amount = "9"
            let txResponse = await ilkelBenlik.airdropMint(deployer, amount)
            await txResponse.wait(1)
            await expect(
                ilkelBenlik.changeState(whitelistState)
            ).to.be.revertedWithCustomError(ilkelBenlik, "StillAirdropPhase")
        })
        it("changes the minting state to 'whitelist' correctly", async function () {
            const amount = "10"
            let txResponse = await ilkelBenlik.airdropMint(deployer, amount)
            await txResponse.wait(1)
            const newState = whitelistState
            txResponse = await ilkelBenlik.changeState(newState)
            await txResponse.wait(1)
            const currentState = await ilkelBenlik.currentState()
            assert.equal(currentState.toString(), newState)
        })
        it("changes the minting state to 'public' correctly", async function () {
            const amount = "10"
            let txResponse = await ilkelBenlik.airdropMint(deployer, amount)
            await txResponse.wait(1)
            const newState = publicState
            txResponse = await ilkelBenlik.changeState(newState)
            await txResponse.wait(1)
            const currentState = await ilkelBenlik.currentState()
            assert.equal(currentState.toString(), newState)
        })
        it("changes the minting state to 'closed' correctly", async function () {
            const amount = "10"
            let txResponse = await ilkelBenlik.airdropMint(deployer, amount)
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.changeState(publicState)
            await txResponse.wait(1)
            const newState = closedState
            txResponse = await ilkelBenlik.changeState(newState)
            await txResponse.wait(1)
            const currentState = await ilkelBenlik.currentState()
            assert.equal(currentState.toString(), newState)
        })
        it("fails if input is invalid", async function () {
            const amount = "10"
            let txResponse = await ilkelBenlik.airdropMint(deployer, amount)
            await txResponse.wait(1)
            const input = "3"
            await expect(
                ilkelBenlik.changeState(input)
            ).to.be.revertedWithCustomError(ilkelBenlik, "InvalidInput")
        })
    })
    describe("airdropMint", async function () {
        it("fails if caller is not owner", async function () {
            const amount = "10"
            await expect(
                attackerConnectedContract.airdropMint(deployer, amount)
            ).to.be.revertedWith("Ownable: caller is not the owner")
        })
        it("fails if max supply for airdrop is exceeded", async function () {
            let amount = "8"
            const txResponse = await ilkelBenlik.airdropMint(deployer, amount)
            await txResponse.wait(1)
            amount = "5"
            await expect(
                ilkelBenlik.airdropMint(deployer, amount)
            ).to.be.revertedWithCustomError(
                ilkelBenlik,
                "MaxSupplyForAirdropExceeded"
            )
        })
        it("fails if state is not 'closed'", async function () {
            let amount = "10"
            let txResponse = await ilkelBenlik.airdropMint(deployer, amount)
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.changeState(whitelistState)
            await txResponse.wait(1)
            amount = "1"
            await expect(
                ilkelBenlik.airdropMint(deployer, amount)
            ).to.be.revertedWithCustomError(
                ilkelBenlik,
                "MaxSupplyForAirdropExceeded"
            )
        })
        it("mints the correct amount of tokens to the recipient", async function () {
            let amount = "4"
            let txResponse = await ilkelBenlik.airdropMint(deployer, amount)
            await txResponse.wait(1)
            amount = "3"
            txResponse = await ilkelBenlik.airdropMint(wl1, amount)
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.airdropMint(user1, amount)
            await txResponse.wait(1)
            // Ideally should be 1 assert per "it"
            assert.equal(
                "4",
                (await ilkelBenlik.getAirdropMintCounter(deployer)).toString()
            )
            assert.equal(
                "3",
                (await ilkelBenlik.getAirdropMintCounter(wl1)).toString()
            )
            assert.equal(
                "3",
                (await ilkelBenlik.getAirdropMintCounter(user1)).toString()
            )
        })
    })
    describe("whitelistMint", async function () {
        beforeEach(async function () {
            let amount = "4"
            let txResponse = await ilkelBenlik.airdropMint(deployer, amount)
            await txResponse.wait(1)
            amount = "3"
            txResponse = await ilkelBenlik.airdropMint(wl1, amount)
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.airdropMint(user1, amount)
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.changeState(whitelistState)
            await txResponse.wait(1)
        })
        it("fails if state is 'closed'", async function () {
            const txResponse = await ilkelBenlik.changeState(closedState)
            await txResponse.wait(1)
            const amount = "1"
            const proof = await merkle(wl1)
            await expect(
                wl1ConnectedContract.whitelistSaleMint(amount, proof)
            ).to.be.revertedWithCustomError(
                ilkelBenlik,
                "NotWhitelistSalePhase"
            )
        })
        it("fails if state is 'public'", async function () {
            const txResponse = await ilkelBenlik.changeState(publicState)
            await txResponse.wait(1)
            const amount = "1"
            const proof = await merkle(wl1)
            await expect(
                wl1ConnectedContract.whitelistSaleMint(amount, proof)
            ).to.be.revertedWithCustomError(
                ilkelBenlik,
                "NotWhitelistSalePhase"
            )
        })
        it("fails if the caller is not a whitelisted", async function () {
            const amount = "1"
            const proof = await merkle(user1)
            await expect(
                user1ConnectedContract.whitelistSaleMint(amount, proof)
            ).to.be.revertedWithCustomError(ilkelBenlik, "NotAWhitelisted")
        })
        it("fails if max supply for whitelist is exceeded", async function () {
            let txResponse = await ilkelBenlik.changeState(closedState)
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.changeState(whitelistState)
            await txResponse.wait(1)
            // deployer minted 2, wl1 minted 2, wl2 try to mint 2
            const amount = "20"
            let proof = await merkle(deployer)
            txResponse = await ilkelBenlik.whitelistSaleMint(amount, proof, {
                value: (amount * whitelistTokenPrice).toString(),
            })
            await txResponse.wait(1)
            proof = await merkle(wl1)
            txResponse = await wl1ConnectedContract.whitelistSaleMint(
                amount,
                proof,
                {
                    value: (amount * whitelistTokenPrice).toString(),
                }
            )
            await txResponse.wait(1)
            proof = await merkle(wl2)
            await expect(
                wl2ConnectedContract.whitelistSaleMint(amount, proof, {
                    value: (amount * whitelistTokenPrice).toString(),
                })
            ).to.be.revertedWithCustomError(
                ilkelBenlik,
                "MaxSupplyForWhitelistExceeded"
            )
        })
        it("fails if max token amount per whitelist is exceeded", async function () {
            let amount = "10"
            let proof = await merkle(wl1)
            const txResponse = await wl1ConnectedContract.whitelistSaleMint(
                amount,
                proof,
                {
                    value: (amount * whitelistTokenPrice).toString(),
                }
            )
            await txResponse.wait(1)
            amount = "20"
            proof = await merkle(wl1)
            await expect(
                wl1ConnectedContract.whitelistSaleMint(amount, proof, {
                    value: (amount * whitelistTokenPrice).toString(),
                })
            ).to.be.revertedWithCustomError(
                ilkelBenlik,
                "MaxAmountPerWhitelistExceeded"
            )
        })
        it("fails if the caller provides insufficient ETH", async function () {
            const amount = "20"
            const proof = await merkle(wl1)
            await expect(
                wl1ConnectedContract.whitelistSaleMint(amount, proof, {
                    value: whitelistTokenPrice.toString(),
                })
            ).to.be.revertedWithCustomError(ilkelBenlik, "InsufficientETH")
        })
        it("mints the correct amount of tokens to the caller", async function () {
            const amount1 = "20"
            let proof = await merkle(wl1)
            let txResponse = await wl1ConnectedContract.whitelistSaleMint(
                amount1,
                proof,
                {value: (amount1 * whitelistTokenPrice).toString()}
            )
            await txResponse.wait(1)
            const amount2 = "10"
            proof = await merkle(wl2)
            txResponse = await wl2ConnectedContract.whitelistSaleMint(
                amount2,
                proof,
                {
                    value: (amount2 * whitelistTokenPrice).toString(),
                }
            )
            await txResponse.wait(1)
            // Ideally should be 1 assert per "it"
            assert.equal(
                (await ilkelBenlik.balanceOf(wl1)).toString(),
                (parseInt(amount1) + 3).toString()
            )
            assert.equal((await ilkelBenlik.balanceOf(wl2)).toString(), amount2)
            assert.equal(
                (await ilkelBenlik.contractBalance()).toString(),
                (
                    (parseInt(amount1, 10) + parseInt(amount2, 10)) *
                    whitelistTokenPrice
                ).toString()
            )
            assert.equal(
                (await ilkelBenlik.totalSupply()).toString(),
                (
                    parseInt(amount1, 10) +
                    parseInt(amount2, 10) +
                    parseInt(await ilkelBenlik.MAX_TOKENS_FOR_AIRDROP(), 10)
                ).toString()
            )
            assert.equal(
                (await ilkelBenlik.getWhitelistMintCounter(wl1)).toString(),
                amount1
            )
        })
    })
    describe("publicMint", async function () {
        beforeEach(async function () {
            let amount = "4"
            let txResponse = await ilkelBenlik.airdropMint(deployer, amount)
            await txResponse.wait(1)
            amount = "3"
            txResponse = await ilkelBenlik.airdropMint(wl1, amount)
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.airdropMint(user1, amount)
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.changeState(whitelistState)
            await txResponse.wait(1)
            amount = "20"
            let proof = await merkle(wl1)
            txResponse = await wl1ConnectedContract.whitelistSaleMint(
                amount,
                proof,
                {
                    value: (amount * whitelistTokenPrice).toString(),
                }
            )
            await txResponse.wait(1)
            proof = await merkle(wl2)
            txResponse = await wl2ConnectedContract.whitelistSaleMint(
                amount,
                proof,
                {
                    value: (amount * whitelistTokenPrice).toString(),
                }
            )
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.changeState(publicState)
            await txResponse.wait(1)
        })
        it("fails if the state is 'closed'", async function () {
            let txResponse = await ilkelBenlik.changeState(closedState)
            await txResponse.wait(1)
            const amount = "30"
            await expect(
                ilkelBenlik.publicSaleMint(amount, {
                    value: (amount * publicTokenPrice).toString(),
                })
            ).to.be.revertedWithCustomError(ilkelBenlik, "NotPublicSalePhase")
        })
        it("fails if the state is 'whitelist'", async function () {
            let txResponse = await ilkelBenlik.changeState(whitelistState)
            await txResponse.wait(1)
            const amount = "30"
            await expect(
                ilkelBenlik.publicSaleMint(amount, {
                    value: (amount * publicTokenPrice).toString(),
                })
            ).to.be.revertedWithCustomError(ilkelBenlik, "NotPublicSalePhase")
        })
        it("fails if the caller is a contract", async function () {
            const amount = "20"
            await expect(
                minterContract.mintToken(amount, {
                    value: (amount * publicTokenPrice).toString(),
                })
            ).to.be.revertedWith("Low-level call failed!") // NotAnAccount custom error in ilkelBenlik
        })
        it("fails if request exceeds max amount per transaction", async function () {
            const amount = "40"
            await expect(
                ilkelBenlik.publicSaleMint(amount, {
                    value: (amount * publicTokenPrice).toString(),
                })
            ).to.be.revertedWithCustomError(
                ilkelBenlik,
                "MaxAmountPerMintExceeded"
            )
        })
        it("fails if max supply is exceeded", async function () {
            // w1 and wl2 have already minted 20 tokens each from whitelist sale. deployer, wl1 and wl2 mints 30 + 20 tokens; user1 tries to mint 20 tokens.
            let amount = "30"
            let txResponse = await ilkelBenlik.publicSaleMint(amount, {
                value: (amount * publicTokenPrice).toString(),
            })
            await txResponse.wait(1)
            txResponse = await wl1ConnectedContract.publicSaleMint(amount, {
                value: (amount * publicTokenPrice).toString(),
            })
            await txResponse.wait(1)
            txResponse = await wl2ConnectedContract.publicSaleMint(amount, {
                value: (amount * publicTokenPrice).toString(),
            })
            await txResponse.wait(1)
            amount = "20"
            txResponse = await ilkelBenlik.publicSaleMint(amount, {
                value: (amount * publicTokenPrice).toString(),
            })
            await txResponse.wait(1)
            txResponse = await wl1ConnectedContract.publicSaleMint(amount, {
                value: (amount * publicTokenPrice).toString(),
            })
            await txResponse.wait(1)
            txResponse = await wl2ConnectedContract.publicSaleMint(amount, {
                value: (amount * publicTokenPrice).toString(),
            })
            await txResponse.wait(1)
            await expect(
                user1ConnectedContract.publicSaleMint(amount, {
                    value: (amount * publicTokenPrice).toString(),
                })
            ).to.be.revertedWithCustomError(ilkelBenlik, "MaxSupplyExceeded")
        })
        it("fails if max token amount per address is exceeded", async function () {
            const amount = "30"
            const txResponse = await ilkelBenlik.publicSaleMint(amount, {
                value: (amount * publicTokenPrice).toString(),
            })
            await txResponse.wait(1)
            await expect(
                ilkelBenlik.publicSaleMint(amount, {
                    value: (amount * publicTokenPrice).toString(),
                })
            ).to.be.revertedWithCustomError(
                ilkelBenlik,
                "MaxAmountPerAccountExceeded"
            )
        })
        it("fails if the caller provides insufficient ETH", async function () {
            const amount = "20"
            await expect(
                ilkelBenlik.publicSaleMint(amount, {
                    value: publicTokenPrice.toString(),
                })
            ).to.be.revertedWithCustomError(ilkelBenlik, "InsufficientETH")
        })
        it("mints the correct amount of tokens to the caller", async function () {
            const startingTokenBalance = await ilkelBenlik.balanceOf(deployer)
            const startingContractBalance = await ilkelBenlik.contractBalance()
            const amount = "30"
            const txResponse = await ilkelBenlik.publicSaleMint(amount, {
                value: (amount * publicTokenPrice).toString(),
            })
            await txResponse.wait(1)
            const endingTokenBalance = await ilkelBenlik.balanceOf(deployer)
            const endingContractBalance = await ilkelBenlik.contractBalance()
            // Ideally should be 1 assert per "it"
            assert.equal(
                endingTokenBalance.toString(),
                (
                    parseInt(startingTokenBalance, 10) + parseInt(amount, 10)
                ).toString()
            )
            assert.equal(
                endingContractBalance.toString(),
                (
                    parseInt(startingContractBalance, 10) +
                    parseInt(amount * publicTokenPrice, 10)
                ).toString()
            )
            assert.equal(
                (await ilkelBenlik.getPublicMintCounter(deployer)).toString(),
                amount
            )
        })
    })
    describe("externalWhitelistMint", async function () {
        beforeEach(async function () {
            let amount = "4"
            let txResponse = await ilkelBenlik.airdropMint(deployer, amount)
            await txResponse.wait(1)
            amount = "3"
            txResponse = await ilkelBenlik.airdropMint(wl1, amount)
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.airdropMint(user1, amount)
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.changeState(whitelistState)
            await txResponse.wait(1)
        })
        it("fails if state is 'closed'", async function () {
            const txResponse = await ilkelBenlik.changeState(closedState)
            await txResponse.wait(1)
            const amount = "1"
            await expect(
                ilkelBenlik.externalWhitelistSaleMint(zeroAddress, amount)
            ).to.be.revertedWithCustomError(
                ilkelBenlik,
                "NotWhitelistSalePhase"
            )
        })
        it("fails if state is 'public'", async function () {
            const txResponse = await ilkelBenlik.changeState(publicState)
            await txResponse.wait(1)
            const amount = "1"
            await expect(
                ilkelBenlik.externalWhitelistSaleMint(zeroAddress, amount)
            ).to.be.revertedWithCustomError(
                ilkelBenlik,
                "NotWhitelistSalePhase"
            )
        })
        it("fails if caller is not an admin", async function () {
            const amount = "10"
            await expect(
                attackerConnectedContract.externalWhitelistSaleMint(
                    deployer,
                    amount
                )
            ).to.be.revertedWithCustomError(ilkelBenlik, "NotAnAdmin")
        })
        it("fails if max supply for whitelist is exceeded", async function () {
            let txResponse = await ilkelBenlik.changeState(closedState)
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.changeState(whitelistState)
            await txResponse.wait(1)
            // deployer minted 2, wl1 minted 2, wl2 try to mint 2 as external
            const amount = "20"
            let proof = await merkle(deployer)
            txResponse = await ilkelBenlik.whitelistSaleMint(amount, proof, {
                value: (amount * whitelistTokenPrice).toString(),
            })
            await txResponse.wait(1)
            proof = await merkle(wl1)
            txResponse = await wl1ConnectedContract.whitelistSaleMint(
                amount,
                proof,
                {
                    value: (amount * whitelistTokenPrice).toString(),
                }
            )
            await txResponse.wait(1)
            await expect(
                ilkelBenlik.externalWhitelistSaleMint(wl2, amount)
            ).to.be.revertedWithCustomError(
                ilkelBenlik,
                "MaxSupplyForWhitelistExceeded"
            )
        })
        it("fails if max token amount per whitelist is exceeded", async function () {
            let amount = "10"
            let proof = await merkle(wl1)
            const txResponse = await wl1ConnectedContract.whitelistSaleMint(
                amount,
                proof,
                {
                    value: (amount * whitelistTokenPrice).toString(),
                }
            )
            await txResponse.wait(1)
            amount = "20"
            await expect(
                ilkelBenlik.externalWhitelistSaleMint(wl1, amount)
            ).to.be.revertedWithCustomError(
                ilkelBenlik,
                "MaxAmountPerWhitelistExceeded"
            )
        })
        it("mints the correct amount of tokens to the caller", async function () {
            const amount1 = "20"
            let txResponse = await ilkelBenlik.externalWhitelistSaleMint(
                wl1,
                amount1
            )
            await txResponse.wait(1)
            const amount2 = "10"
            txResponse =
                await admin1ConnectedContract.externalWhitelistSaleMint(
                    zeroAddress,
                    amount2
                )
            await txResponse.wait(1)
            // Ideally should be 1 assert per "it"
            assert.equal(
                (await ilkelBenlik.balanceOf(wl1)).toString(),
                (parseInt(amount1) + 3).toString()
            )
            assert.equal(
                (await ilkelBenlik.balanceOf(admin1)).toString(),
                amount2
            )
            assert.equal(
                (await ilkelBenlik.totalSupply()).toString(),
                (
                    parseInt(amount1, 10) +
                    parseInt(amount2, 10) +
                    parseInt(await ilkelBenlik.MAX_TOKENS_FOR_AIRDROP(), 10)
                ).toString()
            )
            assert.equal(
                (await ilkelBenlik.getWhitelistMintCounter(wl1)).toString(),
                amount1
            )
        })
    })
    describe("externalPublicMint", async function () {
        beforeEach(async function () {
            let amount = "4"
            let txResponse = await ilkelBenlik.airdropMint(deployer, amount)
            await txResponse.wait(1)
            amount = "3"
            txResponse = await ilkelBenlik.airdropMint(wl1, amount)
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.airdropMint(user1, amount)
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.changeState(whitelistState)
            await txResponse.wait(1)
            amount = "20"
            let proof = await merkle(wl1)
            txResponse = await wl1ConnectedContract.whitelistSaleMint(
                amount,
                proof,
                {
                    value: (amount * whitelistTokenPrice).toString(),
                }
            )
            await txResponse.wait(1)
            proof = await merkle(wl2)
            txResponse = await wl2ConnectedContract.whitelistSaleMint(
                amount,
                proof,
                {
                    value: (amount * whitelistTokenPrice).toString(),
                }
            )
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.changeState(publicState)
            await txResponse.wait(1)
        })
        it("fails if the state is 'closed'", async function () {
            let txResponse = await ilkelBenlik.changeState(closedState)
            await txResponse.wait(1)
            const amount = "30"
            await expect(
                ilkelBenlik.externalPublicSaleMint(zeroAddress, amount)
            ).to.be.revertedWithCustomError(ilkelBenlik, "NotPublicSalePhase")
        })
        it("fails if the state is 'whitelist'", async function () {
            let txResponse = await ilkelBenlik.changeState(whitelistState)
            await txResponse.wait(1)
            const amount = "30"
            await expect(
                ilkelBenlik.externalPublicSaleMint(zeroAddress, amount)
            ).to.be.revertedWithCustomError(ilkelBenlik, "NotPublicSalePhase")
        })
        it("fails if caller is not an admin", async function () {
            const amount = "10"
            await expect(
                attackerConnectedContract.externalPublicSaleMint(
                    zeroAddress,
                    amount
                )
            ).to.be.revertedWithCustomError(ilkelBenlik, "NotAnAdmin")
        })
        it("fails if request exceeds max amount per transaction", async function () {
            const amount = "40"
            await expect(
                ilkelBenlik.externalPublicSaleMint(zeroAddress, amount)
            ).to.be.revertedWithCustomError(
                ilkelBenlik,
                "MaxAmountPerMintExceeded"
            )
        })
        it("fails if max supply is exceeded", async function () {
            // w1 and wl2 have already minted 20 tokens each from whitelist sale. deployer, wl1 and wl2 mints 30 + 20 tokens; user1 tries to mint 20 tokens as external.
            let amount = "30"
            let txResponse = await ilkelBenlik.publicSaleMint(amount, {
                value: (amount * publicTokenPrice).toString(),
            })
            await txResponse.wait(1)
            txResponse = await wl1ConnectedContract.publicSaleMint(amount, {
                value: (amount * publicTokenPrice).toString(),
            })
            await txResponse.wait(1)
            txResponse = await wl2ConnectedContract.publicSaleMint(amount, {
                value: (amount * publicTokenPrice).toString(),
            })
            await txResponse.wait(1)
            amount = "20"
            txResponse = await ilkelBenlik.publicSaleMint(amount, {
                value: (amount * publicTokenPrice).toString(),
            })
            await txResponse.wait(1)
            txResponse = await wl1ConnectedContract.publicSaleMint(amount, {
                value: (amount * publicTokenPrice).toString(),
            })
            await txResponse.wait(1)
            txResponse = await wl2ConnectedContract.publicSaleMint(amount, {
                value: (amount * publicTokenPrice).toString(),
            })
            await txResponse.wait(1)
            await expect(
                ilkelBenlik.externalPublicSaleMint(zeroAddress, amount)
            ).to.be.revertedWithCustomError(ilkelBenlik, "MaxSupplyExceeded")
        })
        it("fails if max token amount per address is exceeded", async function () {
            const amount = "30"
            const txResponse = await user1ConnectedContract.publicSaleMint(
                amount,
                {
                    value: (amount * publicTokenPrice).toString(),
                }
            )
            await txResponse.wait(1)
            await expect(
                ilkelBenlik.externalPublicSaleMint(user1, amount)
            ).to.be.revertedWithCustomError(
                ilkelBenlik,
                "MaxAmountPerAccountExceeded"
            )
        })
        it("mints the correct amount of tokens to the caller", async function () {
            const startingTokenBalance = await ilkelBenlik.balanceOf(admin1)
            const amount = "30"
            let txResponse =
                await admin1ConnectedContract.externalPublicSaleMint(
                    zeroAddress,
                    amount
                )
            await txResponse.wait(1)
            const endingTokenBalance = await ilkelBenlik.balanceOf(admin1)

            const startingUser1Balance = await ilkelBenlik.balanceOf(user1)
            txResponse = await admin1ConnectedContract.externalPublicSaleMint(
                user1,
                amount
            )
            await txResponse.wait(1)
            const endingUser1Balance = await ilkelBenlik.balanceOf(user1)
            // Ideally should be 1 assert per "it"
            assert.equal(
                endingTokenBalance.toString(),
                (
                    parseInt(startingTokenBalance, 10) + parseInt(amount, 10)
                ).toString()
            )
            assert.equal(
                (await ilkelBenlik.getPublicMintCounter(admin1)).toString(),
                amount
            )

            assert.equal(
                endingUser1Balance.toString(),
                (
                    parseInt(startingUser1Balance, 10) + parseInt(amount, 10)
                ).toString()
            )
            assert.equal(
                (await ilkelBenlik.getPublicMintCounter(user1)).toString(),
                amount
            )
        })
    })
    describe("reveal", async function () {
        beforeEach(async function () {
            let amount = "4"
            let txResponse = await ilkelBenlik.airdropMint(deployer, amount)
            await txResponse.wait(1)
            amount = "3"
            txResponse = await ilkelBenlik.airdropMint(wl1, amount)
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.airdropMint(user1, amount)
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.changeState(publicState)
            await txResponse.wait(1)
            amount = "3"
            txResponse = await ilkelBenlik.publicSaleMint(amount, {
                value: (amount * publicTokenPrice).toString(),
            })
            await txResponse.wait(1)
        })
        it("fails if the caller is not the owner", async function () {
            await expect(
                wl1ConnectedContract.reveal(baseUri)
            ).to.be.revertedWith("Ownable: caller is not the owner")
        })
        it("fails if the state is 'closed'", async function () {
            const txResponse = await ilkelBenlik.changeState(closedState)
            await txResponse.wait(1)
            await expect(
                ilkelBenlik.reveal(baseUri)
            ).to.be.revertedWithCustomError(ilkelBenlik, "WrongStateForReveal")
        })
        it("fails if the state is 'whitelist'", async function () {
            const txResponse = await ilkelBenlik.changeState(whitelistState)
            await txResponse.wait(1)
            await expect(
                ilkelBenlik.reveal(baseUri)
            ).to.be.revertedWithCustomError(ilkelBenlik, "WrongStateForReveal")
        })
        it("fails if the metadata has already revealed", async function () {
            const txResponse = await ilkelBenlik.reveal(baseUri)
            await txResponse.wait(1)
            await expect(
                ilkelBenlik.reveal(baseUri)
            ).to.be.revertedWithCustomError(ilkelBenlik, "AlreadyRevealed")
        })
        it("reveals the metadata correctly", async function () {
            const txResponse = await ilkelBenlik.reveal(baseUri)
            await txResponse.wait(1)
            assert.equal(
                await ilkelBenlik.tokenURI("11"),
                baseUri + "11" + ".json"
            )
        })
    })
    describe("tokenURI", async function () {
        it("fails if querying token id does not exist", async function () {
            await expect(ilkelBenlik.tokenURI("5")).to.be.revertedWith(
                "ERC721Metadata: URI query for nonexistent token"
            )
        })
        it("returns token URIs before reveal correctly", async function () {
            const amount = "10"
            let txResponse = await ilkelBenlik.airdropMint(deployer, amount)
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.changeState(whitelistState)
            await txResponse.wait(1)
            const proof = await merkle(wl1)
            txResponse = await wl1ConnectedContract.whitelistSaleMint(
                amount,
                proof,
                {value: (amount * whitelistTokenPrice).toString()}
            )
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.changeState(publicState)
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.publicSaleMint(amount, {
                value: (amount * publicTokenPrice).toString(),
            })
            await txResponse.wait(1)
            // Ideally should be 1 assert per "it"
            assert.equal(
                await ilkelBenlik.tokenURI("4"),
                (await ilkelBenlik.AIRDROP_BASE_URI()) + "4" + ".json"
            )
            assert.equal(
                await ilkelBenlik.tokenURI("14"),
                (await ilkelBenlik.BASE_URI()) + "hidden" + ".json"
            )
            assert.equal(
                await ilkelBenlik.tokenURI("24"),
                (await ilkelBenlik.BASE_URI()) + "hidden" + ".json"
            )
        })
        it("returns token URIs after reveal correctly", async function () {
            const amount = "10"
            let txResponse = await ilkelBenlik.airdropMint(deployer, amount)
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.changeState(whitelistState)
            await txResponse.wait(1)
            const proof = await merkle(wl1)
            txResponse = await wl1ConnectedContract.whitelistSaleMint(
                amount,
                proof,
                {value: (amount * whitelistTokenPrice).toString()}
            )
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.changeState(publicState)
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.publicSaleMint(amount, {
                value: (amount * publicTokenPrice).toString(),
            })
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.reveal(baseUri)
            await txResponse.wait(1)
            // Ideally should be 1 assert per "it"
            assert.equal(
                await ilkelBenlik.tokenURI("4"),
                (await ilkelBenlik.AIRDROP_BASE_URI()) + "4" + ".json"
            )
            assert.equal(
                await ilkelBenlik.tokenURI("14"),
                baseUri + "14" + ".json"
            )
            assert.equal(
                await ilkelBenlik.tokenURI("24"),
                baseUri + "24" + ".json"
            )
        })
    })
    describe("withdraw", async function () {
        beforeEach(async function () {
            let amount = "4"
            let txResponse = await ilkelBenlik.airdropMint(deployer, amount)
            await txResponse.wait(1)
            amount = "3"
            txResponse = await ilkelBenlik.airdropMint(wl1, amount)
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.airdropMint(user1, amount)
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.changeState(publicState)
            await txResponse.wait(1)
            amount = "3"
            txResponse = await ilkelBenlik.publicSaleMint(amount, {
                value: (amount * publicTokenPrice).toString(),
            })
            await txResponse.wait(1)
        })
        it("fails if the caller is not the owner", async function () {
            await expect(wl1ConnectedContract.withdrawAll()).to.be.revertedWith(
                "Ownable: caller is not the owner"
            )
        })
        it("fails if contract balance equals 0", async function () {
            const txResponse = await ilkelBenlik.withdrawAll()
            await txResponse.wait(1)
            await expect(
                ilkelBenlik.withdrawAll()
            ).to.be.revertedWithoutReason()
        })
        it("withdraws contract balance to associated addresses properly", async function () {
            const startingContractBalance = await ilkelBenlik.contractBalance()
            const startingOwnerBalance = await ilkelBenlik.provider.getBalance(
                communityWallet
            )
            const txResponse = await ilkelBenlik.withdrawAll()
            await txResponse.wait(1)
            const endingContractBalance = await ilkelBenlik.contractBalance()
            const endingOwnerBalance = await ilkelBenlik.provider.getBalance(
                communityWallet
            )
            // Ideally should be 1 assert per "it"
            assert.equal(endingContractBalance.toString(), "0")
            assert.equal(
                endingOwnerBalance.toString(),
                startingOwnerBalance
                    .add(startingContractBalance.div(20))
                    .toString()
            )
        })
    })
    describe("token-listing", async function () {
        beforeEach(async function () {
            let amount = "4"
            let txResponse = await ilkelBenlik.airdropMint(deployer, amount)
            await txResponse.wait(1)
            amount = "3"
            txResponse = await ilkelBenlik.airdropMint(wl1, amount)
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.airdropMint(user1, amount)
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.changeState(publicState)
            await txResponse.wait(1)
            amount = "3"
            txResponse = await ilkelBenlik.publicSaleMint(amount, {
                value: (amount * publicTokenPrice).toString(),
            })
            await txResponse.wait(1)
        })
        it("fails if the caller contract is not approved by default", async function () {
            await expect(
                minterContract.listToken(ilkelBenlik.address, "1")
            ).to.be.revertedWithCustomError(
                ilkelBenlik,
                "TransferCallerNotOwnerNorApproved"
            )
        })
        it("transfers the tokens without an approval correctly", async function () {
            const txResponse = await transferProxyMock.listToken(
                ilkelBenlik.address,
                "1"
            )
            await txResponse.wait(1)
            assert.equal(
                (
                    await ilkelBenlik.balanceOf(transferProxyMock.address)
                ).toString(),
                "1"
            )
        })
    })
    describe("tokensOfOwner", async function () {
        it("returns token ids of an address", async function () {
            let amount = "4"
            let txResponse = await ilkelBenlik.airdropMint(deployer, amount)
            await txResponse.wait(1)
            amount = "3"
            txResponse = await ilkelBenlik.airdropMint(wl1, amount)
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.airdropMint(user1, amount)
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.changeState(publicState)
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.publicSaleMint(amount, {
                value: (amount * publicTokenPrice).toString(),
            })
            await txResponse.wait(1)
            txResponse = await wl1ConnectedContract.publicSaleMint(amount, {
                value: (amount * publicTokenPrice).toString(),
            })
            await txResponse.wait(1)
            txResponse = await wl2ConnectedContract.publicSaleMint(amount, {
                value: (amount * publicTokenPrice).toString(),
            })
            await txResponse.wait(1)
            amount = "1"
            txResponse = await ilkelBenlik.publicSaleMint(amount, {
                value: (amount * publicTokenPrice).toString(),
            })
            await txResponse.wait(1)
            txResponse = await wl1ConnectedContract.publicSaleMint(amount, {
                value: (amount * publicTokenPrice).toString(),
            })
            await txResponse.wait(1)
            txResponse = await wl2ConnectedContract.publicSaleMint(amount, {
                value: (amount * publicTokenPrice).toString(),
            })
            txResponse = await ilkelBenlik.publicSaleMint(amount, {
                value: (amount * publicTokenPrice).toString(),
            })
            await txResponse.wait(1)
            txResponse = await wl1ConnectedContract.publicSaleMint(amount, {
                value: (amount * publicTokenPrice).toString(),
            })
            await txResponse.wait(1)
            txResponse = await wl2ConnectedContract.publicSaleMint(amount, {
                value: (amount * publicTokenPrice).toString(),
            })
            const expectedIds = [1, 2, 3, 4, 11, 12, 13, 20, 23]
            assert.equal(
                (await ilkelBenlik.tokensOfOwner(deployer)).toString(),
                expectedIds
            )
        })
    })
    describe("end-to-end", async function () {
        // FOR TRACKING GAS OPTIMIZATION
        it("works the all process properly", async function () {
            // BEFORE-SALE
            let amount = "10"
            let txResponse = await ilkelBenlik.airdropMint(deployer, amount)
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.changeState(whitelistState)
            await txResponse.wait(1)
            // WHITELIST-SALE
            // let amount = "1"
            // txResponse = await wl1ConnectedContract.whitelistSaleMint(amount, {
            //     value: (amount * whitelistTokenPrice).toString(),
            // })
            // await txResponse.wait(1)
            amount = "20"
            const proof = await merkle(wl2)
            txResponse = await wl2ConnectedContract.whitelistSaleMint(
                amount,
                proof,
                {
                    value: (amount * whitelistTokenPrice).toString(),
                }
            )
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.changeState(publicState)
            await txResponse.wait(1)
            // PUBLIC-SALE
            // txResponse = await user1ConnectedContract.publicSaleMint(amount, {
            //     value: (amount * publicTokenPrice).toString(),
            // })
            // await txResponse.wait(1)
            // amount = "20"
            // txResponse = await user1ConnectedContract.publicSaleMint(amount, {
            //     value: (amount * publicTokenPrice).toString(),
            // })
            // await txResponse.wait(1)
            amount = "30"
            txResponse = await user1ConnectedContract.publicSaleMint(amount, {
                value: (amount * publicTokenPrice).toString(),
            })
            await txResponse.wait(1)
            // AFTER-SALE
            txResponse = await ilkelBenlik.reveal(baseUri)
            await txResponse.wait(1)
            txResponse = await ilkelBenlik.withdrawAll()
            await txResponse.wait(1)
            assert.equal(
                await ilkelBenlik.tokenURI("11"),
                baseUri + "11" + ".json"
            )
            // txResponse = await user1ConnectedContract.transferFrom(user1, deployer, "50")
            // await txResponse.wait(1)
            // txResponse = await user1ConnectedContract.transferFrom(user1, deployer, "35")
            // await txResponse.wait(1)
            txResponse = await user1ConnectedContract.transferFrom(
                user1,
                deployer,
                "31"
            )
            await txResponse.wait(1)
        })
    })
})
