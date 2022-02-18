import React, { useState, useContext } from "react";
import logo from "../resources/images/mwlogo.png";
import { Container, Navbar, Dropdown, Button } from "react-bootstrap";
import { FaEllipsisH } from "react-icons/fa";
import { Web3Context } from "../contexts/Web3Context";
import { connectToMetamask } from "../apis/blockchain";
import styles from "./HeaderApp.module.css";

const HeaderApp = () => {
  const web3Context = useContext(Web3Context);

  const truncateAddress = (address) => {
    return (
      address.substring(0, 6) + "..." + address.substring(address.length - 4)
    );
  };

  return (
    <div
      className="milkynavapp"
      style={{ alignItems: "left", marginTop: "20px" }}
    >
      <Navbar style={{ alignItems: "left" }}>
        <Container>
          <Navbar.Brand id="navbrandapp" href="/">
            <img src={logo} alt="Milkyway" style={{ alignSelf: "left" }} />
          </Navbar.Brand>
          <a href="/swap" target="_self" className={styles.navLink}>
            Swap
          </a>
          <a href="/farm" target="_self" className={styles.navLink}>
            Farm
          </a>

          {web3Context.currentAccountAddress &&
          (window.ethereum.chainId == "0x61" ||
            window.ethereum.chainId == 97) ? (
            <div className="wallet-address">
              {truncateAddress(web3Context.currentAccountAddress)}
            </div>
          ) : (
            <div
              className={styles.navbtn}
              onClick={() =>
                connectToMetamask(web3Context.web3.metamaskProvider)
              }
            >
              Connect Wallet
            </div>
          )}

          {/*
          <Dropdown className="nav-language">
            <Dropdown.Toggle variant="success" id="language-dropdown">
              English
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>English</Dropdown.Item>
              <Dropdown.Item>Spanish</Dropdown.Item>
              <Dropdown.Item>French</Dropdown.Item>
              <Dropdown.Item>Afrikaans</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button className="nav-settings">
            <FaEllipsisH />
          </Button>
           <Button className= "milkyapp-navbtn"></Button> */}
        </Container>
      </Navbar>
    </div>
  );
};

export default HeaderApp;
