import React, {useState} from 'react';
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import BagPackSide from '../Components/BagPack/BagPackSide';
import { useNavigate } from 'react-router-dom';
import {IoArrowBack} from "react-icons/io5";
import ChatInputBox from '../Components/BagPack/ChatGPT/InputBox';

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
    flex-direction: row;
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

//친구 삭제 버튼
const Friend_delete_btn = styled.button`
    border: 1px solid black;
    width: 300px;
    height: 60px;
    font-size: 22px;
    font-weight: 700;
    margin: auto 0 auto auto;
    border-radius: 20px;
    border: none;
    background-color: #1a1919;
    color: white;
`;

//친구 추가 버튼
const Friend_add_btn = styled.button`
    border: 1px solid black;
    width: 300px;
    height: 60px;
    font-size: 22px;
    font-weight: 700;
    margin-left: 20px;
    border-radius: 20px;
    border: none;
    background-color: #1a1919;
    color: white;
`;

//프로필
const Prifile_box = styled.div`
    margin-right: 40px;
    height: 170px;
    border: 3px solid #FF541E;
    box-shadow: rgba(245, 105, 60, 0.18) 0px 0px 15px;
    border-radius: 10px;
    padding: 10px 20px;

    &.active{
        border: none;
        box-shadow: none;
    }
`;

const Profile_img = styled.div`
    background-color: lightgray;
    width: 100px;
    height: 100px;
    border-radius: 60px;
`;

const Profile_name = styled.div`
    margin-top: 20px;
    font-size: 20px;
    font-weight: 500;
    text-align: center;
`;

function FriendSet() {

    function onClick_deleteBtn(){
        alert("친구가 삭제되었습니다.");
    }

    function onClick_addBtn(){
        alert("링크가 복사되었습니다.");
    }

    const [friend_list, setFriend_list] = useState([1, 2, 3, 4, 5]);
    const [friend_state, setFriend_state] = useState([false, false, false]);

    let [btnActive, setBtnActive] = useState();

    const toggleActive = (e:any) => {
        let copy = [...friend_state];

        if(copy[e] == false)
            copy[e] = true;
        else
            copy[e] = false;

        setFriend_state(copy);
    };

    const navi = useNavigate();
    function onClickBack(){
        navi("/bag-list");
    }

    return (
        <div>
            <GlobalStyle/>
            <Bagpack_main>
                <BagPackSide/>
                <Bagpack_main_box>
                    <IoArrowBack size="50" onClick={onClickBack}/>
                    <Bagpack_main_header>짐 도우미(GPT)</Bagpack_main_header>
                    <Bagpack_main_text>짐 도우미(GPT)를 이용해 짐을 쌀 때 필요한 정보를 얻어보세요!</Bagpack_main_text>
                    <Friend_list_box>

                    </Friend_list_box>
                    <FriendSet_main_footer>
                        <ChatInputBox></ChatInputBox>
                    </FriendSet_main_footer>
                </Bagpack_main_box>
            </Bagpack_main>
        </div>
    );
  }
  
  export default FriendSet;
  