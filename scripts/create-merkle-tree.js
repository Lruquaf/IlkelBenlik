const {getNamedAccounts, ethers, network} = require("hardhat")
const {networkConfig} = require("../helper-hardhat-config")
const whitelists = require("../whitelists.json")
const {MerkleTree} = require("merkletreejs")
const keccak256 = require("keccak256")

async function main() {
    // const chainId = network.config.chainId
    // const owner = (await getNamedAccounts()).deployer
    // const contract = await ethers.getContract("IlkelBenlik", owner)

    const whitelistArray = whitelists.whitelists
    console.log(whitelistArray)

    let leaves = whitelistArray.map((address) => keccak256(address))
    let merkleTree = new MerkleTree(leaves, keccak256, {sortPairs: true})
    let rootHash = merkleTree.getRoot().toString("hex")
    console.log(merkleTree.toString())
    console.log(rootHash.toString())

    let address = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"
    let hashedAddress = keccak256(address)
    let proof = merkleTree.getHexProof(hashedAddress)
    console.log(proof)

    let verified = merkleTree.verify(proof, hashedAddress, rootHash)
    console.log(verified)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
