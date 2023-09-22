import React from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const Side_box = styled.div`
    width: 450px;
    height: 770px;
    border-radius: 20px;
    background-color: white;
    margin: 17px 0px 17px 20px;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.25);
`;

//친구 박스
const Friend_list_box = styled.div`
    height: 580px;
`;

//친구 리스트 박스
const Friend_inside_box = styled.div`
    border: 2px solid black;
    font-size: 22px;
    font-weight: 700;
    margin: 20px auto;
    width: 350px;
    padding: 15px;
    border-radius: 15px;
    cursor: pointer;
    text-align: center;
`;

const Set_box = styled.div`
    margin-top: 20px;
`;

//친구 관리, GPT 박스
const Set_inside_box = styled.div`
    border: 2px solid black;
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
`;

function BackpackSide() {

    //main 클릭시
    const navigate = useNavigate();
    function onClick_main(){
        navigate("/main");
    }

    function onClick_friendSet(){
        navigate("/friend-set");
    }

    return (
        <Side_box>
            <Friend_list_box>
                <Friend_inside_box onClick={onClick_main}>Main</Friend_inside_box>
            </Friend_list_box>
            <Set_box>
                <Set_inside_box onClick={onClick_friendSet}>친구 관리</Set_inside_box>
                <Set_inside_box>짐도우미(GPT)</Set_inside_box>
            </Set_box>
        </Side_box>
    );
  }
  
  export default BackpackSide;
  