import React from "react";
import styled from "styled-components";
import tv from "../assets/tv.png";

const Bar = styled.nav`
  position: absolute;
  display: flex;
  height: 80px;
  width: 100vw;
  background-color: #696969;
  top: 0;
`;

const Logo = styled.img`
  display: flex;
  justify-content: center;
  position: relative;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  top: 15px;
  left: 45px;
`;

const Text = styled.p`
  position: absolute;
  font-family: "Pacifico", cursive;
  color: red;
  line-height: 1em;
  margin: 16px;
  left: 38px;
  font-size: 24px;
  font-weight: bold;
  z-index: 1;
`;

const Navbar = () => {
  return (
    <Bar>
      <Logo src={tv}></Logo>
      <Text>
        Watch <br /> With Me
      </Text>
    </Bar>
  );
};

export default Navbar;
