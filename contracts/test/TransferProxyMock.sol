// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

// import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract TransferProxyMock {
    IERC721 public tokenInterface;

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

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4) {
        return this.onERC721Received.selector;
    }
}
