import React, {useState} from 'react';
import styled, {createGlobalStyle} from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { user_accessToken, user_id, user_name, user_profile } from "../../recoil/atoms";
import { useRecoilValue } from "recoil";

export const GlobalStyle = createGlobalStyle`
    @font-face {
      font-family: 'TAEBAEKfont';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKfont.woff2') format('woff2');
      font-weight: normal;
      font-style: normal;
    }
`
//마이페이지 모달 컨테이너
export const ModalContainer = styled.div`
  display: flex;
`;

//마이페이지 모달 박스
export const ModalView = styled.div.attrs(props => ({
  role: 'dialog'
}))`
  text-align: center;
  background-color: white;
  border-radius: 20px;
  width: 180px;
  height: 325px;
  margin: -30px 30px -300px auto;
  padding: 10px;
  background-color: black;
  z-index: 11;

  @media screen and (max-width: 500px){
    width: 150px;
    height: 305px;
    margin: -10px 10px -300px auto;

  }
`;

const My_list = styled.div`
  font-size: 23px;
  color: gray;
  padding: 14px;
  font-weight: 500;
  cursor: pointer;
  font-family: 'TAEBAEKfont';
  z-index: 11;
  &:hover{
    color: #ea5028;
  }

  @media screen and (max-width: 500px){
    font-size: 19px;
  }
`;

//구분선
const My_list_line = styled.div`
  border: 1px solid gray;
  width: 50px;
  margin: 5px auto;
`;

function My_modal() {

  const navi = useNavigate();

  const kakaoId = localStorage.getItem("kakaoId");
  const userAccessToken = useRecoilValue(user_accessToken);

  const KAKAO_UNLINK_URI = "https://kapi.kakao.com/v1/user/unlink";

  //회원탈퇴
  function unlink_res() {
    //카카오 회원삭제
    axios.post(
      KAKAO_UNLINK_URI,
      {
        target_id_type : "user_id",
        target_id : `${kakaoId}` //  해당 사용자 id(카카오 회원번호)
      }, 
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "KakaoAK " + '1b5fbe1f05888072ec75005c783c9120',
        },
      }
    );

    axios.delete('/kakao/delete/' + `${Number(kakaoId)}`)
    .then(response => {
        console.log('success:',response);
    }).catch(e => {
        console.log('error:', e)
    })
    navi("/");
  }

  //로그아웃
  function logout(){
    axios({
      method: 'POST',
      url: 'https://kapi.kakao.com/v1/user/logout',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${userAccessToken}`
      },
    }).then(() => {
      window.location.href = '/'
    }).catch((e) => {
      console.log('e : ' , e)
      if (e.response.data.code === -401) {
        window.location.href = '/'
      }
    })
  }

  //친구 관리
  function onClick_friendSet(){
    navi("/friend-set");
  }

   //여행달력
   function onClick_BagCalendar(){
    navi("/bag-calendar");
  }

  return (
      <ModalContainer>
        <GlobalStyle/>
        <ModalView>
          <My_list onClick={onClick_friendSet}>친구관리</My_list>
          <My_list_line></My_list_line>
          <My_list onClick={onClick_BagCalendar}>여행달력</My_list>
          <My_list_line></My_list_line>
          <My_list onClick={logout}>로그아웃</My_list>
          <My_list_line></My_list_line>
          <My_list onClick={unlink_res}>회원탈퇴</My_list>
          <My_list_line></My_list_line>
          <My_list><Link to="https://open.kakao.com/o/sJexJjMf">문의하기</Link></My_list>
        </ModalView>
      </ModalContainer>
  );
}

export default My_modal;
