import React from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from "recoil";
import { bagId } from "../../recoil/atoms";

const Side_box = styled.div`
    width: 450px;
    height: 860px;
    border-radius: 20px;
    background-color: white;
    margin: 17px 0px 17px 20px;
    border: 1px solid #c1c1c1;
`;

//친구 박스
const Friend_list_box = styled.div`
    height: 580px;
`;

//친구 리스트 박스
const Friend_inside_box = styled.div`
    border: 2px solid #1a1919;
    font-size: 22px;
    font-weight: 700;
    margin: 20px auto;
    width: 350px;
    padding: 15px;
    border-radius: 15px;
    cursor: pointer;
    text-align: center;
    color: #1a1919;
`;

const Set_box = styled.div`
    margin-top: 100px;
`;

//친구 관리, GPT 박스
const Set_inside_box = styled.div`
    border: 2px solid #1a1919;
    font-size: 22px;
    font-weight: 700;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    width: 350px;
    padding: 15px;
    border-radius: 15px;
    cursor: pointer;
    text-align: center;
    background-color: #1a1919;
    color: white;
`;

function BackpackSide() {

    //아이디 클릭시
    const navigate = useNavigate();
    const bag_id = useRecoilValue(bagId);
    function onClick_main(){
        navigate("/bagpack/" + `${bag_id}`);
    }

    //친구 관리
    function onClick_friendSet(){
        navigate("/friend-set/" + `${bag_id}`);
    }

    //CHAT GPT
    function onClick_chatgpt(){
        navigate("/chat-gpt");
    }

    const user_name = localStorage.getItem("userName");

    return (
        <Side_box>
            <Friend_list_box>
                <Friend_inside_box onClick={onClick_main}>{user_name}</Friend_inside_box>
            </Friend_list_box>
            <Set_box>
                <Set_inside_box onClick={onClick_friendSet}>친구 관리</Set_inside_box>
                <Set_inside_box onClick={onClick_chatgpt}>짐도우미(GPT)</Set_inside_box>
            </Set_box>
        </Side_box>
    );
  }
  
  export default BackpackSide;
  