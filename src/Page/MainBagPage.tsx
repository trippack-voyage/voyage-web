import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import axios from 'axios';
import {FaPlus} from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';

//recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { bagAddModalState, bagUpdateState, bagDelState, bagState } from "../recoil/atoms";
//component 가져오기
import SuitCase from '../Components/Mainpage/SuitCase';
import Bag_add_modal from '../Components/Mainpage/Bag_add_modal';
import Bag_update_modal from '../Components/Mainpage/Bag_update_modal';
import Bag_delete_modal from '../Components/Mainpage/Bag_delete_modal';
import Bag_state_modal from '../Components/Mainpage/Bag_state_modal';

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

  const isbagUpdate = useRecoilValue(bagUpdateState);
  const isbagDel = useRecoilValue(bagDelState);
  const isbagState = useRecoilValue(bagState);

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
        <SuitCase/>
        <SuitCase/>
        <SuitCase/>
        <SuitCase/>
        <SuitCase/>
        <SuitCase/>
        <Bag_add_btn_box>
          <Bag_add_btn onClick={openModalHandler}>
            <FaPlus size="40"></FaPlus>
          </Bag_add_btn>
        </Bag_add_btn_box>
      </Main_main>
      {isOpen ? 
        <Bag_add_modal></Bag_add_modal>
      : null}
      {isbagUpdate ? 
        <Bag_update_modal></Bag_update_modal>
      : null}
      {isbagDel ? 
        <Bag_delete_modal></Bag_delete_modal>
      : null}
      {isbagState ? 
        <Bag_state_modal></Bag_state_modal>
      : null}
    </div>
  );
}

export default MainBagPage;
