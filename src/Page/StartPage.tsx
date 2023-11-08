import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styled, {keyframes, createGlobalStyle} from 'styled-components';
import LoginLogo from '../img/kakao_login_large_wide.png';
import Logo from '../img/logo.png';

export const GlobalStyle = createGlobalStyle`
    #root,
    html,
    body {
        width: 100%;
        background-color: #ea5028;
    }
    @font-face {
      font-family: 'TAEBAEKfont';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKfont.woff2') format('woff2');
      font-weight: normal;
      font-style: normal;
    }
`

//how to pack
const Logo_text2 = styled.div`
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  margin-top: 80px;
  font-family: 'TAEBAEKfont';

  @media screen and (max-width: 500px) {
    font-size: 20px;
  }
`;

//together ...
const Logo_text3 = styled.div`
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  margin-top: 20px;
  font-family: 'TAEBAEKfont';

  @media screen and (max-width: 500px) {
    font-size: 20px;
  }
`;

//함께 ...
const Logo_text4 = styled.div`
  font-size: 25px;
  font-weight: 500;
  text-align: center;
  margin-top: 30px;
  font-family: 'TAEBAEKfont';

  @media screen and (max-width: 500px) {
    font-size: 17px;
  }
`;

//로고 박스
const Logo_container = styled.div`
  display: flex;
`;

//로고 이미지
const Logo_img = styled.img`
  margin: 0px auto;
  width: 350px;
  height: 350px;
`;

//voyage
const Logo_text5 = styled.div`
  font-size: 50px;
  font-weight: 500;
  text-align: center;
  margin-top: 10px;
  font-family: 'TAEBAEKfont';

  @media screen and (max-width: 500px) {
    font-size: 40px;
  }
`;

//로그인 버튼 박스
const StartBtn_box = styled.div`
  text-align: center;
  margin-top: 30px;
`;

//로그인 버튼 이미지
const StartBtn_image = styled.img`
  width: 400px;

  @media screen and (max-width: 500px) {
    width: 350px;
  }
`;

//로그인 시...
const StartText = styled.div`
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  margin-top: 15px;
  margin-bottom: 30px;

  @media screen and (max-width: 500px) {
    font-size: 13px;
  }
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
        <Logo_container>
          <Logo_img src={Logo}></Logo_img>
        </Logo_container>
        <Logo_text5>VOYAGE</Logo_text5>
        <StartBtn_box>
          <StartBtn_image src={LoginLogo} onClick={startService}></StartBtn_image>
        </StartBtn_box>
        <StartText>로그인 시 이용약관과 개인정보 처리 방침에 동의하게 됩니다.</StartText>
    </div>
  );
}
export default StartPage;
