import React, { useState } from "react";
import "../css/Header.css";
import { FaBasketShopping } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa6";
import Badge from "@mui/material/Badge";
import { useDispatch, useSelector } from "react-redux";
import { setDrawer } from "../redux/slice/BasketSlice";

function Header() {
  const [theme, setTheme] = useState(true);
  const dispatch = useDispatch();

  const changeTehme = () => {
    const root = document.getElementById("root");

    if (theme) {
      root.style.backgroundColor = "#000";
      root.style.color = "#fff";
    } else {
      root.style.backgroundColor = "#fff";
      root.style.color = "#000";
    }
    setTheme(!theme);
  };

  const { basketproducts } = useSelector((store) => store.basket);

  return (
    <div className="space-between">
      <div className="flex-row">
        <img className="logo" src="/images/logo.webp" alt="Logo" />
      </div>
      <div className="flex-row">
        <input className="search-input" type="text" placeholder="Ara" />
        <div>
          {theme ? (
            <FaMoon className="icons" onClick={changeTehme} />
          ) : (
            <FaSun className="icons" onClick={changeTehme} />
          )}
          <Badge
            badgeContent={basketproducts.length}
            color="primary"
            style={{ marginTop: "-22px" }}
            onClick={() => dispatch(setDrawer())}
          >
            <FaBasketShopping className="icons" />
          </Badge>
        </div>
      </div>
    </div>
  );
}

export default Header;
