import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import axios from "axios";
 
function OAuth2RedirectHandeler() {
  
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");
  console.log(code);

  useEffect(() => {
    console.log(code)
    main()
  }, [])


  const getKakaoTokenHandler = async (code: string) => {
    const url = "/api/oauth/token"
    await axios.get(url, {params: {code}})
    .then((res) => {
      console.log("res: ", res)
      console.log("성공")
    })
    .catch((error) => {
      console.log(error.response)
      console.log("실패")
    })
  }

  const main = async () => {

    if (code === null || code === "") {
        alert("카카오에서 코드를 받는데 실패했습니다");
        return;
    } else {
      console.log("백엔드 전달");
      getKakaoTokenHandler(code.toString())
    }
  }
  
  
  return (
      <div>
          Loading...
      </div>
  );
}
 
export default OAuth2RedirectHandeler;