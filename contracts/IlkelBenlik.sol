// SPDX-License-Identifier: MIT

/**
 * @title NFTs of ID Series Art Collection
 * @author Lruquaf ---> github.com/Lruquaf
 * @notice NFT Minting Contract of ID Series Art Collection by Necmi Gürseler
 */

pragma solidity 0.8.20;

import {IERC721A} from "erc721a/contracts/IERC721A.sol";
import {ERC721A} from "erc721a/contracts/ERC721A.sol";
import {ERC721AQueryable} from "erc721a/contracts/extensions/ERC721AQueryable.sol";
import {ERC2981} from "@openzeppelin/contracts/token/common/ERC2981.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {MerkleProof} from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

error InvalidInput();
error NotAnAccount();
error NotAWhitelisted();
error WrongStateForReveal();
error AlreadyRevealed();
error StillAirdropPhase();
error NotAirdropPhase();
error MaxSupplyForAirdropExceeded();
error NotWhitelistSalePhase();
error MaxSupplyForWhitelistExceeded();
error MaxAmountPerWhitelistExceeded();
error NotPublicSalePhase();
error MaxAmountPerMintExceeded();
error MaxSupplyExceeded();
error MaxAmountPerAccountExceeded();
error InsufficientETH();
error SaleHasStarted();
error TransferFailed();

contract IlkelBenlik is ERC721AQueryable, ERC2981, Ownable {
    using Strings for uint256;

    // state of sale
    enum STATE {
        CLOSED,
        WHITELIST,
        PUBLIC
    }
    // sale is closed initally
    STATE public state = STATE.CLOSED;

    // Transfer Proxy address to bypass approval during token listing
    address public raribleTransferProxy;

    // A placeholder URI as base URI of whitelist and public tokens before reveal
    string public BASE_URI =
        "ipfs://bafybeihawpmgq5vlku7g2aaocu2e2e7fqzvqe7qtq4kav2ge2jy5ojsqte/";
    // URI of airdropped tokens
    string public constant AIRDROP_BASE_URI =
        "ipfs://bafybeig5mbiinirndd6m43l2no2a46wcnnsihod4oo2hzoir5fyxklwuci/";

    // reveal state
    bool public isRevealed = false;

    // max supply
    uint256 public immutable MAX_TOKENS;
    // reserved supply for whitelist
    uint256 public immutable MAX_TOKENS_FOR_WHITELIST;
    // reserved supply for airdrop
    uint256 public immutable MAX_TOKENS_FOR_AIRDROP;

    // token price for whitelist sale
    uint256 public immutable WHITELIST_TOKEN_PRICE;
    // token price for public sale
    uint256 public immutable PUBLIC_TOKEN_PRICE;

    // mint limit per transaction (only public sale)
    uint256 public immutable MAX_AMOUNT_PER_MINT;

    // whitelist mint limit per account
    uint256 public immutable MAX_AMOUNT_PER_WHITELIST;
    // public mint limit per account
    uint256 public immutable MAX_AMOUNT_PER_ACCOUNT;

    // receiver of majority of sale income
    address public immutable FOUNDER_1;
    // receiver of creator earnings
    address public immutable FOUNDER_2;
    // receiver of remainder of sale income
    address public immutable COMMUNITY_WALLET;

    // root hash of whitelist's merkle tree
    bytes32 public immutable MERKLE_ROOT;

    /**
     * @notice state variables are defined and royalty is set in constructor
     */
    constructor(
        uint256 _maxTokens,
        uint256 _maxTokensForWhitelist,
        uint256 _maxTokensForAirdrop,
        uint256 _whitelistTokenPrice,
        uint256 _publicTokenPrice,
        uint256 _maxAmountPerMint,
        uint256 _maxAmountPerWhitelist,
        uint256 _maxAmountPerAccount,
        address _raribleTransferProxy,
        address _founder1,
        address _founder2,
        address _communityWallet,
        bytes32 _merkleRoot
    ) ERC721A("IlkelBenlik", "IB") {
        if (_maxTokensForWhitelist + _maxTokensForAirdrop > _maxTokens) {
            revert InvalidInput();
        }
        MAX_TOKENS = _maxTokens;
        MAX_TOKENS_FOR_WHITELIST = _maxTokensForWhitelist;
        MAX_TOKENS_FOR_AIRDROP = _maxTokensForAirdrop;
        WHITELIST_TOKEN_PRICE = _whitelistTokenPrice;
        PUBLIC_TOKEN_PRICE = _publicTokenPrice;
        MAX_AMOUNT_PER_MINT = _maxAmountPerMint;
        MAX_AMOUNT_PER_WHITELIST = _maxAmountPerWhitelist;
        MAX_AMOUNT_PER_ACCOUNT = _maxAmountPerAccount;
        raribleTransferProxy = _raribleTransferProxy;
        FOUNDER_1 = _founder1;
        FOUNDER_2 = _founder2;
        COMMUNITY_WALLET = _communityWallet;
        MERKLE_ROOT = _merkleRoot;
        _setDefaultRoyalty(_founder2, 500);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(IERC721A, ERC2981, ERC721A) returns (bool) {
        return
            ERC721A.supportsInterface(interfaceId) ||
            ERC2981.supportsInterface(interfaceId);
    }

    /**
     * @notice checks if the sender of message is an EOA
     */
    modifier onlyAccounts() {
        if (msg.sender != tx.origin) {
            revert NotAnAccount();
        }
        _;
    }

    /**
     * @notice checks if the sender of message is a whitelist
     */
    modifier onlyWhitelisted(bytes32[] calldata _merkleProof) {
        if (!isWhitelisted(msg.sender, _merkleProof)) {
            revert NotAWhitelisted();
        }
        _;
    }

    /**
     * @notice owner should reveal the metadata after sale phase only for once
     * @param _newBaseUri actual URI
     */
    function reveal(string memory _newBaseUri) public onlyOwner {
        if (state != STATE.PUBLIC) {
            revert WrongStateForReveal();
        } else if (isRevealed == true) {
            revert AlreadyRevealed();
        }
        isRevealed = true;
        BASE_URI = _newBaseUri;
    }

    /**
     * @notice owner can changes the sale state
     * @dev airdrop phase must be finished to change the state
     * @param _index index of state (0: closed, 1: whitelist, 2: public)
     */
    function changeState(uint256 _index) public onlyOwner {
        if (totalSupply() < MAX_TOKENS_FOR_AIRDROP) {
            revert StillAirdropPhase();
        }
        if (_index == 0) {
            state = STATE.CLOSED;
        } else if (_index == 1) {
            state = STATE.WHITELIST;
        } else if (_index == 2) {
            state = STATE.PUBLIC;
        } else {
            revert InvalidInput();
        }
    }

    /**
     * @notice owner can mint the tokens for airdrop before sale phases
     * @dev caller is owner but minter is '_to'
     * @dev '_setAirdropMintCounter' increases number of minted tokens of owner
     * in airdrop mint as auxiliary data
     * @param _to airdrop recipient
     * @param _amount token amount of airdrop
     */

    function airdropMint(address _to, uint256 _amount) public onlyOwner {
        if (totalSupply() + _amount > MAX_TOKENS_FOR_AIRDROP) {
            revert MaxSupplyForAirdropExceeded();
        }
        _setAirdropMintCounter(
            _to,
            getAirdropMintCounter(_to) + uint32(_amount)
        );
        _mint(_to, _amount);
    }

    /**
     * @notice whitelisted addressses can mint tokens for a certain ETH
     * within a certain limit during whitelist sale
     * @dev '_setWhitelistMintCounter' increases number of minted tokens of owner
     * in whitelist sale as auxiliary data
     * @param _amount token amount to mint
     */
    function whitelistSaleMint(
        uint256 _amount,
        bytes32[] calldata _merkleProof
    ) public payable onlyWhitelisted(_merkleProof) {
        if (state != STATE.WHITELIST) {
            revert NotWhitelistSalePhase();
        } else if (
            totalSupply() + _amount >
            MAX_TOKENS_FOR_WHITELIST + MAX_TOKENS_FOR_AIRDROP
        ) {
            revert MaxSupplyForWhitelistExceeded();
        } else if (
            uint256(getWhitelistMintCounter(msg.sender)) + _amount >
            MAX_AMOUNT_PER_WHITELIST
        ) {
            revert MaxAmountPerWhitelistExceeded();
        } else if (msg.value < _amount * WHITELIST_TOKEN_PRICE) {
            revert InsufficientETH();
        }
        _setWhitelistMintCounter(
            msg.sender,
            getWhitelistMintCounter(msg.sender) + uint32(_amount)
        );
        _mint(msg.sender, _amount);
    }

    /**
     * @notice any EOA address can mint tokens for a certain ETH
     * within a certain limit during public sale
     * @param _amount token amount to mint
     */
    function publicSaleMint(uint256 _amount) public payable onlyAccounts {
        if (state != STATE.PUBLIC) {
            revert NotPublicSalePhase();
        } else if (_amount > MAX_AMOUNT_PER_MINT) {
            revert MaxAmountPerMintExceeded();
        } else if (totalSupply() + _amount > MAX_TOKENS) {
            revert MaxSupplyExceeded();
        } else if (
            getPublicMintCounter(msg.sender) + _amount > MAX_AMOUNT_PER_ACCOUNT
        ) {
            revert MaxAmountPerAccountExceeded();
        } else if (msg.value < _amount * PUBLIC_TOKEN_PRICE) {
            revert InsufficientETH();
        }
        _mint(msg.sender, _amount);
    }

    ////////////////////////////////////
    // WORK IN PROGRESS
    ////////////////////////////////////

    /**
     * @notice whitelisted addressses can mint tokens for a certain ETH
     * within a certain limit during whitelist sale
     * @dev '_setWhitelistMintCounter' increases number of minted tokens of owner
     * in whitelist sale as auxiliary data
     * @param _amount token amount to mint
     */
    function externalWhitelistSaleMint(
        address _to,
        uint256 _amount
    ) public onlyOwner {
        if (_to == address(0)) {
            _mint(owner(), _amount);
        } else {
            if (state != STATE.WHITELIST) {
                revert NotWhitelistSalePhase();
            } else if (
                totalSupply() + _amount >
                MAX_TOKENS_FOR_WHITELIST + MAX_TOKENS_FOR_AIRDROP
            ) {
                revert MaxSupplyForWhitelistExceeded();
            } else if (
                uint256(getWhitelistMintCounter(_to)) + _amount >
                MAX_AMOUNT_PER_WHITELIST
            ) {
                revert MaxAmountPerWhitelistExceeded();
            }
            _setWhitelistMintCounter(
                _to,
                getWhitelistMintCounter(_to) + uint32(_amount)
            );
            _mint(_to, _amount);
        }
    }

    /**
     * @notice any EOA address can mint tokens for a certain ETH
     * within a certain limit during public sale
     * @param _amount token amount to mint
     */
    function externalPublicSaleMint(
        address _to,
        uint256 _amount
    ) public onlyOwner {
        if (_to == address(0)) {
            _mint(owner(), _amount);
        } else {
            if (state != STATE.PUBLIC) {
                revert NotPublicSalePhase();
            } else if (_amount > MAX_AMOUNT_PER_MINT) {
                revert MaxAmountPerMintExceeded();
            } else if (totalSupply() + _amount > MAX_TOKENS) {
                revert MaxSupplyExceeded();
            } else if (
                getPublicMintCounter(_to) + _amount > MAX_AMOUNT_PER_ACCOUNT
            ) {
                revert MaxAmountPerAccountExceeded();
            }
            _mint(_to, _amount);
        }
    }

    ///////////////////////////////////////
    ///////////////////////////////////////
    ///////////////////////////////////////

    /**
     * @notice owner can withdraw the all balance to associated accounts at any time
     * @dev calls _withdraw function to withdraw assets
     */
    function withdrawAll() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0);

        _withdraw(FOUNDER_1, (balance * 950) / 1000);
        _withdraw(COMMUNITY_WALLET, (balance * 50) / 1000);

        if (address(this).balance > 0) {
            _withdraw(owner(), address(this).balance);
        }
    }

    /**
     * @dev withdraws the assets by low-level calls
     * @param _address destination address
     * @param _amount amount of assets
     */
    function _withdraw(address _address, uint256 _amount) private {
        (bool success, ) = _address.call{value: _amount}("");
        if (!success) {
            revert TransferFailed();
        }
    }

    /**
     * @notice sets number of minted tokens of an address during airdrop
     * @dev airdrop counter is set at [0..31] bits of '_auxData'
     * ([192..223] bits of '_packedAddressData')
     * @param _account airdrop recipient
     * @param _amount total amount of airdrop
     */
    function _setAirdropMintCounter(address _account, uint32 _amount) internal {
        _setAux(_account, uint64(_amount));
    }

    /**
     * @notice sets number of minted tokens of an address during whitelist mint
     * @dev whitelist mint counter is set at [32..63] bits of '_auxData'
     * ([224..255] bits of '_packedAddressData')
     * @param _account whitelist minter
     * @param _amount total amount of whitelist mint of '_account'
     */
    function _setWhitelistMintCounter(
        address _account,
        uint32 _amount
    ) internal {
        uint256 _bitpos = 32;
        uint64 _auxData = uint64((uint256(_amount) << _bitpos)) +
            uint64(getAirdropMintCounter(_account));
        _setAux(_account, _auxData);
    }

    /**
     * @return token id of first token
     */
    function _startTokenId() internal view virtual override returns (uint256) {
        return 1;
    }

    /**
     * @param _tokenId querying token id
     * @return token URI
     */
    function tokenURI(
        uint256 _tokenId
    ) public view virtual override(ERC721A, IERC721A) returns (string memory) {
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        if (_tokenId <= MAX_TOKENS_FOR_AIRDROP) {
            return
                bytes(AIRDROP_BASE_URI).length > 0
                    ? string(
                        abi.encodePacked(
                            AIRDROP_BASE_URI,
                            _tokenId.toString(),
                            ".json"
                        )
                    )
                    : "";
        } else {
            if (isRevealed == false) {
                return
                    bytes(BASE_URI).length > 0
                        ? string(abi.encodePacked(BASE_URI, "hidden", ".json"))
                        : "";
            }

            return
                bytes(BASE_URI).length > 0
                    ? string(
                        abi.encodePacked(BASE_URI, _tokenId.toString(), ".json")
                    )
                    : "";
        }
    }

    /**
     * @dev inherits from ERC721A and bypass approval requests from rarible
     * @return true if the operator is rarible
     */
    function isApprovedForAll(
        address owner,
        address operator
    ) public view override(ERC721A, IERC721A) returns (bool) {
        if (operator == address(raribleTransferProxy)) {
            return true;
        }

        return super.isApprovedForAll(owner, operator);
    }

    /**
     * @notice returns if an address whitelisted or not
     * by verifying merkle proof
     */
    function isWhitelisted(
        address _account,
        bytes32[] calldata _merkleProof
    ) public view returns (bool) {
        bytes32 leaf = keccak256(abi.encodePacked(_account));
        return MerkleProof.verify(_merkleProof, MERKLE_ROOT, leaf);
    }

    /**
     * @notice returns total airdrop amount of an address
     * @dev returns [0..31] bits of '_auxData'
     * ([192..223] bits of '_packedAddressData')
     * @param _account querying address
     */
    function getAirdropMintCounter(
        address _account
    ) public view returns (uint32) {
        uint64 _auxData = _getAux(_account);
        return uint32(_auxData);
    }

    /**
     * @notice returns total airdrop amount of an address
     * @dev returns [32..63] bits of '_auxData'
     * ([224..255] bits of '_packedAddressData')
     * @param _account querying address
     */
    function getWhitelistMintCounter(
        address _account
    ) public view returns (uint32) {
        uint64 _auxData = _getAux(_account);
        uint256 _bitpos = 32;
        return uint32(_auxData >> _bitpos);
    }

    /**
     * @notice returns mint amounts during public sale of addresses
     * @dev (total minted) - (minted in whitelist sale) - (minted in airdrop)
     */
    function getPublicMintCounter(
        address _account
    ) public view returns (uint256) {
        return
            _numberMinted(_account) -
            uint256(getAirdropMintCounter(_account)) -
            uint256(getWhitelistMintCounter(_account));
    }

    /**
     * @notice returns current state of sale
     */
    function currentState() public view returns (STATE) {
        return state;
    }

    /**
     * @notice returns contract balance
     */
    function contractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
