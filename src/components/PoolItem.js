import styles from "./PoolItem.module.css";
import { ReactComponent as ChevronDown } from "../assets/chevron-down.svg";
import { ReactComponent as ChevronUp } from "../assets/chevron-up.svg";
import { useState, useEffect, useContext } from "react";
import {
  ethToWei,
  weiToEth,
  deposit,
  withdraw,
  claim,
  approveMasterChef,
  isErc20ApprovedMasterChef,
  getBalance,
} from "../apis/blockchain";
import { Web3Context } from "../contexts/Web3Context";
import { MasterChefAddress } from "../constants/addresses";

const PoolItem = ({ ticker, name, apy, stake, tokenAddress, pid }) => {
  const web3Context = useContext(Web3Context);

  const [showMore, setShowMore] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [staked, setStaked] = useState(0);
  const [pending, setPending] = useState(0);

  const [isApproved, setIsApproved] = useState(false);
  const [balance, setBalance] = useState("0");
  const [totalStaked, setTotalStaked] = useState(0);

  useEffect(() => {
    if (web3Context.currentAccountAddress && web3Context.web3.web3Provider) {
      fetchInfo();
    }
  }, [web3Context]);

  const fetchInfo = () => {
    fetchApproved();
    fetchBalance();
    fetchStaked();
    fetchPending();
    fetchTotalStaked();
  };

  const fetchApproved = async () => {
    const _isApproved = await isErc20ApprovedMasterChef(
      web3Context.web3.web3Provider,
      tokenAddress,
      web3Context.currentAccountAddress
    );
    setIsApproved(_isApproved);
  };

  const fetchBalance = async () => {
    const _balance = await getBalance(
      web3Context.web3.web3Provider,
      tokenAddress,
      web3Context.currentAccountAddress
    );
    setBalance(weiToEth(_balance));
  };

  const fetchTotalStaked = async () => {
    const _totalStaked = await getBalance(
      web3Context.web3.web3Provider,
      tokenAddress,
      MasterChefAddress
    );
    setTotalStaked(weiToEth(_totalStaked));
  };

  const fetchStaked = async () => {
    const _staked = (
      await web3Context.web3.masterChefContract.userInfo(
        pid,
        web3Context.currentAccountAddress
      )
    ).amount;
    setStaked(weiToEth(_staked));
  };

  const fetchPending = async () => {
    const _pending = await web3Context.web3.masterChefContract.pendingSushi(
      pid,
      web3Context.currentAccountAddress
    );
    setPending(weiToEth(_pending));
  };

  const submitApprove = async () => {
    await approveMasterChef(web3Context.web3.web3Provider, tokenAddress);
    setIsApproved(true);
  };

  const submitDeposit = async () => {
    await deposit(
      web3Context.web3.masterChefContract,
      pid,
      ethToWei(depositAmount)
    );
    fetchInfo();
  };

  const submitWithdraw = async () => {
    await withdraw(
      web3Context.web3.masterChefContract,
      pid,
      ethToWei(withdrawAmount)
    );
  };

  const submitClaim = async () => {
    await claim(web3Context.web3.masterChefContract, pid);
  };

  return (
    <div className={styles.poolItemContainer}>
      <div
        className={styles.poolItemMain}
        style={{
          borderBottomLeftRadius: showMore ? "0px" : "20px",
          borderBottomRightRadius: showMore ? "0px" : "20px",
        }}
        onClick={() => setShowMore(!showMore)}
      >
        <div className={styles.titleSection}>
          <div className={styles.ticker}>{ticker}</div>
          <div className={styles.name}>{name}</div>
        </div>

        <div className={styles.apySection}>
          <div className={styles.apyContainer}>
            <div className={styles.apyTitle}>APY</div>
            <div className={styles.apy}>{apy}%</div>
          </div>
        </div>

        <div className={styles.stakedSection}>
          <div className={styles.stakeContainer}>
            <div className={styles.stakeTitle}>Total Staked</div>
            <div className={styles.stake}>
              {parseFloat(totalStaked).toFixed(2)}
            </div>
          </div>
        </div>

        <div className={styles.moreSection}>
          <div className={styles.moreContainer}>
            <span className={styles.moreText}>
              {showMore ? "Hide" : "More"}
            </span>
            {showMore ? <ChevronUp /> : <ChevronDown />}
          </div>
        </div>
      </div>

      {showMore && (
        <div className={styles.poolItemExtra}>
          <div className={styles.depositSection}>
            <div className={styles.depositTitle}>Deposit</div>

            <input
              type="number"
              placeholder="deposit amount"
              value={depositAmount}
              className={styles.depositInput}
              onInput={(e) => setDepositAmount(e.target.value)}
            />
            <p
              style={{
                color: "black",
                fontSize: "18px",
                float: "left",
                cursor: "pointer",
              }}
              onClick={() => setDepositAmount(balance)}
            >
              Wallet: {parseFloat(balance).toFixed(6)}
            </p>

            {isApproved ? (
              <button onClick={submitDeposit} className={styles.depositButton}>
                Deposit
              </button>
            ) : (
              <button onClick={submitApprove} className={styles.depositButton}>
                Approve
              </button>
            )}
          </div>

          <div className={styles.withdrawSection}>
            <div className={styles.depositTitle}>Withdraw</div>
            <input
              type="number"
              placeholder="withdraw amount"
              value={withdrawAmount}
              className={styles.depositInput}
              onInput={(e) => setWithdrawAmount(e.target.value)}
            />
            <p
              style={{
                color: "black",
                fontSize: "18px",
                float: "left",
                cursor: "pointer",
              }}
              onClick={() => setWithdrawAmount(staked)}
            >
              Staked: {parseFloat(staked).toFixed(6)}
            </p>
            <button
              className={styles.depositButton}
              style={{ backgroundColor: "#00CED1" }}
            >
              Withdraw
            </button>
          </div>

          <div className={styles.claimSection}>
            <p
              style={{
                color: "black",
                fontSize: "18px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Pending MWT: {pending}
            </p>
            <button onClick={submitClaim} className={styles.claimButton}>
              Claim
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoolItem;
