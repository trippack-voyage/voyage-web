import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
//import axios from 'axios';
//border: 2px solid #000;

const ProfileCover = styled.div`
  text-align: center;
`;
const LogoImg = styled.div`
  border: 2px solid #000;
  width: 400px;
  height: 80px;
  background-color: #D9D9D9;
  margin: 20px auto 10px auto;
`;
const MainVoyageText = styled.div`
  text-align: center;
`;

function MainPage() {
  const navigate = useNavigate();
  const [voyage, setVoyage] = useState();
  
  const startMyPage = () => {
    navigate('/MyPage', { replace: true });
  }

  return (
    <ProfileCover>
      <LogoImg>로고</LogoImg>
      <MainVoyageText>내 여행 가방들</MainVoyageText>
      { voyage? (
        //가방있음. 가방 띄우기!
        <></>
        ):(
        //가방없음..
        <>아직 가방이 없어요!</>
      )}
    </ProfileCover>
  );
}
export default MainPage;
