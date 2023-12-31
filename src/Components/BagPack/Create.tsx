import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ItemCreateContainer = styled.div`
  padding: 30px 70px;
`;

const ItemInputContainer = styled.div`
  border: 3px solid #FF541E;
  box-shadow: rgba(245, 105, 60, 0.18) 0px 0px 15px;
  border-radius: 12px;
`;

const ItemInputBox = styled.input`
  width: 700px;
  height: 70px;
  font-size: 22px;
  padding: 25px;
  border: none;
  border-radius: 12px;
  outline: none;
  background-color: ${({ theme }) => theme.headerBackground};
  color: ${({ theme }) => theme.text};
`;

const ItemAddBtn_box = styled.span`
  margin-left: 15px;
`;

const ItemAddBtn = styled.button`
  font-size: 20px;
  margin: auto auto auto 20px;
  color: #FF541E;
  background-color: ${({ theme }) => theme.headerBackground};
  border: none;
  font-weight: 600;
`;

interface InputTextProps {
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onSubmit(event: React.FormEvent<HTMLFormElement>): void;
  inputText: string;
}

export default function Create({
  onChange,
  onSubmit,
  inputText,
}: InputTextProps) {
  const [formData, setFormData] = useState({
    bagId: 0,
    isRequired: false,
    packName: '',
    completed: false,
  });

  //추가물품 추가(구현 완료)
  const bag_id = useParams().bagId;
  function OnClick_Item() {
    const data = {
      bagId: `${Number(bag_id)}`,
      isRequired: formData.isRequired,
      packName: formData.packName,
      completed: false
    };

    // Axios를 사용하여 POST 요청 보내기
    axios
      .post('/pack', data)
      .then((response) => {
        console.log('서버 응답:', response);
        window.location.replace(`/bagpack/${bag_id}`);
      })
      .catch((error) => {
        console.error('Axios 에러:', error);
      });
  }

  return (
    <ItemCreateContainer>
      <form onSubmit={(event) => onSubmit(event)}>
        <ItemInputContainer>
          <ItemInputBox
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFormData({ ...formData, packName: e.target.value });
              onChange(e);
            }}
            type="text"
            placeholder="물품을 추가해주세요."
            value={inputText}
          />
          <ItemAddBtn_box>
            <ItemAddBtn type="submit" onClick={OnClick_Item}>
              추가
            </ItemAddBtn>
          </ItemAddBtn_box>
        </ItemInputContainer>
      </form>
    </ItemCreateContainer>
  );
}