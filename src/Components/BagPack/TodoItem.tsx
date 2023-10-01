import { useState } from "react";
import styled from "styled-components";
import { TList } from "./ItemList";
import {
  HiOutlinePencilSquare
} from "react-icons/hi2";

import {
  BsTrash
} from "react-icons/bs";

import {
  BsCheckLg
} from "react-icons/bs";


import {
  IoClose
} from "react-icons/io5";

//추가 아이템 박스
const ItemContainer = styled.div`
  width: 800px;
  margin: 20px auto;
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;
`;

//체크 버튼
const CompleteBtn = styled.button`
    appearance: none;
    border-radius: 10px;
    background-color: #e0e0e0;
    width: 35px;
    height: 35px;
    border: none;
    margin-top: 5px;
    margin-left: 10px;

    &.checked {
        border-color: transparent;
        background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
        background-size: 100% 100%;
        background-position: 50%;
        background-color: #1a1919;
    }
`;

//추가 아이템 텍스트
const ItemText = styled.div`
  font-size: 25px;
  font-weight: 600;
  color: #1a1919;
  margin-top: 10px;
  margin-left: 30px;
`;

//수정, 삭제버튼 컨테이너
const ButtonContainer = styled.div`
  margin-left: auto;
  margin-right: 5px;
`;

//수정, 삭제 버튼
const InlineBtnBox = styled.button`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border: none;
  background-color: white;
`;

const ItemUpdateForm = styled.form`
  width: 730px;
  display: flex;
  margin-left: 28px;
`;

//수정 입력 창
const ItemTextUpdateInput = styled.input`
  font-size: 25px;
  font-weight: 600;
  color: #1a1919;
  margin-bottom: 5px;
  border: none;
  outline: none;
`;

interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  onClickDelete(id: number): void;
  onClickUpdate(updatedTodoItem: TList): void;
}

export default function TodoItem({
  id,
  text,
  completed,
  onClickDelete,
  onClickUpdate,
}: TodoItemProps) {
  
  // 수정여부
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updatedText, setUpdatedText] = useState<string>(text);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedText(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedTodoItem = {
      id: id,
      text: updatedText,
      completed: completed,
    };
    onClickUpdate(updatedTodoItem);
    setIsUpdating(false);
  };

  const handleComplete = () => {
    const updatedTodoItem = {
      id: id,
      text: text,
      completed: !completed,
    };
    onClickUpdate(updatedTodoItem);
  };

  return (
    <div>
      {!isUpdating ? (
        <ItemContainer>
          <CompleteBtn 
            className={completed ? " checked" : ""}
            onClick={handleComplete}>
          </CompleteBtn>
          <ItemText
            style={completed ? { textDecoration: "line-through" } : undefined}>
            {text}
          </ItemText>
          <ButtonContainer>
              <InlineBtnBox onClick={() => setIsUpdating(true)} >
                <HiOutlinePencilSquare size="28" />
              </InlineBtnBox>
              <InlineBtnBox onClick={() => onClickDelete(id)}>
                <BsTrash size="28" />
              </InlineBtnBox>
          </ButtonContainer>
        </ItemContainer>
      ) : (
        <ItemContainer>
          <CompleteBtn 
            className={completed ? " checked" : ""}
            onClick={handleComplete}>
          </CompleteBtn>
          <ItemUpdateForm onSubmit={handleFormSubmit}>
            <ItemTextUpdateInput
              value={updatedText}
              onChange={handleInputChange}
            />
            <ButtonContainer>
              <InlineBtnBox type="submit">
                <BsCheckLg size="30" />
              </InlineBtnBox>
              <InlineBtnBox onClick={() => setIsUpdating(false)}>
                <IoClose size="30" />
              </InlineBtnBox>
            </ButtonContainer>
          </ItemUpdateForm>
        </ItemContainer>
      )}
    </div>
  );
}