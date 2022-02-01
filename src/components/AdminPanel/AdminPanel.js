import { useState, useContext } from "react";
import { Web3Context } from "../../contexts/Web3Context";
import {
  setAllocPoint,
  setRewardsPerBlock,
  addPool,
  ethToWei,
} from "../../apis/blockchain";

const AdminPanel = () => {
  const web3Context = useContext(Web3Context);

  const [rewards, setRewards] = useState(0);
  const [pid, setPid] = useState(0);
  const [allocPoint1, setAllocPoint1] = useState(0);
  const [allocPoint2, setAllocPoint2] = useState(0);
  const [tokenAddress, setTokenAddress] = useState("");

  if (
    web3Context.currentAccountAddress &&
    web3Context.currentAccountAddress.toLowerCase() !==
      "0xb3d13e9fedab82ff63bbbebda1dfa80bb92fb150"
  ) {
    window.open("/", "_self");
  }

  return (
    <>
      Set MWT Per Block
      <input
        type="number"
        onChange={(e) => setRewards(e.target.value)}
        value={rewards}
      ></input>
      <button
        onClick={() => {
          setRewardsPerBlock(
            web3Context.web3.masterChefContract,
            ethToWei(rewards)
          );
        }}
      >
        Submit
      </button>
      <br />
      Set Pool Allocation Points
      <p>Pool ID:</p>
      <input
        type="number"
        onChange={(e) => setPid(e.target.value)}
        value={pid}
      ></input>
      <p>Allocation points:</p>
      <input
        type="number"
        onChange={(e) => setAllocPoint1(e.target.value)}
        value={allocPoint1}
      ></input>
      <button
        onClick={() => {
          setAllocPoint(web3Context.web3.masterChefContract, pid, allocPoint1);
        }}
      >
        Submit
      </button>
      <br />
      Add Pool
      <p>Allocation points:</p>
      <input
        type="number"
        onChange={(e) => setAllocPoint2(e.target.value)}
        value={allocPoint2}
      ></input>
      <p>Token Address</p>
      <input
        type="text"
        onChange={(e) => setTokenAddress(e.target.value)}
        value={tokenAddress}
      ></input>
      <button
        onClick={() => {
          addPool(
            web3Context.web3.masterChefContract,
            allocPoint2,
            tokenAddress,
            false
          );
        }}
      >
        Submit
      </button>
    </>
  );
};

export default AdminPanel;
