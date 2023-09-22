import React, {useState} from 'react';
import styled from "styled-components";
import Bag_add_modal from '../Components/Mainpage/Bag_add_modal';
import { useRecoilState } from "recoil";
import { bagAddModalState } from "../recoil/atoms";

const Main_header = styled.div`
  margin-top: 80px;
  z-index: 10;
  text-align: center;
`;

const Main_title = styled.span`
  font-size: 50px;
  font-weight: 700;
  margin: 0px auto;
`;

const Main_title_line = styled.div`
  border: 1px solid black;
  width: 100px;
  margin: 50px auto;
`;

const Main_main = styled.div`
  margin-top: 50px;
`;

//가방 추가 버튼 박스
const Bag_add_btn_box = styled.div`
  width: 70px;
  height: 70px;
  margin: auto 30px auto auto;
`;

//가방 추가 버튼
const Bag_add_btn = styled.button`
  width: 70px;
  height: 70px;
  border-radius: 40px;
  font-size: 50px;
  background-color: #f18851;
  border: none;
  color: white;
  position: fixed;
  right : 3rem;
  bottom : 5%;
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-flow: row wrep;
  justify-content: center;
  align-items: center;
  z-index: 50;
  margin-top: -220px;
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
`;

function Mainpage() {

  const [isOpen, setIsOpen] = useRecoilState(bagAddModalState);

  const openModalHandler = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <Main_header>
        <Main_title>내 여행 가방들</Main_title>
        <Main_title_line></Main_title_line>
      </Main_header>
      <Main_main>
        <Bag_add_btn_box><Bag_add_btn onClick={openModalHandler}>+</Bag_add_btn></Bag_add_btn_box>
      </Main_main>
      {isOpen ? 
        <Bag_add_modal></Bag_add_modal>
      : null}
    </div>
  );
}

export default Mainpage;
