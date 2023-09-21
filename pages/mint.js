/* eslint-disable @next/next/no-css-tags */
import Head from 'next/head'
import Link from 'next/link';
import Script from 'next/script'

import {useState, useEffect, use} from "react";
import { connectWallet, 
        getCurrentWalletConnected,
        getMaxMintAmount,
        getTotalSupply,
        getNftPrice,
        mintNFT
    } from "../utils/interact";
import { useStatus } from "../context/statusContext";

export default function Mint() {
    const { status, setStatus } = useStatus();
    const [count, setCount] = useState(1);
    const [maxMintAmount, setMaxMintAmount] = useState(0);
    const [totalSupply, setTotalSupply] = useState(0);
    const [nftPrice, setNftPrice] = useState("0.001");

    const [walletAddress, setWalletAddress] = useState("");

    const [sCount,setsCount]= useState("1");
    useEffect(()=>{
        async function allFunc() {
            setMaxMintAmount(await getMaxMintAmount());
            setNftPrice(await getNftPrice());
            await updateTotalSupply();
        }allFunc()
    });

    const updateTotalSupply = async() =>{
        const mintedCount = await getTotalSupply();
        setTotalSupply(mintedCount)
    }

    const incrementCount = () => {
        if(count < maxMintAmount) {
            setCount(count + 1);
            setsCount(String(parseInt(sCount) + 1));
        }
    };

    const decrementCount = () => {
        if(count > 1) {
            setCount(count - 1);
            setsCount(String(parseInt(sCount) - 1));
        }
    };

    const mintToken =async () => {
        const { status } = await mintNFT(walletAddress, count);
        setStatus(status);

        updateTotalSupply();
    }

    const connectWalletPressed = async() => {
        const walletResponse = await connectWallet();
        setWalletAddress(walletResponse.address);
        setStatus(walletResponse.status);
    };

    useEffect(() => {
        async function fetchData() {
            const { address, status} = await getCurrentWalletConnected();
            setWalletAddress(address);
            setStatus(status);
            addWalletListener();
        }fetchData();
    }, []);

    const addWalletListener = () => {
        if(window.ethereum) {
            window.ethereum.on("accountsChanged", async(accounts) => {
                const { address, status } = await getCurrentWalletConnected();
                if(accounts.length > 0 ) {
                    setWalletAddress(accounts[0]);
                    setStatus("");
                }
                else {
                    setWalletAddress("");
                    setStatus("Connect to Metamask using Connect Wallet button.")
                }      
            });
        }
    }

    return(
        <>
        <Head>
  
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>İlkel Benlik</title>
            <link
                rel="shortcut icon"
                href="./assets/img/logo-01.png"
                type="image/x-icon"
            />
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
                integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=="
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
            />
            <link rel="stylesheet" href="https://use.typekit.net/jwl3vhh.css" />
            {/* <link rel="stylesheet" href="css/index.css" /> */}
            <link rel="stylesheet" href="css/mint.css" />


        </Head>
        
        {/*Navbar*/}
    <div className="navbar">
      {/*Navbar-LOGO*/}
      <div className="navbar-logo-box">
        <Link href="/">
          <img src="./assets/img/logo-01.png" alt="" className="header__logo" />
        </Link>
      </div>
      {/*Navbar-Page-Links*/}
      <nav className="navbar-nav">
        <ul className="navbar-list">

          <li className="navbar-item">
            <a href="./#about" className="navbar-link">
              Hakkında
            </a>
          </li>
          <li className="navbar-item">
            <a href="./#project" className="navbar-link">
              Proje
            </a>
          </li>
          <li className="navbar-item">
            <a href="./#roadmap" className="navbar-link">
              Yol Harİtası
            </a>
          </li>
          <li className="navbar-item">
            <a href="./#team" className="navbar-link">
              Takım
            </a>
          </li>
          <li className="navbar-item">
            <a href="./#faq" className="navbar-link">
              SSS
            </a>
          </li>
          <li className="navbar-item">
            <Link href="/mint" className="navbar-link">
              Mint
            </Link>
          </li>
        </ul>
        {/*Navbar-Social-Links*/}
        <ul className="navbar-list">
          <li className="navbar-item">
            <a href="https://twitter.com/IDseriesNFT" className="navbar-icon">
              <img
                src="./assets/img/logo-twitter.png"
                alt=""
                className="person-info-links-link-icon"
              />
            </a>
          </li>
          <li className="navbar-item">
            <a
              href="https://www.instagram.com/idseries.io/"
              className="navbar-icon"
            >
              <img
                src="./assets/img/logo-instagram.png"
                alt=""
                className="person-info-links-link-icon"
              />
            </a>
          </li>
          <li className="navbar-item">
            <a href="#" className="navbar-icon">
              <img
                src="./assets/img/logo-discord.png"
                alt=""
                className="person-info-links-link-icon"
              />
            </a>
          </li>
          
          <li className="navbar-item">
          <Link href="/index-eng" className="navbar-icon">
              <img
                    src="./assets/img/logo-eng.png"
                    alt=""
                    className="person-info-links-link-icon"
                  />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
    {/*Navigation Burger*/}
    <div className="navigation">
      {/*Burger*/}
      <div className="navigation-burger">
        <span className="navigation-icon-1">&nbsp;</span>
        <span className="navigation-icon-2">&nbsp;</span>
        <span className="navigation-icon-3">&nbsp;</span>
      </div>
      <div className="navigation-background">&nbsp;</div>
      <nav className="navigation-nav">
        {/*Burger-Links*/}
        <ul className="navigation-list">
          
          <li className="navigation-item">
            <a href="#about" className="navigation-link">
              Hakkında
            </a>
          </li>
          <li className="navigation-item">
            <a href="#project" className="navigation-link">
              Proje
            </a>
          </li>
          <li className="navigation-item">
            <a href="#roadmap" className="navigation-link">
              Yol Harİtası
            </a>
          </li>
          <li className="navigation-item">
            <a href="#team" className="navigation-link">
              Takım
            </a>
          </li>
          <li className="navigation-item">
            <a href="#faq" className="navigation-link">
              SSS
            </a>
          </li>
          {/*Burger-Social-Links*/}
          <ul className="footer-list">
            <li className="footer-item">
              <a href="https://twitter.com/IDseriesNFT" className="footer-icon">
                <img
                  src="./assets/img/logo-twitter.png"
                  alt=""
                  className="person-info-links-link-icon"
                />
              </a>
            </li>
            <li className="footer-item">
              <a
                href="https://www.instagram.com/idseries.io/"
                className="footer-icon"
              >
                <img
                  src="./assets/img/logo-instagram.png"
                  alt=""
                  className="person-info-links-link-icon"
                />
              </a>
            </li>
            <li className="footer-item">
              <a href="#" className="footer-icon">
                <img
                  src="./assets/img/logo-discord.png"
                  alt=""
                  className="person-info-links-link-icon"
                />
              </a>
            </li>
            
            <li className="footer-item">
              <a href="index-eng.html" className="footer-icon">
                <img
                  src="./assets/img/logo-eng.png"
                  alt=""
                  className="person-info-links-link-icon"
                />
              </a>
            </li>
          </ul>
        </ul>
      </nav>
    </div>

        
        <div className="min-h-screen h-full w-full overflow-hidden flex flex-col items-center justify-center bg-black">
            <div className="relative w-full h-full flex flex-col items-center justify-center scale-100">
                <img src="./assets/img/mintpageBG.jpg" className="absolute inset-auto block w-full min-h-screen object-cover" />

                <div className="flex flex-col items-center justify-center h-full w-full px-2 md:px-10">
                    <div className="z-1 md:max-w-3xl w-full bg-[url('../public/assets/img/Arkaplan4.jpg')] bg-cover bg-center bg-no-repeat bg-opacity-30 filter backdrop-blur-sm py-4 rounded-md px-4 md:px10 flex flex-col items-center">
                        
                        <h1 className="font-arial italic uppercase font-extrabold text-4xl md:text-5xl text-white mt-3">İLKEL BENLİK</h1>
                        
                        <h3 className="font-agencyr text-sm text-gray-200 tracking-widest">
                            {walletAddress.length > 0 ? (
                                "Connected: " + String(walletAddress).substring(0,6) + "..." + String(walletAddress).substring(38)
                            ):(
                                "Cüzdan bağlı değil! "
                            )}
                        </h3>

                        <div className="flex flex-col md:flex-row md:space-x-14 w-full mt-10 md:mt-14">
                            <div className="relative w-full">
                                
                                <div className="font-poppins z-10 absolute top-2 left-2 opacity-80 filter backdrop-blur-lg text-base px-4 py-2 bg-black border border-b-orange-800 rounded-md flex items-center justify-center text-white font-semibold">
                                    <p>
                                        <span className="text-orange-400">
                                            {`${totalSupply}`}
                                        </span> / 40
                                    
                                    </p>
                                </div>
                                
                                <img src="./assets/img/nftpic.png" className="object-cover w-full sm:h-[280px] md:w-[250px] rounded-md" />
                            </div>
                            
                            <div className="flex flex-col items-center w-full px-4 mt-16 md:mt-0">
                                <div className=" font-berlin flex items-center justify-between w-full">
                                    
                                    <button 
                                    className="w-14 h-10 md:w-16 md:h-12 flex items-center justify-center hover:shadow-lg bg-mintbg font-bold rounded-md"
                                    onClick={decrementCount}>
                                        
                                        <p className="font-berlin font-extrabold text-white text-5xl"> - </p>
                                    </button>
                                    
                                    <p className="font-arial flex items-center justify-center flex-1 grow text-center font-extrabold text-gray-300 text-4xl md:text-5xl">{count}</p>
                                    
                                    <button 
                                    className="w-14 h-10 md:w-16 md:h-12 flex items-center justify-center hover:shadow-lg bg-mintbg font-bold rounded-md"
                                    onClick={incrementCount}>
                                        
                                        <p className="font-berlin font-extrabold text-white text-5xl"> + </p>
                                    </button>
                                </div>
                                
                                <p className="font-agencyr text-sm text-gray-300 tracking-widest mt-3">Max Mint Limiti: 5</p>
                                
                                <div className="font-agencyr border-t border-b py-4 mt-16 w-full">
                                    <div className="w-full text-xl font-arial flex items-center justify-between text-yellow-500">
                                        <p>Ücret</p>

                                        <div className="flex items-center space-x-3">
                                            <p>{nftPrice} ETH</p>
                                            <span className="text-gray-400">+ GAS</span>
                                        </div>
                                    </div>
                                </div>

                                
                                {walletAddress ? (
                                    <button 
                                    className="mintbutton"
                                    onClick={mintToken}        >
                                        Mint
                                    </button>
                                ):(
                                    <button className="mintbutton"
                                            onClick={connectWalletPressed}>
                                        Cüzdan Bagla
                                    </button>
                                    // className="font-agencyr mt-12 w-56  bg-mintbg shadow-lg mb-1 px-6 py-3 rounded-lg font-extrabold text-2xl text-white hover:shadow-yellow-400/50 mx-4 tracking-wide uppercase"
                                )}
                                
                                

                            </div>
                        </div>

                        
                        {status && (
                            <div className="border border-bg-gray-400 rounded-md text-start h-full px-4 py-4 w-full mx-auto mt-8 md:mt-4">
                                <p className="flex flex-col space-y-2 text-white text-sm md:text-base break-words ... ">
                                    {status}
                                </p>
                            </div>
                        )}


                        
                    </div>
                </div>
            </div>
        </div>




        <Script src="./js/burger.js"></Script>
        <Script src="./js/stone.js"></Script>
        <Script src="./js/popup.js"></Script>
        <Script src="./js/faq.js"></Script>
        <Script src="./js/vanilla-tilt.js"></Script>
        </>
    )
}