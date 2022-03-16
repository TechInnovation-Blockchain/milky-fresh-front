import React, { useEffect, useState, useContext } from "react";
import { Button, Dropdown, Form, DropdownButton } from "react-bootstrap";
import { HiOutlineCog } from "react-icons/hi";
import { Web3Context } from "../contexts/Web3Context";
import {
  connectToMetamask,
  approveRouter,
  getBalance,
  ethToWei,
  weiToEth,
  isErc20ApprovedRouter,
  swapExactTokensForTokens,
  addLiquidity,
  getReserves,
} from "../apis/blockchain";
import { MilkyWayTokenAddress, WBNBAddress } from "../constants/addresses";
import styles from "./Trader.module.css";

const Trader = () => {
  const web3Context = useContext(Web3Context);
  const [action, setAction] = useState("swap");

  const [tokensInfo, setTokensInfo] = useState({
    mwt: {
      ticker: "MWT",
      name: "MilkyWay Token",
      address: MilkyWayTokenAddress,
    },
    bnb: {
      ticker: "BNB",
      name: "BNB",
      address: WBNBAddress,
    },
  });
  const [fromToken, setFromToken] = useState({
    ticker: "MWT",
    name: "MilkyWay Token",
    address: MilkyWayTokenAddress,
  });

  const [toToken, setToToken] = useState({
    ticker: "BNB",
    name: "BNB",
    address: WBNBAddress,
  });

  const [price, setPrice] = useState(0);

  const [fromAmount, setFromAmount] = useState("0");
  const [toAmount, setToAmount] = useState("0");

  const [fromBal, setFromBal] = useState("0");
  const [toBal, setToBal] = useState("0");

  const [isfromApproved, setIsFromApproved] = useState(false);
  const [isToApproved, setIsToApproved] = useState(false);

  const handleToAmountChange = (value) => {
    if (isNaN(value)) {
      return;
    }
    setToAmount(value);
    if (price > 0) {
      setFromAmount(value * (1 / price));
    }
  };

  const handleFromAmountChange = (value) => {
    if (isNaN(value)) {
      return;
    }
    setFromAmount(value);
    if (price > 0) {
      setToAmount(value * price);
    }
  };

  const handleFromSelect = (e) => {
    const token = tokensInfo[e];
    setPrice(0);
    setFromToken(token);
  };

  const handleToSelect = (e) => {
    const token = tokensInfo[e];
    setPrice(0);
    setToToken(token);
  };

  const swapPreflightCheck = () => {
    if (fromAmount <= 0 || toAmount <= 0) {
      return false;
    }

    if (fromAmount > fromBal) {
      return false;
    }

    if (fromToken === toToken) {
      return false;
    }

    return true;
  };

  const submitSwap = async (e) => {
    e.preventDefault();

    await swapExactTokensForTokens(
      web3Context.web3.routerContract,
      ethToWei(fromAmount.toString()),
      ethToWei((toAmount * 0.95).toString()),
      [fromToken.address, toToken.address],
      web3Context.currentAccountAddress
    );

    fetchBalances();
  };

  const liquidityPreflightCheck = () => {
    if (fromAmount <= 0 || toAmount <= 0) {
      return false;
    }
    if (fromAmount > fromBal || toAmount > toBal) {
      return false;
    }
    if (fromToken === toToken) {
      return false;
    }
    return true;
  };

  const submitLiquidity = async (e) => {
    e.preventDefault();

    await addLiquidity(
      web3Context.web3.routerContract,
      fromToken.address,
      toToken.address,
      ethToWei(fromAmount.toString()),
      ethToWei(toAmount.toString()),
      ethToWei((fromAmount * 0.99).toString()),
      ethToWei((toAmount * 0.99).toString()),
      web3Context.currentAccountAddress
    );

    fetchBalances();
  };

  const approveFrom = async (e) => {
    e.preventDefault();
    await approveRouter(web3Context.web3.web3Provider, fromToken.address);
    setIsFromApproved(true);
  };

  const approveTo = async (e) => {
    e.preventDefault();

    await approveRouter(web3Context.web3.web3Provider, toToken.address);
    setIsToApproved(true);
  };

  useEffect(() => {
    if (web3Context.currentAccountAddress && web3Context.web3.web3Provider) {
      fetchBalances();
      fetchApproved();
      fetchPrice();
    }
  }, [web3Context, toToken, fromToken]);

  const fetchBalances = async () => {
    const _fromBal = await getBalance(
      web3Context.web3.web3Provider,
      fromToken.address,
      web3Context.currentAccountAddress
    );
    setFromBal(weiToEth(_fromBal));

    const _toBal = await getBalance(
      web3Context.web3.web3Provider,
      toToken.address,
      web3Context.currentAccountAddress
    );
    setToBal(weiToEth(_toBal));
  };

  const fetchApproved = async () => {
    const _isFromApproved = await isErc20ApprovedRouter(
      web3Context.web3.web3Provider,
      fromToken.address,
      web3Context.currentAccountAddress
    );
    setIsFromApproved(_isFromApproved);

    const _isToApproved = await isErc20ApprovedRouter(
      web3Context.web3.web3Provider,
      toToken.address,
      web3Context.currentAccountAddress
    );
    setIsToApproved(_isToApproved);
  };

  const fetchPrice = async () => {
    const reserves = await getReserves(
      web3Context.web3.libararyContract,
      fromToken.address,
      toToken.address
    );
    if (reserves[0] <= 0) {
      return;
    }
    setPrice(reserves[1] / reserves[0]);
    setToAmount((fromAmount * reserves[1]) / reserves[0]);
  };

  return (
    <div
      className="trader-div"
      style={{
        fontFamily: "DM Sans",
        minWidth: "700px",
      }}
    >
      <Form>
        <div
          style={{
            marginLeft: "25px",
            backgroundColor: action === "swap" ? "#dd38f2" : "",
          }}
          className={styles.tab}
          onClick={() => setAction("swap")}
        >
          Swap
        </div>
        <div
          style={{ backgroundColor: action === "add" ? "#dd38f2" : "" }}
          className={styles.tab}
          onClick={() => setAction("add")}
        >
          Liquidity
        </div>
        <div id={styles.settingsButton}>
          <HiOutlineCog style={{ fontSize: "30px", cursor: "pointer" }} />
        </div>

        <div
          className="trade-from-div"
          style={{ minHeight: "120px", padding: "15px 0" }}
        >
          <div className={styles.left}>
            <h5 className={styles.swapText}>
              {action === "swap" ? "Swap from:" : ""}
            </h5>

            <DropdownButton
              className={styles.selectButton}
              title={fromToken.ticker}
              onSelect={handleFromSelect}
            >
              <Dropdown.Item eventKey="mwt">MWT</Dropdown.Item>
              <Dropdown.Item eventKey="bnb">BNB</Dropdown.Item>
            </DropdownButton>
          </div>

          <Form.Group className={styles.right}>
            <h5 className={styles.swapText} style={{ color: "transparent" }}>
              {action === "swap" ? "Swap from:" : ""}
            </h5>

            <Form.Control
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
              type="text"
              placeholder="0.0"
              className={styles.amountInput}
            />
            <p
              className={styles.maxText}
              onClick={() => handleFromAmountChange(fromBal)}
            >
              Max: {parseFloat(fromBal).toFixed(6)}
            </p>
          </Form.Group>
        </div>
        <div
          className="trade-to-div"
          style={{ minHeight: "120px", padding: "15px 0" }}
        >
          <div className={styles.left}>
            <h5 className={styles.swapText}>
              {action === "swap" ? "Swap to:" : ""}
            </h5>

            <DropdownButton
              className={styles.selectButton}
              title={toToken.ticker}
              onSelect={handleToSelect}
            >
              <Dropdown.Item eventKey="mwt">MWT</Dropdown.Item>
              <Dropdown.Item eventKey="bnb">BNB</Dropdown.Item>
            </DropdownButton>
          </div>

          <Form.Group className={styles.right}>
            <h5 className={styles.swapText} style={{ color: "transparent" }}>
              {action === "swap" ? "Swap from:" : ""}
            </h5>

            <Form.Control
              value={toAmount}
              className={styles.amountInput}
              onChange={(e) => handleToAmountChange(e.target.value)}
              type="text"
              placeholder="0.0"
            />

            <p
              className={styles.maxText}
              onClick={() => handleToAmountChange(toBal)}
            >
              Max: {parseFloat(toBal).toFixed(6)}
            </p>
          </Form.Group>
        </div>

        {fromToken.ticker !== toToken.ticker && price && price > 0 ? (
          <p style={{ fontSize: "18px", marginTop: "10px" }}>
            {price.toFixed(6) +
              " " +
              toToken.ticker +
              " per " +
              fromToken.ticker}
          </p>
        ) : null}

        {web3Context.currentAccountAddress &&
        (window.ethereum.chainId == "0x61" || window.ethereum.chainId == 97) ? (
          action === "swap" ? (
            isfromApproved ? (
              <button
                className={styles.confirmButton}
                disabled={!swapPreflightCheck()}
                onClick={submitSwap}
              >
                Swap
              </button>
            ) : (
              <button
                className={styles.confirmButton}
                disabled={!swapPreflightCheck()}
                onClick={approveFrom}
              >
                Approve
              </button>
            )
          ) : (
            <>
              {!isfromApproved && (
                <button className={styles.confirmButton} onClick={approveFrom}>
                  Approve {fromToken.ticker}
                </button>
              )}

              {!isToApproved && (
                <button className={styles.confirmButton} onClick={approveTo}>
                  Approve {toToken.ticker}
                </button>
              )}

              {isfromApproved && isToApproved && (
                <button
                  className={styles.confirmButton}
                  disabled={!liquidityPreflightCheck()}
                  onClick={submitLiquidity}
                >
                  Add Liquidity
                </button>
              )}
            </>
          )
        ) : (
          <button
            onClick={() => connectToMetamask(web3Context.web3.metamaskProvider)}
            className="trade-connect-btn"
          >
            Connect Wallet
          </button>
        )}
      </Form>
    </div>
  );
};

export default Trader;
