import React, {useState} from 'react';
import styled, {createGlobalStyle} from "styled-components";
import { ReactComponent as Bag_add_arrow } from '../../svg/bag_add_arrow.svg';
import { bagAddModalState, user_id } from "../../recoil/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
  margin-top: -500px;
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
  height: 580px;
  box-shadow: gray 0px 0px 15px;
  z-index: 5;
  margin-top: 10px;
  margin-bottom: 43px;
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
  border: 2px solid #1a1919;
  border-radius: 8px;
  width: 400px;
  height: 60px;
  padding: 5px 20px;
  font-size: 19px;
  font-weight: 700;

  &::placeholder{
    color: #c1c1c1;
  }
`;

//시작날짜, 끝날짜
const Bag_add_modal_input_text = styled.div`
  width: 110px;
  font-size: 19px;
  font-weight: 700;
  margin-left: 40px;
  margin-right: auto;
  text-align: left;

  &::placeholder{
    color: #c1c1c1;
  }
`;
//년도 입력
const Bag_add_modal_input_year = styled.input`
  border: 2px solid #1a1919;
  border-radius: 8px;
  width: 120px;
  height: 50px;
  padding: 5px 20px;
  font-size: 19px;
  font-weight: 700;
  text-align: center;

  &::placeholder{
    color: #c1c1c1;
  }
`;
//달, 일 입력
const Bag_add_modal_input_month_day = styled.input`
  border: 2px solid #1a1919;
  border-radius: 8px;
  width: 100px;
  height: 50px;
  padding: 5px 20px;
  font-size: 19px;
  font-weight: 700;
  text-align: center;

  &::placeholder{
    color: #c1c1c1;
  }
`;

//날짜 구분선
const Bag_add_modal_input_date_line = styled.div`
  border: 1px solid #1a1919;
  width: 10px;
  margin: 0 10px 0 10px;
`;

//가방 추가하기 버튼
const Bag_add_modal_btn = styled.button`
  border: none;
  background-color: #1a1919;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 700;
  margin-top: 10px;
  width: 400px;
  height: 60px;
  color: white;
  font-family: 'TAEBAEKfont';
`;

function Bag_add_modal() {

  //닫기 버튼 클릭 시
  const [isOpen, setIsOpen] = useRecoilState(bagAddModalState);

   const openModalHandler = () => {
    setIsOpen(false);
  };

  const [bagName, setBagName] = useState(""); //가방이름
  const [location, setLocation] = useState(""); //여행 지역

  const [sYear, setSyear] = useState("")
  const [sMonth, setSmonth] = useState("")
  const [sDay, setSday] = useState("")

  const [eYear, setEyear] = useState("")
  const [eMonth, setEmonth] = useState("")
  const [eDay, setEday] = useState("")

  const startDate = sYear + "-" + sMonth + "-" + sDay; //시작 날짜
  const endDate = eYear + "-" + eMonth + "-" + eDay; //끝 날짜

  //const userId = useRecoilValue(user_id);
  const kakaoId = localStorage.getItem("kakaoId");

  function onClick_addBag(){
    if (bagName != "" && location != "" && sYear !="" && sMonth != "" && sDay != ""
      && eYear !="" && eMonth != "" && eDay != "") {

      const requestData = {
        location: location,
        bagName: bagName,
        startDate: startDate,
        endDate: endDate
      };
      axios({
        url: `/bag/${kakaoId}`,
        method: 'POST',
        headers: { "Content-Type": "Application/json;charset=UTF-8"},
        data:{
          location: requestData.location,
          bagName: requestData.bagName,
          startDate: requestData.startDate,
          endDate: requestData.endDate
        },
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.error('AxiosError:', error);
      });
    }

    else{
      alert("입력값을 확인해주세요");
    }
  }

  return (
      <ModalContainer>
        <GlobalStyle/>
        <ModalView>
            <Bag_add_modal_header>
                <Bag_add_modal_backarrow>
                    <Bag_add_arrow width="20" height="20" onClick={openModalHandler}/>
                </Bag_add_modal_backarrow>
                <Bag_add_modal_header_text>가방 추가하기</Bag_add_modal_header_text>
            </Bag_add_modal_header>
            <Bag_add_modal_main>
                <Bag_add_modal_input_box>
                    <Bag_add_modal_input 
                      placeholder='가방이름을 입력해주세요.'
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setBagName(e.target.value); }}>                        
                    </Bag_add_modal_input>
                </Bag_add_modal_input_box>
                <Bag_add_modal_input_box>
                    <Bag_add_modal_input 
                      placeholder='여행 지역을 입력해주세요.'
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setLocation(e.target.value); }}>
                    </Bag_add_modal_input>
                </Bag_add_modal_input_box>
                <Bag_add_modal_input_text>시작 날짜</Bag_add_modal_input_text>
                <Bag_add_modal_input_box>
                    <Bag_add_modal_input_year 
                      placeholder='YYYY'
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSyear(e.target.value); }}>
                    </Bag_add_modal_input_year>
                    <Bag_add_modal_input_date_line></Bag_add_modal_input_date_line>
                    <Bag_add_modal_input_month_day 
                      placeholder='MM'
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSmonth(e.target.value); }}>                      
                    </Bag_add_modal_input_month_day>
                    <Bag_add_modal_input_date_line></Bag_add_modal_input_date_line>
                    <Bag_add_modal_input_month_day 
                      placeholder='DD'
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSday(e.target.value); }}>
                    </Bag_add_modal_input_month_day>
                </Bag_add_modal_input_box>
                <Bag_add_modal_input_text>끝 날짜</Bag_add_modal_input_text>
                <Bag_add_modal_input_box>
                    <Bag_add_modal_input_year 
                      placeholder='YYYY'
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEyear(e.target.value); }}>
                    </Bag_add_modal_input_year>
                    <Bag_add_modal_input_date_line></Bag_add_modal_input_date_line>
                    <Bag_add_modal_input_month_day 
                      placeholder='MM'
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmonth(e.target.value); }}>
                    </Bag_add_modal_input_month_day>
                    <Bag_add_modal_input_date_line></Bag_add_modal_input_date_line>
                    <Bag_add_modal_input_month_day 
                      placeholder='DD'
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEday(e.target.value); }}>
                    </Bag_add_modal_input_month_day>
                </Bag_add_modal_input_box>
                <Bag_add_modal_btn onClick={onClick_addBag}>추가하기</Bag_add_modal_btn>
            </Bag_add_modal_main>
        </ModalView>
      </ModalContainer>
  );
}

export default Bag_add_modal;
