import React, { useEffect, useState, useContext } from "react";
import styles from "../App.css";
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
    setToAmount(value);
    setFromAmount(value * (1 / price));
  };

  const handleFromAmountChange = (value) => {
    setFromAmount(value);
    setToAmount(value * price);
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

  const submitSwap = async () => {
    await swapExactTokensForTokens(
      web3Context.web3.routerContract,
      ethToWei(fromAmount),
      ethToWei((toAmount * 0.98).toString()),
      [fromToken.address, toToken.address],
      web3Context.currentAccountAddress
    );

    fetchBalances();
  };

  const liquidityPreflightCheck = () => {
    if (fromAmount <= 0 || toAmount <= fromAmount) {
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

  const submitLiquidity = async () => {
    await addLiquidity(
      web3Context.web3.routerContract,
      fromToken.address,
      toToken.address,
      ethToWei(fromAmount),
      ethToWei(toAmount),
      ethToWei((fromAmount * 0.99).toString()),
      ethToWei((toAmount * 0.99).toString()),
      web3Context.currentAccountAddress
    );

    fetchBalances();
  };

  const approveFrom = async () => {
    await approveRouter(web3Context.web3.web3Provider, fromToken.address);
    setIsFromApproved(true);
  };

  const approveTo = async () => {
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
    setPrice(reserves[1] / reserves[0]);
    setToAmount((fromAmount * reserves[1]) / reserves[0]);
  };

  return (
    <div className="trader-div">
      <Form>
        <Button
          class="swap trade-button  selected-btn"
          onClick={() => setAction("swap")}
        >
          Swap
        </Button>
        <Button class="trade-button" onClick={() => setAction("add")}>
          Liquidity
        </Button>
        <Button class="trade-button trade-settings">
          <HiOutlineCog style={{ fontSize: "25px" }} />
        </Button>

        <div className="trade-from-div">
          <h5>{action === "swap" ? "Swap from:" : ""}</h5>

          <DropdownButton title={fromToken.ticker} onSelect={handleFromSelect}>
            <Dropdown.Item eventKey="mwt">MWT</Dropdown.Item>
            <Dropdown.Item eventKey="bnb">BNB</Dropdown.Item>
          </DropdownButton>

          <Form.Group>
            <p
              style={{ fontSize: "24px" }}
              onClick={() => handleFromAmountChange(fromBal)}
            >
              Max: {parseFloat(fromBal).toFixed(6)}
            </p>
            <Form.Control
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
              type="number"
              placeholder="0.0"
            />
          </Form.Group>
        </div>
        <div className="trade-to-div">
          <h5>{action === "swap" ? "Swap to:" : ""}</h5>

          <DropdownButton title={toToken.ticker} onSelect={handleToSelect}>
            <Dropdown.Item eventKey="mwt">MWT</Dropdown.Item>
            <Dropdown.Item eventKey="bnb">BNB</Dropdown.Item>
          </DropdownButton>
          <Form.Group>
            <p
              style={{ fontSize: "24px" }}
              onClick={() => handleToAmountChange(toBal)}
            >
              Max: {parseFloat(toBal).toFixed(6)}
            </p>

            <Form.Control
              value={toAmount}
              onChange={(e) => handleToAmountChange(e.target.value)}
              type="number"
              placeholder="0.0"
            />
          </Form.Group>
        </div>

        <p style={{ fontSize: "18px", marginTop: "10px" }}>
          {price &&
            price.toFixed(6) +
              " " +
              toToken.ticker +
              " per " +
              fromToken.ticker}
        </p>

        {web3Context.currentAccountAddress &&
        (window.ethereum.chainId == "0x61" || window.ethereum.chainId == 97) ? (
          action === "swap" ? (
            isfromApproved ? (
              <Button
                className="trade-confirm-btn"
                disabled={!swapPreflightCheck()}
                onClick={submitSwap}
              >
                Swap
              </Button>
            ) : (
              <Button
                className="trade-confirm-btn"
                disabled={!swapPreflightCheck()}
                onClick={approveFrom}
              >
                Approve
              </Button>
            )
          ) : (
            <>
              {!isfromApproved && (
                <Button className="trade-confirm-btn" onClick={approveFrom}>
                  Approve {fromToken.ticker}
                </Button>
              )}

              {!isToApproved && (
                <Button className="trade-confirm-btn" onClick={approveTo}>
                  Approve {toToken.ticker}
                </Button>
              )}

              {isfromApproved && isToApproved && (
                <Button className="trade-confirm-btn" onClick={submitLiquidity}>
                  Add Liquidity
                </Button>
              )}
            </>
          )
        ) : (
          <Button className="trade-connect-btn">Connect Wallet</Button>
        )}
      </Form>
    </div>
  );
};

export default Trader;
