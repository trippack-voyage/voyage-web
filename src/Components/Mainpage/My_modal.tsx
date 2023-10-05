import React, {useState} from 'react';
import styled from "styled-components";
import { ReactComponent as Bag_add_arrow } from '../../svg/bag_add_arrow.svg';
import { bagAddModalState } from "../../recoil/atoms";
import { useRecoilState } from "recoil";

export const ModalContainer = styled.div`
  display: flex;
  z-index: 50;
`;

export const ModalView = styled.div.attrs(props => ({
  role: 'dialog'
}))`
  text-align: center;
  text-decoration: none;
  background-color: white;
  border-radius: 20px;
  width: 180px;
  height: 200px;
  margin: -10px 50px -200px auto;
  padding: 10px;
  background-color: black;
`;

const My_list = styled.div`
  font-size: 23px;
  color: gray;
  padding: 14px;
  font-weight: 700;
  cursor: pointer;

  &:hover{
    color: #ea5028;
  }
`;

//구분선
const My_list_line = styled.div`
  border: 1px solid gray;
  width: 50px;
  margin: 5px auto;
`;

function My_modal() {

  return (
      <ModalContainer>
        <ModalView>
          <My_list>로그아웃</My_list>
          <My_list_line></My_list_line>
          <My_list>회원탈퇴</My_list>
          <My_list_line></My_list_line>
          <My_list>문의하기</My_list>
        </ModalView>
      </ModalContainer>
  );
}

export default My_modal;
