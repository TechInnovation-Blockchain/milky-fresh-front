import { NetworkId } from "./types";

export const BlockNativeAPIKey = "e48f633b-224c-4f5a-b145-55b63300bee2";
export const BlockNetworkId = NetworkId.BscTestnet

export const NetworkRPC = {
  [NetworkId.BscTestnet]: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  [NetworkId.BscMainnet]: "https://bsc-dataseed.binance.org/",
  [NetworkId.Rinkeby]:
    "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  [NetworkId.Mainnet]:
    "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
};

// export const OpenSeasCollectionURL = {
//   [NetworkId.BscTestnet]: "https://testnets.opensea.io/assets/letscollect",
//   [NetworkId.Rinkeby]: "https://testnets.opensea.io/assets/letscollect",
//   [NetworkId.Mainnet]:
//     "https://opensea.io/assets/letscollect",
// };
