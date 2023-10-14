import React, {useState} from 'react';
import styled, {createGlobalStyle} from "styled-components";
import { ReactComponent as Bag_add_arrow } from '../../svg/bag_add_arrow.svg';
import axios from 'axios';

//recoil
import { bagState, user_id } from "../../recoil/atoms";
import { useRecoilState, useRecoilValue } from "recoil";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'TAEBAEKfont';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
`

export const ModalContainer = styled.div`
  display: flex;
  flex-flow: row wrep;
  justify-content: center;
  align-items: center;
  margin-top: -1000px;
`;

export const ModalView = styled.div.attrs(props => ({
  role: 'dialog'
}))`
  text-align: center;
  text-decoration: none;
  padding: 40px 20px;
  background-color: white;
  border-radius: 30px;
  width: 500px;
  height: 310px;
  box-shadow: gray 0px 0px 15px;
  z-index: 1;
  margin-top: 10px;
  margin-bottom: 243px;
`;

//모달 헤더
const Bag_add_modal_header = styled.div`
  display: flex;
  position: relative;
`;

//모달 헤더 제목(가방삭제하기)
const Bag_add_modal_header_text = styled.span`
  font-size: 30px;
  font-weight: 700;
  width: 260px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'TAEBAEKfont';
`;
//모달 메인
const Bag_add_modal_main = styled.div`
  margin-top: 50px;
  padding: 40px 10px;
  font-size: 20px;
  color: gray;
`;

const Btn_container = styled.div`
  display: flex;
  margin-top: 60px;
`;
//가방 삭제하기 버튼
const Bag_del_btn = styled.button`
  border: none;
  background-color: #1a1919;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 700;
  margin-top: 10px;
  width: 300px;
  height: 60px;
  color: white;
  font-family: 'TAEBAEKfont';
  margin-left: 10px;
`;

function Bag_state_modal() {

  //닫기 버튼 클릭 시
  const [isbagState, setIsbagState] = useRecoilState(bagState);

   const openModalHandler = () => {
    setIsbagState(false);
  };

  return (
      <ModalContainer>
        <GlobalStyle/>
        <ModalView>
            <Bag_add_modal_header>
                <Bag_add_modal_header_text>가방 상태 변경</Bag_add_modal_header_text>
            </Bag_add_modal_header>
            <Bag_add_modal_main>
              짐 싸기가 완료되었나요?
              <Btn_container>
                <Bag_del_btn>완료</Bag_del_btn>
                <Bag_del_btn onClick={openModalHandler}>취소</Bag_del_btn>
              </Btn_container>
            </Bag_add_modal_main>
        </ModalView>
      </ModalContainer>
  );
}

export default Bag_state_modal;
