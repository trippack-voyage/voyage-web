import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import Bag_add_modal from '../Components/Mainpage/Bag_add_modal';
import { useRecoilState } from "recoil";
import { bagAddModalState } from "../recoil/atoms";
import { createGlobalStyle } from "styled-components";
import SuitCase from '../Components/Mainpage/SuitCase';
import axios from 'axios';

import {FaPlus} from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';

export const GlobalStyle = createGlobalStyle`
    #root,
    html,
    body {
        width: 100%;
        background-color: #f6f8f9;
    }

    @font-face {
      font-family: 'TAEBAEKfont';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKfont.woff2') format('woff2');
      font-weight: normal;
      font-style: normal;
    }
`
const Main_header = styled.div`
  margin-top: 60px;
  z-index: 10;
  text-align: center;
`;

const Main_title = styled.span`
  font-size: 40px;
  font-weight: 500;
  margin: 0px auto;
  color: #1a1919;
  font-family: 'TAEBAEKfont';
`;

const Main_title_line = styled.div`
  border: 2px solid #1a1919;
  width: 100px;
  margin: 30px auto;
`;

const Main_main = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  z-index: -1;
`;

//가방 추가 버튼 박스
const Bag_add_btn_box = styled.div`
  width: 70px;
  height: 70px;
  margin: auto 30px auto auto;
`;

//가방 추가 버튼
const Bag_add_btn = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  font-size: 50px;
  background-color: #1a1919;
  border: none;
  color: white;
  position: fixed;
  right : 3rem;
  bottom : 5%;
`;

function MainBagPage() {

  //가방 추가 버튼 클릭 시
  const [isOpen, setIsOpen] = useRecoilState(bagAddModalState);

  const openModalHandler = () => {
    setIsOpen(true);
  };

  //캐리어 클릭 시
  const navi = useNavigate();
  function onClickSuitCase(){
    navi("/bagpack");
  }

  /*가방 리스트 가져오기*/
  const [bag_list , SetBag_list] = useState([]);
/*
  useEffect(()=> {
      axios.get('/study/list').then((res)=>{
      SetBag_list(res.data)
      console.log(res)
      })
      .catch(error => console.log(error))
  },[])  */

  return (
    <div>
      <GlobalStyle/>
      <Main_header>
        <Main_title>내 여행 가방들</Main_title>
        <Main_title_line></Main_title_line>
      </Main_header>
      <Main_main>
        <Link to="/bagpack"><SuitCase/></Link>
        <Link to="/bagpack"><SuitCase/></Link>
        <Link to="/bagpack"><SuitCase/></Link>
        <Link to="/bagpack"><SuitCase/></Link>
        <Link to="/bagpack"><SuitCase/></Link>
        <Link to="/bagpack"><SuitCase/></Link>
        <Bag_add_btn_box>
          <Bag_add_btn onClick={openModalHandler}>
            <FaPlus size="40"></FaPlus>
          </Bag_add_btn>
        </Bag_add_btn_box>
      </Main_main>
      {isOpen ? 
        <Bag_add_modal></Bag_add_modal>
      : null}
    </div>
  );
}

export default MainBagPage;
