import { ethers } from "ethers";
import from from "@metamask/detect-provider";
//import MasterABI from "../abis/MasterApef";

import {
  RouterAddress,
  MasterChefAddress,
  LibraryAddress,
  FactoryAddress,
} from "../constants/addresses";
import detectEthereumProvider from "@metamask/detect-provider";
import ERC20Abi from "../abis/ERC20";
import RouterABI from "../abis/Router";
import LibraryABI from "../abis/Library";
import MasterChefABI from "../abis/MasterChef";
//import { ChainId, Token, WETH, Fetcher, Route } from "@pancakeswap/sdk";

export const getWeb3Provider = (provider) => {
  if (provider) {
    return new ethers.providers.Web3Provider(provider);
  } else {
    return null;
  }
};

export const getMetamaskProvider = async () => {
  const provider = await detectEthereumProvider();
  if (provider) {
    return provider;
  } else {
    return null;
  }
};

export const isMetamaskConnected = async (provider) => {
  return provider.isConnected();
};

export const getAccountSigner = async (web3Provider) => {
  return await web3Provider.getSigner();
};

export const connectToMetamask = async (
  metamaskProvider,
  isMetamaskConnected
) => {
  if (window.ethereum != null) {
    if (!isMetamaskConnected) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    }

    if (window.ethereum.chainId !== 97 && window.ethereum.chainId !== "0x61") {
      await metamaskProvider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x61",
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
  } else {
    console.log("Please download metamask");
  }
};

export const addMetamaskListeners = (
  provider,
  chainChangedCallback,
  messageCallback,
  accountsChangedCallback
) => {
  provider.on("chainChanged", (chainId) => {
    chainChangedCallback(chainId);
  });
  provider.on("message", (message) => {
    messageCallback(message);
  });
  provider.on("accountsChanged", (accounts) => {
    accountsChangedCallback(accounts);
  });
};

export const weiToEth = (weiBalance) => {
  return ethers.utils.formatEther(weiBalance);
};

export const ethToWei = (ethBalance) => {
  return ethers.utils.parseEther(ethBalance);
};

export const deposit = async (contract, pid, amount) => {
  return await (await contract.deposit(pid, amount)).wait();
};

export const withdraw = async (contract, pid, amount) => {
  return await (await contract.withdraw(pid, amount)).wait();
};

export const claim = async (contract, pid) => {
  return await (await contract.withdraw(pid, 0)).wait();
};

export const approveRouter = async (web3Provider, address) => {
  const contract = new ethers.Contract(
    address,
    ERC20Abi,
    web3Provider.getSigner()
  );

  return await (
    await contract.approve(
      RouterAddress,
      "115792089237316195423570985008687907853269984665640564039457584007913129639935"
    )
  ).wait();
};

export const approveMasterChef = async (web3Provider, address) => {
  const contract = new ethers.Contract(
    address,
    ERC20Abi,
    web3Provider.getSigner()
  );

  return await (
    await contract.approve(
      MasterChefAddress,
      "115792089237316195423570985008687907853269984665640564039457584007913129639935"
    )
  ).wait();
};

export const isErc20Approved = async (web3Provider, address, ownerAddress) => {
  const contract = new ethers.Contract(
    address,
    ERC20Abi,
    web3Provider.getSigner()
  );

  const allowance = await contract.allowance(ownerAddress, "MasterAddress");

  return allowance.gt(ethers.utils.parseEther("10000000000000"));
};

export const isErc20ApprovedRouter = async (
  web3Provider,
  address,
  ownerAddress
) => {
  const contract = new ethers.Contract(
    address,
    ERC20Abi,
    web3Provider.getSigner()
  );

  const allowance = await contract.allowance(ownerAddress, RouterAddress);

  return allowance.gt(ethers.utils.parseEther("10000000000000"));
};

export const isErc20ApprovedMasterChef = async (
  web3Provider,
  address,
  ownerAddress
) => {
  const contract = new ethers.Contract(
    address,
    ERC20Abi,
    web3Provider.getSigner()
  );

  const allowance = await contract.allowance(ownerAddress, MasterChefAddress);

  return allowance.gt(ethers.utils.parseEther("10000000000000"));
};

export const getBalance = async (web3Provider, address, ownerAddress) => {
  const contract = new ethers.Contract(
    address,
    ERC20Abi,
    web3Provider.getSigner()
  );

  const balance = await contract.balanceOf(ownerAddress);
  return balance;
};

export const getERC20TotalSupply = async (web3Provider, address) => {
  const contract = new ethers.Contract(
    address,
    ERC20Abi,
    web3Provider.getSigner()
  );

  const totalSupply = await contract.totalSupply();
  return totalSupply;
};

export const getRouterContract = (web3Provider) => {
  return new ethers.Contract(
    RouterAddress,
    RouterABI,
    web3Provider.getSigner()
  );
};

export const getLibraryContract = (web3Provider) => {
  return new ethers.Contract(
    LibraryAddress,
    LibraryABI,
    web3Provider.getSigner()
  );
};

export const getMasterChefContract = (web3Provider) => {
  return new ethers.Contract(
    MasterChefAddress,
    MasterChefABI,
    web3Provider.getSigner()
  );
};

export const addLiquidity = async (
  routerContract,
  tokenA,
  tokenB,
  amountADesired,
  amountBDesired,
  amountAMin,
  amountBMin,
  to,
  deadline = "" + Math.ceil(Date.now() / 1000) + 60 * 20
) => {
  return await (
    await routerContract.addLiquidity(
      tokenA,
      tokenB,
      amountADesired,
      amountBDesired,
      amountAMin,
      amountBMin,
      to,
      deadline
    )
  ).wait();
};

export const swapExactTokensForTokens = async (
  routerContract,
  amountIn,
  amountOutMin,
  path,
  to,
  deadline = "" + Math.ceil(Date.now() / 1000) + 60 * 20
) => {
  return await (
    await routerContract.swapExactTokensForTokens(
      amountIn,
      amountOutMin,
      path,
      to,
      deadline
    )
  ).wait();
};

export const addPool = async (
  farmContract,
  allocPoint,
  tokenAddress,
  withUpdate
) => {
  return await (
    await farmContract.add(allocPoint, tokenAddress, withUpdate)
  ).wait();
};

export const setAllocPoint = async (
  farmContract,
  pid,
  allocPoint,
  withUpdate
) => {
  return await (await farmContract.set(pid, allocPoint, withUpdate)).wait();
};

export const setRewardsPerBlock = async (farmContract, rewardsPerBlock) => {
  return await (await farmContract.setSushiPerBlock(rewardsPerBlock)).wait();
};

export const getReserves = async (libararyContract, tokenA, tokenB) => {
  return await await libararyContract.getReserves(
    FactoryAddress,
    tokenA,
    tokenB
  );
};
