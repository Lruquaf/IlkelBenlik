
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// Using HTTPS
const web3 = createAlchemyWeb3("https://eth-goerli.g.alchemy.com/v2/v-2sbq8YEP823OVK4vdLVh8CBM1lqqUh");

const contract = require('../artifacts/contracts/ilkel.sol/ilkel.json'); 
// const contractAddress = '0x09695A4D3652A8191e08BFC0C46a4B4B2408068C';
const contractAddress = '0x73D0f03e1477D74CB39c971E03786A5144CA82E5';
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
// const { ethereum } = window;


export const connectWallet = async() => {
    if (window.ethereum) {
        try{
            const addressArray = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const obj = {
                address: addressArray[0],
                status: "",
            }
            return obj;
        }catch(err){
            return {
                address: "",
                status: err.message,
            }
        }
    }
    else{
        return{
            address: '',
            status: (
                <span>
                    <p>
                        {' '}
                        <a target="" href="https://metamask.io/download.html">
                            🦊 You must install Metamask, a virtual Ethereum wallet, in your browser.
                        </a>
                    </p>
                </span>
            ),
        };
    }
};

export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
        try{
            const addressArray = await window.ethereum.request({
                method: "eth_accounts",
            });

            if(addressArray.lenght > 0) {
                return {
                    address: addressArray[0],
                    status: "",
                };
            }
            else{
                return{
                    address: "",
                    status: "",
                };
            }
        }catch(err){
            return {
                address: "",
                status: err.message,
            }
        }
    }
    else{
        return{
            address: '',
            status: (
                <span>
                    <p>
                        {' '}
                        <a target="" href="https://metamask.io/download.html">
                            🦊 You must install Metamask, a virtual Ethereum wallet, in your browser.
                        </a>
                    </p>
                </span>
            ),
        };
    }
};


export const getMaxMintAmount = async() => {
    const result = await nftContract.methods.maxAmount().call();
    return result;
};

export const getTotalSupply = async() =>{
    const result = await nftContract.methods.totalSupply().call();
    return result;
};

export const getNftPrice = async() =>{
    const result = await nftContract.methods.tokenPrice().call();
    const resultEther = web3.utils.fromWei(result, "ether")
    return resultEther;
};

export const mintNFT = async (walletAddress, mintAmount) => {
    if (!window.ethereum.selectedAddress) {
      return {
        success: false,
        status: (
          <p>
            🦊 Connect to Metamask using{" "}
            <span className="px-2 text-purple-600">Connect Wallet</span> button.
          </p>
        ),
      };
    }
  
    //set up your Ethereum transaction
    const transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      value: parseInt(web3.utils.toWei("0.001", "ether") * mintAmount).toString(
        16
      ), // hex
      gasLimit: "0",
      data: nftContract.methods.publicSaleMint(walletAddress, mintAmount).encodeABI(), //make call to NFT smart contract
    };
    //sign the transaction via Metamask
    try {
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      return {
        success: true,
        status:
          "✅ Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/" +
          txHash,
      };
    } catch (error) {
      return {
        success: false,
        status: "😥 Something went wrong: " + error.message,
      };
    }
  };