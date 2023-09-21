const whitelists = require("../whitelists.json")
const {MerkleTree} = require("merkletreejs")
const keccak256 = require("keccak256")

async function merkle(account) {
    // console.log("Verifying address...")

    const whitelistArray = whitelists.whitelists
    // console.log(whitelistArray)

    let leaves = whitelistArray.map((address) => keccak256(address))
    let merkleTree = new MerkleTree(leaves, keccak256, {sortPairs: true})

    let hashedAddress = keccak256(account)
    let proof = merkleTree.getHexProof(hashedAddress)
    // console.log(proof)

    // let verified = merkleTree.verify(proof, hashedAddress, rootHash)

    return proof
}

module.exports = {merkle}
