import React, {useState} from 'react';
import styled from "styled-components";
import { ReactComponent as Bag_add_arrow } from '../../svg/bag_add_arrow.svg';
import { bagAddModalState } from "../../recoil/atoms";
import { useRecoilState } from "recoil";

export const ModalContainer = styled.div`
  display: flex;
  flex-flow: row wrep;
  justify-content: center;
  align-items: center;
  z-index: 50;
  margin-top: -240px;
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
  height: 550px;
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.25);
`;

//모달 헤더
const Bag_add_modal_header = styled.div`
  display: flex;
  position: relative;
`;
//뒤로가기 화살표
const Bag_add_modal_backarrow = styled.span`
  margin: auto auto auto 20px;
`;
//모달 헤더 제목(가방추가하기)
const Bag_add_modal_header_text = styled.span`
  font-size: 40px;
  font-weight: 700;
  width: 260px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
//모달 메인
const Bag_add_modal_main = styled.div`
  margin-top: 50px;
`;

const Bag_add_modal_input_box = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
//입력창
const Bag_add_modal_input = styled.input`
  border: 2px solid #f18851;
  border-radius: 8px;
  width: 400px;
  height: 50px;
  padding: 5px 20px;
  font-size: 25px;
  font-weight: 500;
`;
//시작날짜, 끝날짜
const Bag_add_modal_input_text = styled.div`
  width: 110px;
  font-size: 25px;
  font-weight: 600;
  margin-left: 35px;
  margin-right: auto;
  text-align: left;
`;
//년도 입력
const Bag_add_modal_input_year = styled.input`
  border: 2px solid #f18851;
  border-radius: 8px;
  width: 100px;
  height: 45px;
  padding: 5px 20px;
  font-size: 25px;
  font-weight: 500;
  text-align: center;
`;
//달, 일 입력
const Bag_add_modal_input_month_day = styled.input`
  border: 2px solid #f18851;
  border-radius: 8px;
  width: 70px;
  height: 45px;
  padding: 5px 20px;
  font-size: 25px;
  font-weight: 500;
  text-align: center;
`;
//날짜 구분선
const Bag_add_modal_input_date_line = styled.div`
  border: 1px solid black;
  width: 10px;
  margin: 0 10px 0 10px;
`;

//가방 추가하기 버튼
const Bag_add_modal_btn = styled.button`
  border: none;
  background-color: #f18851;
  border-radius: 10px;
  font-size: 27px;
  font-weight: 700;
  margin-top: 10px;
  width: 440px;
  height: 60px;
`;

function Bag_add_modal() {

    const [isOpen, setIsOpen] = useRecoilState(bagAddModalState);

   const openModalHandler = () => {
    setIsOpen(false);
  };

  return (
      <ModalContainer>
        <ModalView>
            <Bag_add_modal_header>
                <Bag_add_modal_backarrow>
                    <Bag_add_arrow width="30" height="30" fill="orange" onClick={openModalHandler}/>
                </Bag_add_modal_backarrow>
                <Bag_add_modal_header_text>가방 추가하기</Bag_add_modal_header_text>
            </Bag_add_modal_header>
            <Bag_add_modal_main>
                <Bag_add_modal_input_box>
                    <Bag_add_modal_input placeholder='가방이름을 입력해주세요.'></Bag_add_modal_input>
                </Bag_add_modal_input_box>
                <Bag_add_modal_input_box>
                    <Bag_add_modal_input placeholder='여행 지역을 입력해주세요.'></Bag_add_modal_input>
                </Bag_add_modal_input_box>
                <Bag_add_modal_input_text>시작 날짜</Bag_add_modal_input_text>
                <Bag_add_modal_input_box>
                    <Bag_add_modal_input_year placeholder='YYYY'></Bag_add_modal_input_year>
                    <Bag_add_modal_input_date_line></Bag_add_modal_input_date_line>
                    <Bag_add_modal_input_month_day placeholder='MM'></Bag_add_modal_input_month_day>
                    <Bag_add_modal_input_date_line></Bag_add_modal_input_date_line>
                    <Bag_add_modal_input_month_day placeholder='DD'></Bag_add_modal_input_month_day>
                </Bag_add_modal_input_box>
                <Bag_add_modal_input_text>끝 날짜</Bag_add_modal_input_text>
                <Bag_add_modal_input_box>
                    <Bag_add_modal_input_year placeholder='YYYY'></Bag_add_modal_input_year>
                    <Bag_add_modal_input_date_line></Bag_add_modal_input_date_line>
                    <Bag_add_modal_input_month_day placeholder='MM'></Bag_add_modal_input_month_day>
                    <Bag_add_modal_input_date_line></Bag_add_modal_input_date_line>
                    <Bag_add_modal_input_month_day placeholder='DD'></Bag_add_modal_input_month_day>
                </Bag_add_modal_input_box>
                <Bag_add_modal_btn>가방 추가하기</Bag_add_modal_btn>
            </Bag_add_modal_main>
        </ModalView>
      </ModalContainer>
  );
}

export default Bag_add_modal;
