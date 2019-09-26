import React from "react";
import styled from "styled-components";
import tv from "../assets/tv.png";

const Bar = styled.nav`
  position: absolute;
  display: flex;
  height: 80px;
  width: 100vw;
  background-color: #5c7cfa;
  top: 0;
`;

const LogoContainer = styled.div`
  position: relative;
  width: 100px;
  &:hover {
    cursor: pointer;
  }
`;

const Logo = styled.img`
  display: flex;
  justify-content: center;
  position: absolute;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  top: 15px;
  left: 45px;
`;

const Text = styled.p`
  position: absolute;
  font-family: "Amatic SC", cursive;
  color: #ffffff;
  width: 60px;
  line-height: 1em;
  margin: 16px;
  left: 45px;
  font-size: 24px;
  font-weight: bold;
  z-index: 1;
`;

const Navbar = () => {
  return (
    <Bar>
      <LogoContainer onClick={() => (window.location.href = "/")}>
        <Logo src={tv}></Logo>
        <Text>
          Watch <br /> With Me
        </Text>
      </LogoContainer>
    </Bar>
  );
};

export default Navbar;
