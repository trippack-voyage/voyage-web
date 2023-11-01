import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from "styled-components";
import friend_icon from '../../img/friend-icon.png';
import { useParams } from 'react-router-dom';
import CreateTodo from "./Create";

//물품 닫힌 박스
const EssentialItems_closeBox = styled.div`
    background-color: white;
    height: 80px;
    width: 950px;
    border-radius: 15px;
    display: flex;
    margin-top: 15px;
    margin-bottom: 30px;
    border: 1px solid #c1c1c1;
`;

//물품 아이콘 박스
const No_travel_icon_box = styled.div`
    margin: 22px 0 auto 22px;
`;

//물품 아이콘
const No_travel_icon = styled.img`
    width: 35px;
    height: 35px;
`;

//물품 텍스트
const No_travel_text = styled.div`
    margin: 23px auto auto 23px;
    font-size: 25px;
    font-weight: 900;
`;

//물품 버튼
const No_travel_btn = styled.button`
    margin: 25px 20px auto auto;
    font-size: 19px;
    font-weight: 500;
    border: none;
    color: gray;
    background-color: white;
`;

//물품 열린 박스
const ProhibitedItems_openBox = styled.div`
    background-color: white;
    width: 950px;
    border-radius: 15px;
    margin-top: 15px;
    border: 1px solid #c1c1c1;
    margin-bottom: 40px;
`;

//추가 아이템 박스
const ItemContainer = styled.div`
    width: 800px;
    margin: 20px auto;
    display: flex;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 10px;
`;

//요청물품 열린 박스 헤더
const FriendItems_openBox_header = styled.div`
    background-color: white;
    width: 945px;
    border-radius: 15px;
    display: flex;
    margin-bottom: 20px;
`;
//요청물품 열린 박스 메인
const FriendItems_openBox = styled.div`
    background-color: white;
    width: 945px;
    border-radius: 15px;
    margin-top: 15px;
`;

//요청물품 텍스트
const ItemText = styled.div`
    font-size: 25px;
    font-weight: 600;
    color: #1a1919;
    margin-top: 10px;
    margin-left: 30px;
    padding: 10px 0px;
`;

//수락 버튼
const Friend_ok_btn = styled.button`
    margin: 5px 0px 5px auto;
    background-color: white;
    font-size: 20px;
    font-weight: 600;
    border-radius: 15px;
    width: 80px;
    height: 45px;
    border: 2px solid black;
`;

//삭제 버튼
const Friend_pack_delete_btn = styled.button`
    margin: 5px 0px 5px 10px;
    color: white;
    background-color: black;
    font-size: 20px;
    font-weight: 600;
    border-radius: 15px;
    width: 80px;
    height: 45px;
    border: none;
`;
const Friend_haeder_text = styled.div`
    font-size: 19px;
    color: gray;
    margin-bottom: 30px;
    margin-left: 100px;
`;

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
`;

const ItemAddBtn_box = styled.span`
  margin-left: 15px;
`;

const ItemAddBtn = styled.button`
  font-size: 20px;
  margin: auto auto auto 20px;
  color: #FF541E;
  background-color: white;
  border: none;
  font-weight: 600;
`;

interface IList {
    requestId: Number,
    requestedProduct: string,
    isOk: boolean
}

interface InputTextProps {
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
    onSubmit(event: React.FormEvent<HTMLFormElement>): void;
    inputText: string;
}

function FriendItems() {

    const [isOpen_pItem, setIsOpen_pItem] = useState(false);

    function onClick_prohibitedItem(){
        if(isOpen_pItem === false)
            setIsOpen_pItem(true);
        else
            setIsOpen_pItem(false);
    }

    const [friendCode, setFriendCode] = useState([]);
    /*유저코드 조회
    useEffect(()=> {
        axios({
        url: `kakao/find-usercode/${Number(localStorage.getItem("userName"))}`,
        method: 'GET'
    
        }).then((response) => {
            setUserCode(response.data);
            console.log(response.data);
            localStorage.setItem("userCode", userCode);

            for(let i = 0; i < response.data.length; i++){
                setFriendCode(response.data[i].fromUserId);
                console.log(response.data[i].fromUserId);
            }
        }).catch((error) => {
        console.error('AxiosError:', error);
        });
    },[])  */

    //요청물품 목록(구현 완료)
    const [friendItem_list, SetfriendItem_list] = useState<IList[]>([],);       

    useEffect(()=> {
        axios({
          url: '/request/getRequestsByToFriendId',
          method: 'GET',
          params:{
            toFriendId: `${localStorage.getItem("userCode")}`
          }
    
        }).then((response) => {
            console.log(response.data);
            SetfriendItem_list(response.data);
            for(let i = 0; i < response.data.length; i++){
                setFriendCode(response.data[i].fromUserId);
            }
        }).catch((error) => {
          console.error('AxiosError:', error);
        });
    },[])  


    //사용자 조회
    useEffect(()=> {
            axios({
            url: `kakao/find/${Number(friendCode)}`,
            method: 'GET'
        
            }).then((response) => {
                console.log(response.data);
            }).catch((error) => {
            console.error('AxiosError:', error);
            });
    },[])  
    
    //요청 수락(구현 완료)
    const bag_id = useParams().bagId;
    function onClickok(requestedId: Number){
        axios({
            url: `/request/acceptRequest/`,
            method: 'POST',
            params:{
                requestId: Number(requestedId),
            },
        }).then((response) => {
            window.location.replace(`/bagpack/${bag_id}`);
        }).catch((error) => {
            console.error('AxiosError:', error);
        });

    }

    //짐 요청 삭제
    function onClickdelete(requestedId: Number){
        axios({
            url: `/request/deleteRequest/`,
            method: 'POST',
            params:{
                requestId: Number(requestedId),
            },
        }).then((response) => {
            window.location.replace(`/bagpack/${bag_id}`);
        }).catch((error) => {
            console.error('AxiosError:', error);
        });

    }

    //짐 요청 보내기
    const [FriendPack, setFriendPack] = useState("");
    function OnClick_Item() { 

        axios({
            url: `/request/create/`,
            method: 'POST',
            params:{
                fromUserId: `${Number(localStorage.getItem("userCode"))}`,
                toFriendId: '',
                requestedProduct: FriendPack,
            },
        }).then((response) => {
            console.log(response);
            window.location.replace("/bag-list");
        }).catch((error) => {
            console.error('AxiosError:', error);
        });
    }

    return (
        <div>
            {isOpen_pItem ? (
            <ProhibitedItems_openBox>
                <FriendItems_openBox_header>
                    <No_travel_icon_box><No_travel_icon src={friend_icon}></No_travel_icon></No_travel_icon_box>
                    <No_travel_text>요청 물품</No_travel_text>
                    <No_travel_btn onClick={onClick_prohibitedItem}>닫기</No_travel_btn>
                </FriendItems_openBox_header>
                <Friend_haeder_text>친구들이 요청한 물품이에요. 요청을 수락하여 같이 짐을 싸보세요!</Friend_haeder_text>
                <ItemCreateContainer>
                    <ItemInputContainer>
                        <ItemInputBox
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setFriendPack(e.target.value);}}
                            type="text"
                            placeholder="물품을 추가해주세요."
                        />
                        <ItemAddBtn_box>
                            <ItemAddBtn onClick={OnClick_Item}>추가</ItemAddBtn>
                        </ItemAddBtn_box>
                    </ItemInputContainer>
                </ItemCreateContainer>
                <FriendItems_openBox>
                    {friendItem_list.map(function(item,i){
                        return(    
                            <ItemContainer>
                                <ItemText>{item.requestedProduct}</ItemText>
                                {item.isOk? 
                                    (<Friend_ok_btn onClick={() => onClickok(item.requestId)}>수락</Friend_ok_btn>):
                                    (<Friend_ok_btn onClick={() => onClickok(item.requestId)}>요청</Friend_ok_btn>)
                                }
                                <Friend_pack_delete_btn onClick={() => onClickdelete(item.requestId)}>삭제</Friend_pack_delete_btn>
                            </ItemContainer>
                        )
                    })}
                </FriendItems_openBox>
            </ProhibitedItems_openBox>):
            (<EssentialItems_closeBox>
                <No_travel_icon_box><No_travel_icon src={friend_icon}></No_travel_icon></No_travel_icon_box>
                <No_travel_text>요청 물품</No_travel_text>
                <No_travel_btn onClick={onClick_prohibitedItem}>열기</No_travel_btn>
            </EssentialItems_closeBox>)}
        </div>
    );
  }
  
  export default FriendItems;
  