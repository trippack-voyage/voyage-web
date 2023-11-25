import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled, {keyframes, createGlobalStyle} from 'styled-components';
import { user_id, user_name, user_profile, user_accessToken } from "../recoil/atoms";
import { useRecoilState } from "recoil";
 
export const GlobalStyle = createGlobalStyle`
    #root,
    html,
    body {
        width: 100%;
        background-color: white;
    }
`

function OAuth2RedirectHandeler() {

  const Rest_api_key='b791159adc4e18ab175997922e03859a' //REST API KEY
  const redirect_uri = 'http://localhost:3000/api/oauth/token' //Redirect URI
  const grant_type = 'authorization_code';
  const params = new URL(document.location.toString()).searchParams;
  const code = params.get("code");
  const navi = useNavigate();

  const [userId, setUserId] = useRecoilState(user_id);
  const [userName, setUserName] = useRecoilState(user_name);
  const [userProfile, setUserProfile] = useRecoilState(user_profile);
  const [userEmail, setUserEmail] = useState("");
  const [userAccessToken, setUserAccessToken] = useRecoilState(user_accessToken);

  const [isAccount, setIsAccount] = useState(false);

  useEffect(() => {
    console.log("시작");
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
          console.log(res);
          const {data} = res;
          const {id} = data;
          const {nickname} = data.properties;
          const {profile_image} = data.properties;
          const {email} = data.kakao_account;
          setUserId(`${id}`);
          setUserName(`${nickname}`);
          setUserProfile(`${profile_image}`);
          setUserAccessToken(`${access_token}`);
          setUserEmail(`${email}`);

          if (isAccount === false) {
            axios({
              url: '/kakao/oauth/token',
              method: 'GET',
              params: {
                kakaoId: id,
                kakaoProfileImg: profile_image,
                kakaoNickname: nickname,
                kakaoEmail: email,
                userRole: "ROLE_USER"
              }
            }).then(function (response) {
              localStorage.setItem("kakaoId", id);
              localStorage.setItem("userName", nickname);

              axios({
                url: `kakao/find-usercode/${localStorage.getItem("userName")}`,
                method: 'GET'
    
            }).then((response) => {
                localStorage.setItem("userCode", response.data);
            }).catch((error) => {
                console.error('AxiosError:', error);
            });
            });
          }

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