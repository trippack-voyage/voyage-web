import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import BagPackSide from '../Components/BagPack/BagPackSide';
import { useNavigate } from 'react-router-dom';
import {IoArrowBack} from "react-icons/io5";
import ChatInputBox from '../Components/BagPack/ChatGPT/InputBox';

//recoil
import { chat_response } from '../recoil/atoms';
import { useRecoilValue } from 'recoil';

export const GlobalStyle = createGlobalStyle`
    #root,
    html,
    body {
        width: 100%;
        background-color: #f6f8f9;
    }
`

const Bagpack_main = styled.div`
    display: flex;
`;

const Bagpack_main_box = styled.div`
    margin-left: 120px;
    margin-top: 50px;
`;

//헤더
const Bagpack_main_header = styled.div`
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 40px;
    font-weight: 700;
`;

const Bagpack_main_text = styled.div`
    margin-top: 8px;
    font-size: 18px;
    color: gray;
`;

const Friend_list_box = styled.div`
    display: flex;
    margin-top: 18px;
    margin-bottom: 10px;
    height: 450px;
    width: 1000px;
    flex-direction: column;
    flex-wrap: wrap;
    background-color: white;
    border-radius: 20px;
    padding: 20px;
    border: 1px solid #c1c1c1;

    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      width: 5px;
      height: 108px;
      border-radius: 12px;
      background: #d9d9d9;
    }
`;

//footer
const FriendSet_main_footer = styled.div`
    display: flex;
    margin-top: 30px;
`;

//응답 박스
const Response_box = styled.div`
  padding: 20px 30px;
  font-size: 20px;
  word-break: break-all;
  line-height: 30px;
  background-color: #f0f0f0;
  border-radius: 12px;
  padding: 10px;
  max-width: 70%;
  margin-left: auto;
`;

function ChatGPT() {

  //메인 이동
  const navi = useNavigate();
  function onClickBack() {
    navi("/bag-list");
  }
  
  

  const [response_chat, setResponse_chat] = useState<{ text: string, isUser: boolean }[]>([]);
  const [inputValue, setInputValue] = useState(""); // 추가
  const [if_res, setif_res] = useState(false);
  
  
  const chat_res = useRecoilValue(chat_response);

  useEffect(() => {
    // 새로운 응답을 질문과 응답 객체로 나누어 추가
    let newChat :{ text: string; isUser: boolean }[]= [];

    if (chat_res) {
      newChat = [
        { text: String(chat_res), isUser: true }, // 사용자 질문
        { text: chat_res.question, isUser: false }, // GPT 응답
      ];
    }

    // 입력값이 비어있지 않다면 질문도 추가
    console.log(chat_res);
    if (inputValue) {
      newChat.unshift({ text: inputValue, isUser: true });
    }
   
    
    
    setResponse_chat((prevChat) => ([
      ...prevChat,
      ...newChat,
    ]));
}, [chat_res, inputValue])
  return (
    <div>
      <GlobalStyle />
      <Bagpack_main>
        <BagPackSide />
        <Bagpack_main_box>
          <IoArrowBack size="50" onClick={onClickBack} />
          <Bagpack_main_header>짐 도우미(GPT)</Bagpack_main_header>
          <Bagpack_main_text>짐 도우미(GPT)를 이용해 짐을 쌀 때 필요한 정보를 얻어보세요!</Bagpack_main_text>
          <Friend_list_box>
            
          {response_chat.slice().map((message, i) => (
              <Response_box key={i}>
                {message.text} 
              </Response_box>
            ))}
          </Friend_list_box>
          <FriendSet_main_footer>
            <ChatInputBox />
          </FriendSet_main_footer>
        </Bagpack_main_box>
      </Bagpack_main>
    </div>
  );
}

export default ChatGPT
