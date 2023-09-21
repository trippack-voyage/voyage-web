import React, {useState} from 'react';
import styled from "styled-components";
import no_travel_icon from '../../img/icon-no-travelling.png';

//기내 금지 물품 닫힌 박스
const ProhibitedItems_closeBox = styled.div`
    background-color: white;
    height: 80px;
    width: 950px;
    border-radius: 15px;
    display: flex;
`;

//기내 금지 물품 아이콘 박스
const No_travel_icon_box = styled.div`
    margin: 15px 0 auto 15px;
`;

//기내 금지 물품 아이콘
const No_travel_icon = styled.img`
    width: 50px;
    height: 50px;
`;

//기내 금지 물품 텍스트
const No_travel_text = styled.div`
    margin: 20px auto auto 20px;
    font-size: 30px;
    font-weight: 900;
`;

//기내 금지 물품 버튼
const No_travel_btn = styled.button`
    margin: auto 20px 25px auto;
    font-size: 20px;
    font-weight: 500;
    border: none;
    color: gray;
    background-color: white;
`;

//기내 금지 물품 열린 박스
const ProhibitedItems_openBox = styled.div`
    background-color: white;
    height: 500px;
    width: 950px;
    border-radius: 15px;
    display: flex;
`;

function ProhibitedItems() {

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
                <No_travel_icon_box><No_travel_icon src={no_travel_icon}></No_travel_icon></No_travel_icon_box>
                <No_travel_text>기내 금지 물품</No_travel_text>
                <No_travel_btn onClick={onClick_prohibitedItem}>닫기</No_travel_btn>
            </ProhibitedItems_openBox>):
            (<ProhibitedItems_closeBox>
                <No_travel_icon_box><No_travel_icon src={no_travel_icon}></No_travel_icon></No_travel_icon_box>
                <No_travel_text>기내 금지 물품</No_travel_text>
                <No_travel_btn onClick={onClick_prohibitedItem}>열기</No_travel_btn>
            </ProhibitedItems_closeBox>)}
        </div>
    );
  }
  
  export default ProhibitedItems;
  