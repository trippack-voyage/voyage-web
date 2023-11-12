import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from "styled-components";
import friend_icon from '../../img/friend-icon.png';
import { useParams } from 'react-router-dom';
import CreateTodo from "./Create";

//물품 닫힌 박스
const EssentialItems_closeBox = styled.div`
    background-color: ${({ theme }) => theme.headerBackground};
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
    background-color: ${({ theme }) => theme.headerBackground};
`;

//물품 열린 박스
const ProhibitedItems_openBox = styled.div`
    background-color: ${({ theme }) => theme.headerBackground};
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
    background-color: ${({ theme }) => theme.headerBackground};
    width: 945px;
    border-radius: 15px;
    display: flex;
    margin-bottom: 20px;
`;
//요청물품 열린 박스 메인
const FriendItems_openBox = styled.div`
    background-color: ${({ theme }) => theme.headerBackground};
    width: 945px;
    border-radius: 15px;
    margin-top: 15px;
`;

//요청물품 텍스트
const ItemText = styled.div`
    font-size: 25px;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
    margin-top: 10px;
    margin-left: 30px;
    padding: 10px 0px;
`;

//수락 버튼
const Friend_ok_btn = styled.button<{ status: boolean }>`
    margin: 5px 0px 5px auto;
    background-color: white;
    font-size: 20px;
    font-weight: 600;
    border-radius: 15px;
    height: 45px;
    border: 2px solid black;

    width: ${(props) => (props.status ? '80px;' : '105px;')};
`;

//삭제 버튼
const Friend_pack_delete_btn = styled.button`
    margin: 5px 0px 5px 10px;
    color: white;
    background-color: ${({ theme }) => theme.button2};
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
  background-color: ${({ theme }) => theme.headerBackground};
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

//요청자 정보 박스
const FriendItem_info = styled.div`
`;

//요청자 이름
const Friend_name = styled.div`
    font-size: 15px;
`;
interface InputTextProps {
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
    onSubmit(event: React.FormEvent<HTMLFormElement>): void;
    inputText: string;
}

interface IRequest {
  
    requestId: number;
    requestedProduct: string;
    fromUserId: number;
    
   
  // Add other properties as needed
}

interface IList {
    requestId: Number,
    requestedProduct: string,
    isOk: boolean,
    fromUserKakaoNickname: string,
    request: IRequest
}

function FriendItems() {

    //열기, 닫기 상태 변경(구현 완료)
    const [isOpen_pItem, setIsOpen_pItem] = useState(false);
    function onClick_prohibitedItem(){
        if(isOpen_pItem === false)
            setIsOpen_pItem(true);
        else
            setIsOpen_pItem(false);
    }
    
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

    //짐 요청 삭제(구현 완료)
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

    //가방 만든 사람 카카오 정보 조회
    const [user_name, setUser_name] = useState("");
    const [userCode, setUserCode] = useState("");
    useEffect(()=> {
        axios({
            url: `/bag/${Number(bag_id)}`,
            method: 'GET'
    
        }).then((response) => {
            let bagUser = response.data.kakaoId;
            axios({
                url: `/kakao/all-users`,
                method: 'GET'
        
            }).then((response) => {

                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].kakaoId === bagUser){
                        setUser_name(response.data[i].kakaoNickname);
                    }
                }

                axios({
                    url: `kakao/find-usercode/${user_name}`,
                    method: 'GET'
        
                }).then((response) => {
                    setUserCode(response.data);
                    console.log(response.data);
                }).catch((error) => {
                    console.error('AxiosError:', error);
                });

            }).catch((error) => {
                console.error('AxiosError:', error);
            });
        }).catch((error) => {
            console.error('AxiosError:', error);
        });

    },[])

    //사용자 유저코드 조회
    /*const [userCode, setUserCode] = useState("");
    useEffect(() => {
        axios({
            url: `kakao/find-usercode/${"이미지"}`,
            method: 'GET'

        }).then((response) => {
            setUserCode(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.error('AxiosError:', error);
        });
    }, [])*/

    //요청물품 목록 가져오기(구현 완료)
    const [friendItem_list, SetfriendItem_list] = useState<IList[]>([],);       
    useEffect(()=> {
        axios({
            url: '/request/getRequestsByBagId',
            method: 'GET',
            params:{
            bagId: `${Number(bag_id)}`
            }
    
        }).then((response) => {
            console.log(response.data);
            SetfriendItem_list(response.data);
        }).catch((error) => {
            console.error('AxiosError:', error);
        });
    },[]) 

    const [requestCode, setRequestCode] = useState(0);
    useEffect(()=> {
        axios({
            url: `/kakao/find-usercode/${String(user_name)}`,
            method: 'GET'
    
        }).then((response) => {            
            //console.log(response.data);
            setRequestCode(response.data);
        }).catch((error) => {
            console.error('AxiosError:', error);
        });

    },[])

    //짐 요청 보내기
    const [FriendPack, setFriendPack] = useState("");
    function OnClick_Item() { 
        axios({
            url: `/request/create/`,
            method: 'POST',
            params:{
                fromUserId: `${Number(localStorage.getItem("userCode"))}`,
                toFriendId: `${Number(requestCode)}`,
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
                                <FriendItem_info>
                                    <Friend_name>{item.fromUserKakaoNickname}</Friend_name>
                                    <ItemText>{item.request.requestedProduct}</ItemText>
                                </FriendItem_info>
                                {item.isOk? 
                                    (<Friend_ok_btn  status={item.isOk} onClick={() => onClickok(item.requestId)}>수락</Friend_ok_btn>):
                                    (<Friend_ok_btn status={item.isOk} onClick={() => onClickok(item.requestId)}>수락완료</Friend_ok_btn>)
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
  