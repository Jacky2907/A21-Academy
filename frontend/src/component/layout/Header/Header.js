import React from "react";
import { ReactNavbar } from "overlay-navbar";
import {MdAccountCircle } from "react-icons/md";
import {MdSearch } from "react-icons/md";
import {MdAddShoppingCart } from "react-icons/md";
import logo from "../../../images/Logo_cxwwfe.png";

const options = {
  burgerColorHover: "#eb4034",
  logo: "https://res.cloudinary.com/dwcrcaa7u/image/upload/v1694964900/BZZWorld%20Shop/A21img-removebg-preview_sg3ra6.png",
  logoWidth: "-70vmax",
  navColor1: "#FFD700",
  logoHoverSize: "0vmax",
  logoHoverColor: "#FFD700",
  logoPadding:"1vmax",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.7vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "center",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "3vmax",
  profileIcon:true,
  profileIconUrl: "/login",
  ProfileIconElement: MdAccountCircle,
  profileIconColor: "rgba(35, 35, 35,0.8)",
  searchIcon:true,
  searchIconColor: "rgba(35, 35, 35,0.8)",
  SearchIconElement:MdSearch,
  cartIcon:true,
  cartIconColor: "rgba(35, 35, 35,0.8)",
  CartIconElement:MdAddShoppingCart,
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
};

const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;
