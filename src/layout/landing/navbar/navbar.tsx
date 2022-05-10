/* eslint-disable jsx-a11y/anchor-is-valid */
import style from "./navbar.module.css";

//logo
import logo from "assets/images/logo.png";

const Navbar = () => (
  <div className={style.nav}>
    <div>
      <img src={logo} alt="logo" />
    </div>
    <div className={style.nav__menu}>
      <ul>
        <li>
          <a href="#">Analytics</a>
        </li>
        <li>
          <a href="/swap">Milky App</a>
        </li>
      </ul>
    </div>
  </div>
);

export default Navbar;
