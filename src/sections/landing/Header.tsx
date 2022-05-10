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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          cupiditate assumenda explicabo cum, ea provident porro eum delectus
          temporibus natus necessitatibus error soluta hic culpa nihil ullam.
          Facere, perspiciatis tempora.
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
