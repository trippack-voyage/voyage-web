import React from 'react';
import styled, {createGlobalStyle} from "styled-components";
import { Outlet } from "react-router";
import SuitCase from '../../img/suitcases.png'
import {HiMenu} from 'react-icons/hi';
import { myModalState } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import My_modal from './My_modal';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'TAEBAEKfont';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
`


const Header_box = styled.div`
  display: flex;
  color: #ea5028;
  padding-top: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid #c1c1c1;
  background-color: ${({ theme }) => theme.headerBackground};
  justify-content: center;
  z-index: 10;

  @media screen and (max-width: 500px) {
    padding-top: 20px;
    padding-bottom: 20px;
  }
`;

//로고 컨테이너
const Logo_container = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  font-size: 40px;
  font-weight: 900;

  @media screen and (max-width: 500px) {
    font-size: 30px;
    margin-top: 10px;
  }
`

const Logo_icon = styled.img`
  width: 45px;
  height: 45px;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 10px;

  @media screen and (max-width: 500px) {
    width: 35px;
    height: 35px;
    margin-right: 5px;
    margin-bottom: 7px;
  }
`

const Logo_text = styled.text`
  font-family: 'TAEBAEKfont';
  margin-top: 5px;
`

//마이페이지 버튼 컨테이너
const Mypage_btnBox = styled.div`
  margin: auto 30px auto -90px; 
  display: flex;

  @media screen and (max-width: 500px) {
    margin: 5px 10px auto -35px; 
  }
`

//마이페이지 아이콘
const Mypage_icon_box = styled.div`
  margin: 10px 0px;

  @media screen and (max-width: 500px){
    margin-top: 7px;
  }
`

function Header() {

  const [isOpen, setIsOpen] = useRecoilState(myModalState);

  const openModalHandler = () => {

    if(isOpen === false)
      setIsOpen(true);
    else
      setIsOpen(false);
    console.log(isOpen);
  };
  
  return (
    <div>
      <GlobalStyle/>
      <Header_box>
        <Logo_container>
          <Logo_icon src={SuitCase}></Logo_icon>
          <Logo_text>VOYAGE</Logo_text>
        </Logo_container>
        <Mypage_btnBox>
          <Mypage_icon_box onClick={openModalHandler}><HiMenu size="30" color="gray"/></Mypage_icon_box>
        </Mypage_btnBox>
      </Header_box>
      {isOpen ? <My_modal></My_modal> : null}
      <Outlet />
    </div>
  );
}

export default Header;
