import { FC } from "react";
import { Item4Props } from "types/interface";
import style from "views/home/home.module.css";
import partner_wsg from "assets/images/partners/wsg_white.png";

const Partners = () => {
  return (
    <section className={style.section4} style={{ marginTop: "1rem" }}>
      <div className={style.heading}>
        <h1>Partners</h1>
      </div>
      <div className={style.grid4}>
        <Item4 image={partner_wsg} desc="WSG" />
        <Item4 image={partner_wsg} desc="SF" />
        <Item4 image={partner_wsg} desc="UNO" />
      </div>
    </section>
  );
};

const Item4: FC<Item4Props> = ({ image, desc }: Item4Props) => (
  <div>
    <div
      className={style.grid4__item}
      style={{ textAlign: "center", color: "#fff", background: "transparent" }}
    >
      <div
        style={{
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
        <img src={image}/>
      </div>
      <p style={{ fontWeight: 'bold', fontSize: '21px', marginTop: '17px' }}>{desc}</p>
    </div>
  </div>
);

export default Partners;
