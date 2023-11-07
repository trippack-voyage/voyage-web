import React, { useState, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useRecoilState } from "recoil";
import { chat_response } from "../../../recoil/atoms";
import styled from "styled-components";
import axios from 'axios';

const ItemCreateContainer = styled.div`
  padding: 1px 5px;
`;

const ItemInputContainer = styled.div`
  border: 3px solid #FF541E;
  box-shadow: rgba(245, 105, 60, 0.18) 0px 0px 15px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.button};
`;

const ItemInputBox = styled.input`
  width: 895px;
  height: 70px;
  font-size: 19px;
  padding: 2px 20px;
  border: none;
  border-radius: 12px;
  outline: none;
  background-color: ${({ theme }) => theme.button};

`;

const ItemAddBtn_box = styled.span`
  margin-left: 15px;
`;

const ItemAddBtn = styled.button`
  font-size: 20px;
  margin: auto 10px auto 20px;
  color: #FF541E;
  background-color: ${({ theme }) => theme.button};
  border: none;
  font-weight: 700;
`;
interface InputBoxProps {
    inputValue: string;
    setInputValue: Dispatch<SetStateAction<string>>;
    onClickChat: () => void;
  }

  export default function InputBox({ inputValue, setInputValue, onClickChat }: InputBoxProps) {
    const [responseText, setResponseText] = useRecoilState(chat_response); // API 응답을 저장하는 상태

    const handleClickChat = async () => {
        axios({
            url: '/chat-gpt/question',
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({
                question: inputValue
            })
        }).then(function (response) {
            // API 응답에서 "text"를 추출하여 상태로 업데이트
            const apiResponse = response.data;
            if (apiResponse.choices && apiResponse.choices[0] && apiResponse.choices[0].text) {
                setResponseText(apiResponse.choices[0].text);
            }
        }).catch(function (error) {
            console.error(error);
        });
    };

    return (
        <ItemCreateContainer>
            <ItemInputContainer>
                <ItemInputBox
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                    type="text"
                    placeholder="짐 도우미(GPT)에게 질문해보세요!"
                />
                <ItemAddBtn_box>
                    <ItemAddBtn onClick={onClickChat}>전송</ItemAddBtn>
                </ItemAddBtn_box>
            </ItemInputContainer>
        </ItemCreateContainer>
    );
}

