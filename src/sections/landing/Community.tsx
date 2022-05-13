import { FC } from "react";
import { Item3Props } from "types/interface";
import style from "views/home/home.module.css";

const Community = () => {
  return (
    <section className={style.section3}>
      <div className={style.heading}>
        <h1>MilkyWay's</h1>
        <h1>evolving community</h1>
      </div>
      <div className={style.grid3}>
        <Item3 icon={"icon1"} value="20+" desc="Wallets Supported" />
        <Item3 icon={"icon2"} value="14" desc="Chains Supported" />
        <Item3 icon={"icon3"} value="25k+" desc="Discord Members" />
        <Item3 icon={"icon4"} value="150k+" desc="Milky Holders" />
      </div>
    </section>
  );
};

const Item3: FC<Item3Props> = ({ icon, value, desc }: Item3Props) => (
  <div className={style.grid3__item}>
    <img
      src={`/icons/${icon}.svg`}
      alt={icon}
      height={icon === "icon1" ? "40px" : "55px"}
      width="55px"
      style={icon === "icon1" ? { marginBottom: "0.8rem" } : {}}
    />
    <h3>{value}</h3>
    <span>{desc}</span>
  </div>
);

export default Community;
