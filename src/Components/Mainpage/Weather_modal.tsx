import React, { useState } from 'react';
import styled, { createGlobalStyle } from "styled-components";
import { ReactComponent as Bag_add_arrow } from '../../svg/bag_add_arrow.svg';
import { weatherModalState, user_id } from "../../recoil/atoms";
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
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  margin-top: -1000px;

  @media screen and (max-width: 500px){
    margin-top: -1600px;
  }
`;

export const ModalView = styled.div.attrs(props => ({
  role: 'dialog'
}))`
  text-align: center;
  text-decoration: none;
  padding: 40px 20px;
  background-color: ${({ theme }) => theme.navBar};
  border-radius: 20px;
  width: 420px;
  height: 490px;
  box-shadow: gray 0px 0px 15px;
  z-index: 5;
  margin-top: 10px;
  margin-bottom: 500px;
  border: 3px solid black;

  @media screen and (max-width: 500px){
    width: 310px;
    height: 420px;
  }
`;

//모달 헤더
const Bag_add_modal_header = styled.div`
  display: flex;
  position: relative;
`;
//뒤로가기 화살표
const Bag_add_modal_backarrow = styled.span`
  margin: auto auto auto 20px;

  @media screen and (max-width: 500px){
    margin: auto auto auto 6px;
    z-index: 10;
  }
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

  @media screen and (max-width: 500px){
    font-size: 22px;
    margin-left: 4px;
    top: 30%;
  }
`;
//모달 메인
const Bag_add_modal_main = styled.div`
  margin-top: 35px;
`;

const Bag_add_modal_input_box = styled.div`
  margin-top: -15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

//입력창
const Bag_add_modal_input = styled.input`
  border: 2px solid #1a1919;
  border-radius: 8px;
  width: 360px;
  height: 55px;
  padding: 5px 20px;
  font-size: 18px;
  font-weight: 700;
  background-color: ${({ theme }) => theme.headerBackground};


  &::placeholder{
    color: #c1c1c1;
  }

  @media screen and (max-width: 500px){
    font-size: 14px;
    height: 50px;
  }
`;

//조회하기 버튼
const Bag_add_modal_btn = styled.button`
  border: none;
  background-color: #1a1919;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 700;
  width: 360px;
  height: 55px;
  color: white;
  font-family: 'TAEBAEKfont';
  margin-top: 10px;

  &:hover{
    color: #ea5028;
  }

  @media screen and (max-width: 500px){
    width: 270px;
    font-size: 17px;
    margin-top: 0px;
  }
`;

//여행 가는 나라의 날씨를 검색해보세요! (문구)
const Weather_text = styled.div`
  margin-top: 40px;
  font-size: 19px;
  color: ${({ theme }) => theme.text1};

  @media screen and (max-width: 500px){
    margin-top: 20px;
    font-size: 15px;
  }
`;

//날씨 결과 박스
const Weather_result_box = styled.div`
  border-radius: 8px;
  height: 135px;
  width: 360px;
  font-weight: 700;
  margin-top: 22px;
  border: 3px solid #FF541E;
  box-shadow: rgba(245, 105, 60, 0.18) 0px 0px 15px;
`;

const Weather = styled.div`
  display: flex;
  margin-top: 23px;
  font-size: 23px;
  margin-left: 19px;

  @media screen and (max-width: 500px){
    font-size: 18px;
  }
`;

const Weather_content1 = styled.div`
  display: flex;
  align-items: center; // 중앙 정렬을 위해 추가
  margin-left: 80px;

  @media screen and (max-width: 500px){
    margin-left: 50px;
  }
`;

const Weather_content2 = styled.div`
  display: flex;
  align-items: center; 
  margin-left: 20px;
  border-left: 2px solid black;
  padding: 0px 20px;
  height: 30px; 

  img {
    max-width: 60px; 
    max-height: 60px;
    margin-left: 5px;
  }

  @media screen and (max-width: 500px){
    img {
      max-width: 40px; 
      max-height: 40px;
    }
  }
`;

function Weather_modal() {

  //닫기 버튼 클릭 시
  const [isOpen, setIsOpen] = useRecoilState(weatherModalState);

  const openModalHandler = () => {
    setIsOpen(false);
  };

  const [location, setLocation] = useState(""); //지역이름
  const [weatherData, setWeatherData] = useState({ temperature: 22.22, weather: "맑음", icon: "02d" }); // 초기 상태 설정


  //조회하기 버튼 클릭 시
  function onClick_weather() {
    axios
      .get('/weather', {
        params: { city: location },
      })
      .then((response) => {
        // 서버에서 받은 데이터를 상태로 업데이트
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error('AxiosError:', error);
      });
  }


  return (
    <ModalContainer>
      <GlobalStyle />
      <ModalView>
        <Bag_add_modal_header>
          <Bag_add_modal_backarrow>
            <Bag_add_arrow width="20" height="20" onClick={openModalHandler} style={{ fill: 'white' }} />
          </Bag_add_modal_backarrow>
          <Bag_add_modal_header_text>날씨 조회하기</Bag_add_modal_header_text>
        </Bag_add_modal_header>
        <Weather_text>여행 가는 나라의 날씨를 검색해보세요!</Weather_text>
        <Bag_add_modal_main>
          <Bag_add_modal_input_box>
            <Bag_add_modal_input
              placeholder='지역 이름을 입력해주세요. ex) seoul'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setLocation(e.target.value); }}>
            </Bag_add_modal_input>
          </Bag_add_modal_input_box>
          <Bag_add_modal_input_box>
            <Weather_result_box>
              <Weather>
                <Weather_content1>날씨</Weather_content1>
                <Weather_content2>{weatherData.weather} <img
                  src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                  alt="날씨 아이콘" 
                /></Weather_content2>
              </Weather>
              <Weather>
                <Weather_content1>온도</Weather_content1>
                <Weather_content2>{weatherData.temperature}</Weather_content2>
              </Weather>
            </Weather_result_box>
          </Bag_add_modal_input_box>
          <Bag_add_modal_btn onClick={onClick_weather}>조회하기</Bag_add_modal_btn>
        </Bag_add_modal_main>
      </ModalView>
    </ModalContainer>
  );
}

export default Weather_modal;