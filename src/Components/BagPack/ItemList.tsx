import { useState, useEffect } from "react";
import CreateTodo from "./Create";
import axios from 'axios';
import { useParams } from "react-router-dom";
import styled from 'styled-components';

//아이콘
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

export interface PList {
  packId: number;
  packName: string;
  completed: boolean;
  isRequired: boolean;
}

export default function ItemList() {
  const [inputText, setInputText] = useState("");
  const [todoList, setTodoList] = useState<PList[]>([]);

  const [editingStates, setEditingStates] = useState<{ [packId: number]: boolean }>({});
  const [completionStates, setCompletionStates] = useState<{ [packId: number]: boolean }>({});

  // 입력값 변경내용 확인
  const textTypingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  // 입력 확인
  const textInputHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const newTodo: PList = {
      packName: inputText,
      isRequired: false,
      completed: false,
      packId: 0
    };
    setTodoList([...todoList, newTodo]);
    setInputText("");
  };

   // 수정 모드로 전환하는 함수
   const enterEditMode = (packId: number) => {
    setEditingStates({
      ...editingStates,
      [packId]: true,
    });
  };


  // 값 삭제하기
  const onClickDelete = (packid: number) => {
    axios.delete(`/pack/${packid}`, {
    })
      .then(function (response) {
        console.log(response);

        setPackList((prevPackList) => prevPackList.filter(item => item.packId !== packid));
      })
      .catch(function (error) {
        console.log(error);
      })
  };

  // 값 수정하기
  const [updatedText, setUpdatedText] = useState<string>();
  const updateHandler = (packid: number): void => {
    axios({
      url: `/pack/${packid}`,
      method: 'PUT',
      data: {
        packName: updatedText,
        isRequired: false,
        completed: false
      },
    }).then((response) => {
      console.log(response.data);

      setPackList((prevPackList) =>
        prevPackList.map(item => {
          if (item.packId === packid) {
            return { ...item, packName: updatedText || item.packName };
          }
          return item;
        })
      );
      // 특정 항목에 대한 수정 모드 종료
      setEditingStates({
        ...editingStates,
        [packid]: false,
      });

    }).catch((error) => {
      console.error('AxiosError:', error);
    });
    //setIsUpdating(false);
  };

  
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const handleFormSubmit = () => {
    setIsUpdating(false);
  };

  //추가물품 가져오기
  const [packList, setPackList] = useState<PList[]>([]);
  const bag_id = useParams().bagId;

  useEffect(() => {
    axios({
      url: `/pack/list/${bag_id}`,
      method: 'GET',

    }).then((response) => {
      console.log(response.data);
      setPackList(response.data);
    }).catch((error) => {
      console.error('AxiosError:', error);
    });
  }, [])

  //체크 상태 변경
  const [isCompleted, setIsCompleted] = useState(false);
  const handleComplete = () => {

    if (isCompleted === false)
      setIsCompleted(true);
    else
      setIsCompleted(false);
  };

  return (
    <div className="todoListContainer">
      <CreateTodo
        onChange={textTypingHandler}
        onSubmit={textInputHandler}
        inputText={inputText}
      />
      {packList.map(function (item, i) {
        return (
          <div>
            {item.isRequired == false ? (
            <div key={item.packId}>
              { !editingStates[item.packId] ? (  // 수정 모드 상태 확인
                <ItemContainer>
                  <CompleteBtn
                    className={completionStates[item.packId] ? " checked" : ""}
                    onClick={() => {
                      // Toggle the completion state for this item
                      setCompletionStates({
                        ...completionStates,
                        [item.packId]: !completionStates[item.packId],
                      });
                    }}
                  ></CompleteBtn>
                  <ItemText
                    style={item.completed ? { textDecoration: "line-through" } : undefined}>
                    {item.packName}
                  </ItemText>
                  <ButtonContainer>
                    <InlineBtnBox onClick={() => {
                      enterEditMode(item.packId);
                    }}>
                      <HiOutlinePencilSquare size="28" />
                    </InlineBtnBox>
                    <InlineBtnBox onClick={() => onClickDelete(item.packId)}>
                      <BsTrash size="28" />
                    </InlineBtnBox>
                  </ButtonContainer>
                </ItemContainer>)
                : (<ItemContainer>
                  <CompleteBtn
                    className={isCompleted ? " checked" : ""}
                    onClick={handleComplete}>
                  </CompleteBtn>
                  <ItemUpdateForm onSubmit={handleFormSubmit}>
                    <ItemTextUpdateInput
                      placeholder={`${item.packName}`}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setUpdatedText(e.target.value); }}
                    />
                    <ButtonContainer>
                      <InlineBtnBox type="button" onClick={() => updateHandler(item.packId)}>
                        <BsCheckLg size="30" />
                      </InlineBtnBox>
                      <InlineBtnBox onClick={() => {
                        // 특정 항목에 대한 수정 모드 종료
                        setEditingStates({ ...editingStates, [item.packId]: false });
                      }}>
                        <IoClose size="30" />
                      </InlineBtnBox>
                    </ButtonContainer>
                  </ItemUpdateForm>
                </ItemContainer>)}
            </div>) : (<div></div>)}
          </div>
        )
      }
      )}
    </div>
  );
}