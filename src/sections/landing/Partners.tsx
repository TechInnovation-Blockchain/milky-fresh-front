import { FC } from "react";
import { Item4Props } from "types/interface";
import style from "views/home/home.module.css";

const Partners = () => {
  return (
    <section className={style.section4} style={{ marginTop: "1rem" }}>
      <div className={style.heading}>
        <h1>Partners helping us</h1>
        <h1>travel faster trough galaxy</h1>
      </div>
      <div className={style.grid4}>
        <Item4 title="LOGO" desc="Partner name 1" />
        <Item4 title="LOGO" desc="Partner name 2" />
        <Item4 title="LOGO" desc="Partner name 3" />
      </div>
    </section>
  );
};

const Item4: FC<Item4Props> = ({ title, desc }: Item4Props) => (
  <div>
    <div
      className={style.grid4__item}
      style={{ textAlign: "center", color: "#fff", background: "transparent" }}
    >
      <div
        style={{
          border: "5px solid rgb(179, 26, 179)",
          height: "100px",
          width: "100px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: '10px',
          color: "#fff",
        }}
      >
        <h2>{title}</h2>
      </div>
      <p style={{fontWeight: 'bold'}}>{desc}</p>
    </div>
  </div>
);

export default Partners;
