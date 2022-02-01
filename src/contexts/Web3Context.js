import { createContext, useEffect, useState } from "react";
import {
  getWeb3Provider,
  getMetamaskProvider,
  isMetamaskConnected,
  getAccountSigner,
  addMetamaskListeners,
  getRouterContract,
  getLibraryContract,
  getMasterChefContract,
  //connectToMetamask,
} from "../apis/blockchain";
import { ethers } from "ethers";
import { BscscanProvider } from "@ethers-ancillary/bsc";
export const Web3Context = createContext();

const Web3Provider = ({ children }) => {
  const [metamaskConnected, setMetamaskConnected] = useState(false);
  const [currentAccountAddress, setCurrentAccountAddress] = useState("");
  const [web3, setWeb3] = useState({
    initialized: false,
    metamaskProvider: null,
    web3Provider: null,
    networkID: 0,
    metamaskInstalled: true,
    routerContract: null,
  });

  const web3Setup = async () => {
    let metamaskProvider = await getMetamaskProvider();
    let web3Provider = await getWeb3Provider(metamaskProvider);

    if (metamaskProvider && web3Provider) {
      addMetamaskListeners(
        metamaskProvider,
        (chainId) => {
          window.location.reload(false);
        },
        (message) => {},
        async (accounts) => {
          window.location.reload(false);
          /*
          if (accounts.length === 0) {
            setMetamaskConnected(false);
            setCurrentAccountAddress("");
          } else if (accounts[0] !== currentAccountAddress) {
            setCurrentAccountAddress(accounts[0]);
            setMetamaskConnected(true);
          }
          */
        }
      );

      /*
      if (window.ethereum.chainId !== 56) {
        await metamaskProvider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x38",
              chainName: "Smart Chain",
              nativeCurrency: {
                name: "BNB",
                symbol: "BNB", // 2-6 characters long
                decimals: 18,
              },
              rpcUrls: ["https://bsc-dataseed.binance.org/"],
              blockExplorerUrls: ["https://bscscan.com"],
            },
          ],
        });
      }
      */

      let currentAccountAddress;
      try {
        currentAccountAddress = await (
          await getAccountSigner(web3Provider)
        ).getAddress();
      } catch (e) {
        currentAccountAddress = "";
      }
      setCurrentAccountAddress(currentAccountAddress);

      setMetamaskConnected(await isMetamaskConnected(metamaskProvider));

      if (!currentAccountAddress) {
        web3Provider = new ethers.providers.JsonRpcProvider(
          "https://bsc-dataseed1.defibit.io/",
          {
            chainId: 56,
            name: "bsc-mainnet",
          }
        );
        web3Provider.getSigner = () => web3Provider;
      }

      setWeb3({
        ...web3,
        initialized: true,
        web3Provider: web3Provider,
        metamaskProvider: metamaskProvider,
        networkID: parseInt(window.ethereum.chainId),
        routerContract: getRouterContract(web3Provider),
        libararyContract: getLibraryContract(web3Provider),
        masterChefContract: getMasterChefContract(web3Provider),
      });
    } else {
      setMetamaskConnected(false);
      setWeb3({
        ...web3,
        metamaskInstalled: false,
      });
    }
  };

  useEffect(() => {
    web3Setup();
  }, []);

  return (
    <Web3Context.Provider
      value={{ web3, currentAccountAddress, metamaskConnected }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
