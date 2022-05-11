import { FC } from "react";
import { Item2Props } from "types/interface";
import style from "views/home/home.module.css";
import smallLogo from "assets/images/small_logo.png"; 

const Exchange = () => {
  return (
    <section className={style.section2}>
      <div className={style.heading}>
        <h1>Exchange Properties</h1>
      </div>

      <div style={{ position: "relative", height: "50rem" }} className={style.itemsWrapper}>
        <Item2
          title="Title 1"
          desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium cupiditate assumenda cum,"
          onClick={() => null}
          styles={{ position: "absolute", top: "14rem", left: "-20rem" }}
        />
        <div
          className={style.grid2__item}
          style={{
            background: "transparent",
            position: "absolute",
            top: "26rem",
            left: "-7.5rem",
          }}
        >
          <img src={smallLogo} alt="smallLogo" />
        </div>
        <Item2
          title="Title 2"
          desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium cupiditate assumenda cum,"
          onClick={() => null}
          styles={{ position: "absolute", top: "7rem", right: "-18rem" }}
        />
        <Item2
          title="Title 3"
          desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium cupiditate assumenda cum,"
          onClick={() => null}
          styles={{ position: "absolute", bottom: "3rem", left: "-24rem" }}
        />
        <Item2
          title="Title 4"
          desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium cupiditate assumenda cum,"
          onClick={() => null}
          styles={{ position: "absolute", bottom: "10rem", right: "-26rem" }}
        />
        <Item2
          title="Title 5"
          desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium cupiditate assumenda cum,"
          onClick={() => null}
          styles={{
            position: "absolute",
            bottom: "-7rem",
            right: "-8rem",
          }}
        />
      </div>
    </section>
  );
};

const Item2: FC<Item2Props> = ({
  title,
  desc,
  onClick,
  styles,
}: Item2Props) => (
  <div className={style.grid2__item} style={styles ? styles : {}}>
    <h3>{title}</h3>
    <span>{desc}</span>
    <button onClick={onClick} className={style.addBtn}>
      Enter
    </button>
  </div>
);

export default Exchange;
