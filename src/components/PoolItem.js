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
  connectToMetamask,
} from "../apis/blockchain";
import { Web3Context } from "../contexts/Web3Context";
import { MasterChefAddress } from "../constants/addresses";

const PoolItem = ({
  ticker,
  name,
  apy,
  stake,
  tokenAddress,
  pid,
  backgroundColor,
}) => {
  const web3Context = useContext(Web3Context);

  const [showMore, setShowMore] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [staked, setStaked] = useState(0);
  const [pending, setPending] = useState(0);

  const [isApproved, setIsApproved] = useState(false);
  const [balance, setBalance] = useState("0");
  const [totalStaked, setTotalStaked] = useState(0);
  const [rewardsPerDay, setRewardsPerDay] = useState("0");

  const depositPreflightCheck = () => {
    if (depositAmount <= 0) {
      return false;
    }

    if (depositAmount > balance) {
      return false;
    }

    return true;
  };

  const withdrawPreflightCheck = () => {
    if (withdrawAmount <= 0) {
      return false;
    }

    if (withdrawAmount > staked) {
      return false;
    }

    return true;
  };

  const claimPreflightCheck = () => {
    if (pending <= 0) {
      return false;
    }
    return true;
  };

  const handleClick = () => {
    if (
      web3Context.currentAccountAddress &&
      (window.ethereum.chainId == "0x61" || window.ethereum.chainId == 97)
    ) {
      setShowMore(!showMore);
    } else {
      connectToMetamask(web3Context.web3.metamaskProvider);
    }
  };

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
    fetchRewardsPerDay();
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

  const fetchRewardsPerDay = async () => {
    const rewardsPerBlock =
      await web3Context.web3.masterChefContract.sushiPerBlock();
    const totalAllocPoints =
      await web3Context.web3.masterChefContract.totalAllocPoint();
    const allocPoints = (
      await web3Context.web3.masterChefContract.poolInfo(pid)
    ).allocPoint;
    const _rewardsPerDay =
      (weiToEth(rewardsPerBlock) * 28750 * allocPoints) / totalAllocPoints;
    setRewardsPerDay(_rewardsPerDay);
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
    <div
      className={styles.poolItemContainer}
      style={{ backgroundColor: backgroundColor }}
    >
      <div
        className={styles.poolItemMain}
        style={{
          borderBottomLeftRadius: showMore ? "0px" : "20px",
          borderBottomRightRadius: showMore ? "0px" : "20px",
        }}
        onClick={handleClick}
      >
        <div className={styles.titleSection}>
          <div className={styles.ticker}>
            {ticker}
            <br />
            <span className={styles.name}>{name}</span>
          </div>
        </div>

        <div className={styles.stakedSection}>
          <div className={styles.stakeContainer}>
            <div className={styles.stakeTitle}>TVL</div>
            <div className={styles.stake}>
              {parseFloat(totalStaked).toFixed(2)}
            </div>
          </div>
        </div>

        <div className={styles.rewardsSection}>
          <div className={styles.rewardsContainer}>
            <div className={styles.rewardsTitle}>Rewards</div>
            <div className={styles.rewards}>{rewardsPerDay} MWT/DAY</div>
          </div>
        </div>

        <div className={styles.apySection}>
          <div className={styles.apyContainer}>
            <div className={styles.apyTitle}>APY</div>
            <div className={styles.apy}>{apy}%</div>
          </div>
        </div>

        <div className={styles.moreSection}>
          <div className={styles.moreContainer}>
            <span className={styles.moreText}></span>
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
              placeholder="Deposit Amount"
              value={depositAmount}
              className={styles.depositInput}
              onInput={(e) => setDepositAmount(e.target.value)}
            />
            <p
              style={{
                color: "white",
                fontSize: "18px",
                float: "left",
                cursor: "pointer",
              }}
              onClick={() => setDepositAmount(balance)}
            >
              Wallet: {parseFloat(balance).toFixed(6)}
            </p>

            {isApproved ? (
              <button
                disabled={!depositPreflightCheck()}
                onClick={submitDeposit}
                className={styles.depositButton}
              >
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
              placeholder="Withdraw Amount"
              value={withdrawAmount}
              className={styles.depositInput}
              onInput={(e) => setWithdrawAmount(e.target.value)}
            />
            <p
              style={{
                color: "white",
                fontSize: "18px",
                float: "left",
                cursor: "pointer",
              }}
              onClick={() => setWithdrawAmount(staked)}
            >
              Staked: {parseFloat(staked).toFixed(6)}
            </p>
            <button
              disabled={!withdrawPreflightCheck()}
              onClick={submitWithdraw}
              className={styles.depositButton}
            >
              Withdraw
            </button>
          </div>

          <div className={styles.claimSection}>
            <p
              style={{
                color: "white",
                fontSize: "18px",
                cursor: "default",
                marginTop: "10px",
              }}
            >
              Pending MWT: {pending}
            </p>
            <button
              disabled={!claimPreflightCheck()}
              onClick={submitClaim}
              className={styles.depositButton}
            >
              Claim
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoolItem;
