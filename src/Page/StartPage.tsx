import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styled, {keyframes} from 'styled-components';
import LoginLogo from '../img/kakao_login_large_wide.png';
import { createGlobalStyle } from "styled-components";
import SuitCase from '../img/suitcases.png';

export const GlobalStyle = createGlobalStyle`
    #root,
    html,
    body {
        width: 100%;
        background-color: #000000;
    }
    @font-face {
      font-family: 'KBO-Dia-Gothic_bold';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/KBO-Dia-Gothic_bold.woff') format('woff');
      font-weight: 700;
      font-style: normal;
  }
`

//how to pack
const Logo_text2 = styled.div`
  color: #fffeef;
  font-size: 60px;
  font-weight: 700;
  text-align: center;
  margin-top: 150px;
  font-family: 'KBO-Dia-Gothic_bold';
`;

//together ...
const Logo_text3 = styled.div`
  color: #fffeef;
  font-size: 60px;
  font-weight: 700;
  text-align: center;
  margin-top: 20px;
  font-family: 'KBO-Dia-Gothic_bold';
`;

//함께 ...
const Logo_text4 = styled.div`
  color: #fffeef;
  font-size: 25px;
  font-weight: 500;
  text-align: center;
  margin-top: 30px;
  font-family: 'KBO-Dia-Gothic_bold';
`;

//로고 박스
const Logo_container = styled.div`
  display: flex;
`;

//로고 문구
const Logo_text = styled.div`
  margin: 100px auto auto auto;
  color: #ea5028;
  text-align: center;
  font-size: 150px;
  font-weight: 700;
  font-family: 'KBO-Dia-Gothic_bold';
`;

//로그인 버튼 박스
const StartBtn_box = styled.div`
  text-align: center;
  margin-top: 50px;
`;

//로그인 버튼 이미지
const StartBtn_image = styled.img`
  width: 400px;
`;

//로그인 시...
const StartText = styled.div`
  text-align: center;
  font-family: Inter;
  font-size: 15px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0em;
  color: #c1c1c1;
  margin-top: 10px;
`;

const Bag_line = styled.div`
  display: flex;
  margin-top: -5px;
`;

const Bag_line1 = styled.div`
  border: 1px solid #fffeef;
  width: 600px;
`;

const Bag_line2 = styled.div`
  border: 1px solid #fffeef;
  width: 420px;
  margin-right: 0px;
  margin-left: auto;
`;

//캐리어 애니메이션
const Box_Ani = keyframes`
  from {
    transform: translate(100px, 95px);
  }
  to {
    transform: translate(400px, 95px);
  }
`;

//캐리어 아이콘
const SuitCase_img = styled.img`
	align-items: center;
	justify-content: center;
	height: 150px;
	animation: ${Box_Ani} 4s infinite; /* 애니메이션 적용 */
`;

function StartPage() {

  const Rest_api_key='b791159adc4e18ab175997922e03859a' //REST API KEY
  const redirect_uri = 'http://localhost:3000/api/oauth/token' //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`

  const startService = () => {
    window.location.href = kakaoURL
  }

  return (
    <div>
        <GlobalStyle/>
        <Logo_text2>HOW TO PACK</Logo_text2>
        <Logo_text3>TOGETHER, EASILY AND SMARTLY</Logo_text3>
        <Logo_text4>함께, 쉽게, 똑똑하게 짐 싸는 방법</Logo_text4>
        <Logo_container><SuitCase_img src={SuitCase}></SuitCase_img><Logo_text>VOYAGE</Logo_text></Logo_container>
        <Bag_line>
          <Bag_line1></Bag_line1>
          <Bag_line2></Bag_line2>
        </Bag_line>
        <StartBtn_box>
          <StartBtn_image src={LoginLogo} onClick={startService}></StartBtn_image>
        </StartBtn_box>
        <StartText>로그인 시 이용약관과 개인정보 처리 방침에 동의하게 됩니다.</StartText>
    </div>
  );
}
export default StartPage;
