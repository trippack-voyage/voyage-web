import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import BagPackSide from '../Components/BagPack/BagPackSide';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import ChatInputBox from '../Components/BagPack/ChatGPT/InputBox';
import axios from 'axios';

//recoil
import { chat_response } from '../recoil/atoms';
import { useRecoilValue } from 'recoil';

export const GlobalStyle = createGlobalStyle`
    #root,
    html,
    body {
        width: 100%;
        background-color: ${({ theme }) => theme.body};
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
    background-color: ${({ theme }) => theme.button};
    border-radius: 20px;
    padding: 20px;
    border: 1px solid #c1c1c1;
    overflow-y: auto;  // overflow-y를 auto로 수정
    max-height: 450px;  /* 최대 높이 설정 */
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

// 질문 스타일
const QuestionBox = styled.div`
    color: White; 
    padding: 20px 30px;
    font-size: 20px;
    word-break: break-all;
    line-height: 30px;
    background-color: #000000;
    border-radius: 12px;
    padding: 10px;
    max-width: 50%;
    margin-left: auto; // 오른쪽 정렬
    margin-bottom: 20px;
`;

// 응답 스타일
const ResponseBox = styled.div`
    color: White; 
    padding: 20px 30px;
    font-size: 20px;
    word-break: break-all;
    line-height: 30px;
    background-color: #FF541E; // 응답의 색상
    border-radius: 12px;
    padding: 10px;
    max-width: 50%;
    margin-right: auto;
    margin-bottom: 20px;
`


function ChatGPT() {

  //메인 이동
  const navi = useNavigate();
  function onClickBack() {
    navi("/bag-list");
  }



  const [response_chat, setResponse_chat] = useState<{ text: string, isUser: boolean }[]>([]);
  const [inputValue, setInputValue] = useState(""); // 추가
  const chat_res = useRecoilValue(chat_response);


  useEffect(() => {
    // 새로운 응답을 질문과 응답 객체로 나누어 추가
    if (chat_res.text) {
      setResponse_chat((prevChat) => [
        ...prevChat,
        { text: chat_res.text, isUser: false },  // GPT 응답
        { text: inputValue, isUser: true },  // 사용자 질문
      ]);
    }
  }, [chat_res])

  const onClickChat = async () => {
    if (inputValue) {
      // 질문을 보낼 때 응답 객체에도 저장
      setResponse_chat((prevChat) => [
        ...prevChat,
        { text: inputValue, isUser: true },
      ]);


      // axios로 질문 보내고 응답 받기
      try {
        const response = await axios.post('/chat-gpt/question', {
          question: inputValue,
        });
        console.log(response.data);

        if (response.data && response.data.choices && response.data.choices[0]) {
          const choicesText = response.data.choices.map((choice: { text: string }) => choice.text).join(', ');

          setResponse_chat((prevChat) => [
            ...prevChat,
            { text: choicesText, isUser: false }, // choices text 출력
          ]);
        }
      } catch (error) {
        console.error(error);
      }
      setInputValue(""); // 입력값 초기화
    }
  };

  
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
              // 조건에 따라 질문과 응답 스타일을 다르게 적용
              message.isUser ? (
                <QuestionBox key={i}>User: {message.text}</QuestionBox>
              ) : (
                <ResponseBox key={i}>AI: {message.text} </ResponseBox>
              )
            ))}
          </Friend_list_box>
          <FriendSet_main_footer>
            <ChatInputBox inputValue={inputValue} setInputValue={setInputValue} onClickChat={onClickChat} />
          </FriendSet_main_footer>
        </Bagpack_main_box>
      </Bagpack_main>
    </div>
  );
}

export default ChatGPT