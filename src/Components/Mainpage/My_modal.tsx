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
  font-weight: 500;
  cursor: pointer;
  font-family: 'TAEBAEKfont';
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

  const navi = useNavigate();

  const userId= localStorage.getItem("kakaoId");
  const userAccessToken = useRecoilValue(user_accessToken);

  const KAKAO_UNLINK_URI = "https://kapi.kakao.com/v1/user/unlink";

  function unlink_res() {
    /*axios.post(
      KAKAO_UNLINK_URI,
      {
        target_id_type : "user_id",
        target_id : `${userId}` //  해당 사용자 id(카카오 회원번호)
      }, 
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "KakaoAK " + '1b5fbe1f05888072ec75005c783c9120',
        },
      }
    );*/

    axios.delete('/kakao/delete/' + `${userId}`)
    .then(response => {
        console.log('success:',response);
    }).catch(e => {
        console.log('error:', e)
    })
    //navi("/");
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

  return (
      <ModalContainer>
        <GlobalStyle/>
        <ModalView>
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
