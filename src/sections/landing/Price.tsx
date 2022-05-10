import { FC, useEffect, useState } from "react";
import { ItemProps } from "types/interface";
import style from "views/home/home.module.css";
import { getCurrentMilkyPrice, getTotalLiquidity, getAllPairsLength } from "utils/integrate";

const Price = () => {
  const [price, setPrice] = useState<string>('$0.0')
  const [totalValue, setTotalValue] = useState<string>('$0.0')
  const [pairsLength, setPairsLength] = useState<number>(0)
  const getPriceMilky = async() => {
    const price = await getCurrentMilkyPrice()
    setPrice(`$${price.toFixed(2)}`)
  }

  const getTotalPrice = async() => {
    const value = await getTotalLiquidity()
    setTotalValue(`$${value.toFixed(0)}`)
  }

  const getPairsLength = async() => {
    setPairsLength(await getAllPairsLength())
  }

  useEffect(() => {
    getPriceMilky()
    getTotalPrice()
    getPairsLength()
  }, [])

  return (
    <section className={style.grid}>
      <Item amount={price} desc="MilkyWay Price" />
      <Item amount={totalValue} desc="Total Liquidity" />
      <Item amount="$112.5b" desc="Total Volume" />
      <Item amount={pairsLength.toString()} desc="Total Pairs" />
    </section>
  );
};

const Item: FC<ItemProps> = ({ amount, desc }: ItemProps) => (
  <div className={style.item}>
    <h3 style={{ fontSize: "44px", fontWeight: 'bold' }}>{amount}</h3>
    <span>{desc}</span>
  </div>
);

export default Price;
