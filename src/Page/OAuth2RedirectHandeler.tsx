import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled, {keyframes, createGlobalStyle} from 'styled-components';
import SuitCase from '../img/suitcases.png';
 
export const GlobalStyle = createGlobalStyle`
    #root,
    html,
    body {
        width: 100%;
        background-color: #000000;
    }
`

function OAuth2RedirectHandeler() {

  const Rest_api_key='b791159adc4e18ab175997922e03859a' //REST API KEY
  const redirect_uri = 'http://localhost:3000/api/oauth/token' //Redirect URI
  const grant_type = 'authorization_code';
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");
  const navi = useNavigate();

  useEffect(() => {
    axios.post(
      `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&code=${code}`,
      {},
      {
        headers: {
          "Content-type":
          "application/x-www-form-urlencoded;charset=UTF-8",
        },
      }
    ).then((res) => {
      console.log(res);
      const {data} = res;
      const {access_token} = data;

      if(access_token){
        console.log(`${access_token}`);

        axios.post(
          "https://kapi.kakao.com/v2/user/me",
          {},
          {
            headers:{
              Authorization: `Bearer ${access_token}`,
              "Content-type": "application/x-www-form-urlencoded",
            },
          }
        ).then((res) => {
          console.log("데이터 성공: ");
          console.log(res);
          navi("/bag-list");

        });
      } else{
        console.log("access_token 없음");
      }
    });
  },[])

  return (
      <div>
          <GlobalStyle/>
      </div>
  );
}
 
export default OAuth2RedirectHandeler;