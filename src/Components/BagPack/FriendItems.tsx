import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from "styled-components";
import friend_icon from '../../img/friend-icon.png';


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
    display: flex;
    margin-top: 15px;
    border: 1px solid #c1c1c1;
`;

function FriendItems() {

    const [isOpen_pItem, setIsOpen_pItem] = useState(false);

    function onClick_prohibitedItem(){
        if(isOpen_pItem === false)
            setIsOpen_pItem(true);
        else
            setIsOpen_pItem(false);
    }

    interface IList {
        requestedProdect: string,
        isOk: boolean
      }

    //유저코드 조회
    const [toFriendId, setUserCode] = useState("");
    useEffect(()=> {
        axios({
          url: `kakao/${localStorage.getItem("kakaoId")}`,
          method: 'GET'
    
        }).then((response) => {
          setUserCode(response.data);
          console.log(response.data);
        }).catch((error) => {
          console.error('AxiosError:', error);
        });
    },[]) 

    //요청물품 목록
    const [item_list , SetItem_list] = useState<IList[]>([],);       

    useEffect(()=> {
        axios({
          url: '/request/getRequestsByToFriendId',
          method: 'GET',
          params:{
            toFriendId: `${toFriendId}`
          }
    
        }).then((response) => {
          console.log(response.data);
          SetItem_list(response.data);
        }).catch((error) => {
          console.error('AxiosError:', error);
        });
      },[])  
    

    return (
        <div>
            {isOpen_pItem ? (
            <ProhibitedItems_openBox>
                <No_travel_icon_box><No_travel_icon src={friend_icon}></No_travel_icon></No_travel_icon_box>
                <No_travel_text>요청 물품</No_travel_text>
                <No_travel_btn onClick={onClick_prohibitedItem}>닫기</No_travel_btn>
                {item_list.map(function(a,i){
                            return(    
                                <div>{a.requestedProdect} {a.isOk}</div>
                            )
                        })}
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
  