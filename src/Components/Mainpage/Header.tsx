import React from 'react';
import styled, {createGlobalStyle} from "styled-components";
import { Outlet } from "react-router";
import SuitCase from '../../img/suitcases.png'
import {FiChevronDown} from 'react-icons/fi';
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
    margin: 5px 10px auto -80px; 
  }
`
//마이페이지 버튼
const Mypage_btn = styled.button`
  background-color: ${({ theme }) => theme.headerBackground};
  border: none;
  font-size: 25px;
  color: gray;

  @media screen and (max-width: 500px) {
    font-size: 20px;
  }
`
//마이페이지 화살표
const Mypage_icon_box = styled.div`
  margin: 10px 0px;

  @media screen and (max-width: 500px){
    margin-left: -15px;
    margin-top: 12px;
  }
`
/*
//마이페이지 박스 컨테이너
export const ModalContainer = styled.div`
  display: flex;
  flex-flow: row wrep;
  justify-content: center;
  align-items: center;
  z-index: 50;
`;

export const ModalView = styled.div.attrs(props => ({
  role: 'dialog'
}))`
  text-align: center;
  text-decoration: none;
  padding: 30px 90px;
  background-color: white;
  border-radius: 30px;
  color: #f18851;
  border: 1px solid black;
  width: 400px;
  height: 550px;
`;*/

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
          <Mypage_btn onClick={openModalHandler}>MY</Mypage_btn>
          <Mypage_icon_box><FiChevronDown size="25" color="gray"/></Mypage_icon_box>
        </Mypage_btnBox>
      </Header_box>
      {isOpen ? <My_modal></My_modal> : null}
      <Outlet />
    </div>
  );
}

export default Header;
