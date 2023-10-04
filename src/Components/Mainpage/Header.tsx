import React from 'react';
import styled, {createGlobalStyle} from "styled-components";
import { Outlet } from "react-router";
import SuitCase from '../../img/suitcases.png'

export const GlobalStyle = createGlobalStyle`
    @font-face {
      font-family: 'KBO-Dia-Gothic_bold';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/KBO-Dia-Gothic_bold.woff') format('woff');
      font-weight: 700;
      font-style: normal;
  }
`

const Header_box = styled.div`
  color: #ea5028;
  padding-top: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid #c1c1c1;
  background-color: white;
`;

const Logo_container = styled.div`
  display: flex;
  width: 300px;
  margin-left: auto;
  margin-right: auto;
  font-size: 50px;
  font-weight: 900;
`

const Logo_icon = styled.img`
  width: 45px;
  height: 45px;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 10px;
`

const Logo_text = styled.text`
  font-family: 'KBO-Dia-Gothic_bold'
`


function Header() {
  return (
    <div>
      <GlobalStyle/>
      <Header_box>
        <Logo_container>
          <Logo_icon src={SuitCase}></Logo_icon>
          <Logo_text>VOYAGE</Logo_text>
        </Logo_container>
      </Header_box>
      <Outlet />
    </div>
  );
}

export default Header;
