// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract MinterContract is Ownable {
    address public immutable mintingContract;
    IERC721 public tokenInterface;

    constructor(address _mintingContract) {
        mintingContract = _mintingContract;
    }

    function mintToken(uint256 _amount) public payable onlyOwner {
        (bool success, ) = payable(mintingContract).call{value: msg.value}(
            abi.encodeWithSignature("publicSaleMint(uint256)", _amount)
        );
        require(success, "Low-level call failed!");
    }

    function listToken(address _tokenAddress, uint256 _tokenId) public {
        tokenInterface = IERC721(_tokenAddress);
        tokenInterface.safeTransferFrom(
            msg.sender,
            address(this),
            _tokenId,
            ""
        );
    }

    function receiveBack(address _tokenAddress, uint256 _tokenId) public {
        tokenInterface = IERC721(_tokenAddress);
        tokenInterface.safeTransferFrom(
            address(this),
            msg.sender,
            _tokenId,
            ""
        );
    }
}
