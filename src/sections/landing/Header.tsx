import bigLogo from "assets/images/logo_big.png";
import style from "views/home/home.module.css";

const Header = () => {
  return (
    <>
      <div className={style.article}>
        <img src={bigLogo} alt="bigLogo" />
        <h4 style={{ margin: "1rem 0" }}>
          <span>EXCHANGE</span>
        </h4>
      </div>

      <div className={style.article}>
        <p className={style.paragraph}>
        MilkyWay Exchange is a new one of a kind decentralised trading platform offering a unique vested farming reward system that allows a high APR on staking and ensures the sustainability of the economy. The platform is focused on bringing real value to the community and turning into a true DAO.
        </p>
        <div className={style.btn__groups}>
          <a href="/swap"><button className={style.btn}>Enter App</button></a>
          <button className={style.btn}>Learn More</button>
        </div>
      </div>
    </>
  );
};

export default Header;
