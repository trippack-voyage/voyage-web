import React, {useState} from 'react';
import styled from "styled-components";
import plus_icon from '../../img/plus-icon.png';
import ItemList from './ItemList';

//물품 닫힌 박스
const EssentialItems_closeBox = styled.div`
    background-color: white;
    height: 80px;
    width: 950px;
    border-radius: 15px;
    display: flex;
    margin-top: 15px;
    border: 1px solid #c1c1c1;
`;

const ProhibitedItems_openBox_header = styled.div`
    display: flex;
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
    margin: 25px auto auto 23px;
    font-size: 25px;
    font-weight: 900;
`;

//열림, 닫힘 버튼
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
`;

//추가 물품 입력
const AddItems_input = styled.input`
    width: 750px;
    height: 20px;
    border-radius: 8px;
    display: flex;
    margin: 20px auto 0px 80px;
    font-size: 22px;
    padding: 20px;
`;

function AddItems() {

    const [isOpen_pItem, setIsOpen_pItem] = useState(false);

    function onClick_prohibitedItem(){
        if(isOpen_pItem === false)
            setIsOpen_pItem(true);
        else
            setIsOpen_pItem(false);
    }
    return (
        <div>
            {isOpen_pItem ? (
            <ProhibitedItems_openBox>
                <ProhibitedItems_openBox_header>
                    <No_travel_icon_box><No_travel_icon src={plus_icon}></No_travel_icon></No_travel_icon_box>
                    <No_travel_text>추가 물품</No_travel_text>
                    <No_travel_btn onClick={onClick_prohibitedItem}>닫기</No_travel_btn>
                </ProhibitedItems_openBox_header>
                <ItemList></ItemList>
            </ProhibitedItems_openBox>):
            (<EssentialItems_closeBox>
                <No_travel_icon_box><No_travel_icon src={plus_icon}></No_travel_icon></No_travel_icon_box>
                <No_travel_text>추가 물품</No_travel_text>
                <No_travel_btn onClick={onClick_prohibitedItem}>열기</No_travel_btn>
            </EssentialItems_closeBox>)}
        </div>
    );
  }
  
  export default AddItems;
  