import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
//import axios from 'axios';
//border: 2px solid #000;

const StartCover = styled.div`
  text-align: center;
`;
const StartBtn = styled.button`
  border: none;
  width: 500px;
  height: 100px;
  margin: 550px auto 10px auto;
  border-radius: 30px;
  background-color: #FFE500;
  font-family: Inter;
  font-size: 32px;
  font-weight: 700;
  line-height: 48px;
  letter-spacing: 0em;
  text-align: center;
`;
const StartText = styled.div`
  font-family: Inter;
  font-size: 15px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0em;
  color: #656565;
`;

function StartPage() {

  const Rest_api_key='fcf78e99174996ae189702c84e5d3dba' //REST API KEY
  const redirect_uri = 'http://localhost:8080/login/oauth2/code/kakao' //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`

  const startService = () => {
    window.location.href = kakaoURL
  }

  return (
    <StartCover>
      <StartBtn onClick={startService}>카카오로 시작하기</StartBtn>
      <StartText>로그인 시 이용약관과 개인정보 처리 방침에 동의하게 됩니다.</StartText>
    </StartCover>
  );
}
export default StartPage;
