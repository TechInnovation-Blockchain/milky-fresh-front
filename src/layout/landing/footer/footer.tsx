import { FC } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import logo from "assets/images/logo.png";
import style from "./footer.module.css";

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme: any) =>
          theme.palette.mode === "dark" ? "#101010" : "grey.100",
        color: (theme: any) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "1px solid",
        borderColor: (theme: any) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

const Footer = () => {
  return (
    <div style={{ width: "100%", borderTop: "1px solid silver", fontFamily: 'Open Sans' }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          m: 1,
          borderRadius: 1,
          flexWrap: 'wrap',
        }}
      >
        <Item
          style={{
            width: "40%",
            background: "transparent",
            border: "none",
            color: "#fff",
          }}
        >
          <img src={logo} alt="logo" style={{marginBottom: '1rem'}} />

          <p>
            <small style={{fontWeight: 'lighter', fontSize: '12px'}}>
              Lorem ipsum dolor si repudiandae molestiae khjdfhueafjsdalk
              quaeratiis illo omnis, nisi laborum!
            </small>
          </p>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              mt: 2,
            }}
          >
            <img
              src="/icons/tw.svg"
              alt="tw"
              style={{ marginRight: "0.5rem" }}
              className={style.btn}
            />
            <img
              src="/icons/tg.svg"
              alt="tg"
              style={{ marginRight: "0.5rem" }}
              className={style.btn}
            />
            <img src="/icons/m.svg" alt="m" className={style.btn} />
          </Box>
        </Item>

        <FooterItem title="PRODUCTS" data={items1} />
        <FooterItem title="SUPPORT" data={items2} />
        <FooterItem title="SUPPORT" data={items3} />
      </Box>
    </div>
  );
};

const items1 = [
  {
    title: "MILKYWAY exchange AMM",
    url: "",
  },
  {
    title: "WSG gaming",
    url: "",
  },
  {
    title: "Third stuff",
    url: "",
  },
  {
    title: "API",
    url: "",
  },
];

const items2 = [
  {
    title: "Tutorials",
    url: "",
  },
  {
    title: "Documentation",
    url: "",
  },
  {
    title: "Discord",
    url: "",
  },
  {
    title: "Forum",
    url: "",
  },
];

const items3 = [
  {
    title: "Protocol",
    url: "",
  },
  {
    title: "Create a Pair",
    url: "",
  },
  {
    title: "Register for WSG Gaming",
    url: "",
  },
];

interface FooterItemProps {
  title: string;
  data: any;
}

const FooterItem: FC<FooterItemProps> = ({ title, data }: FooterItemProps) => (
  <Item style={{ background: "transparent", border: "none" }}>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        borderRadius: 1,
      }}
    >
      <p
        style={{
          fontSize: "12px",
          fontWeight: "bold",
          color: "#fff",
          marginBottom: "10px",
        }}
      >
        {title}
      </p>
      {data?.map((item: any, index: number) => (
        <Item
          key={index}
          style={{
            background: "transparent",
            border: "none",
            color: "#e3e3e3",
            padding: "0",
            margin: "0",
            marginBottom: "8px",
            fontSize: "11px",
            fontWeight: "normal",
          }}
        >
          {item.title}
        </Item>
      ))}
    </Box>
  </Item>
);

export default Footer;
