import React, {useState} from 'react';
import styled from "styled-components";
import no_travel_icon from '../../img/icon-no-travelling.png';

//물품 닫힌 박스
const EssentialItems_closeBox = styled.div`
    background-color: ${({ theme }) => theme.headerBackground};
    height: 80px;
    width: 950px;
    border-radius: 15px;
    display: flex;
    margin-top: 15px;
    border: 1px solid #c1c1c1;
`;

//물품 아이콘 박스
const No_travel_icon_box = styled.div`
    margin: 20px 0 auto 20px;
`;

//물품 아이콘
const No_travel_icon = styled.img`
    width: 40px;
    height: 40px;
`;

//물품 텍스트
const No_travel_text = styled.div`
    margin: 25px auto auto 23px;
    font-size: 25px;
    font-weight: 900;
    color: ${({ theme }) => theme.text};
`;

//물품 열기 버튼
const No_travel_btn = styled.button`
    margin: auto 20px 25px auto;
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
    color: #1a1919;
`;

const ProhibitedItems_openBox_header = styled.div`
    display: flex;
`;

//필수 물품 리스트
const Open_box_main = styled.div`
    margin-top: 20px; 
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const Item_listBox = styled.div`

`;

//위탁수하물 물품 박스
const Item_box = styled.div`
    border-bottom: 2px solid #f2f2f2;
    margin-bottom: 20px;
    margin-left: 70px;
    padding-bottom: 25px;
`;

//위탁수하물 금지물품 아이콘
const Item_icon_box = styled.div`
    display: flex;
    margin-left: 10px;
`;

const Item_icon = styled.img`
    display: flex;
    width: 50px;
    height: 50px;
`;


//위탁수하물 금지물품 텍스트
const Item_icon_text = styled.span`
    font-size: 20px;
    font-weight: 600;
    display: flex;
    margin: auto auto auto 10px;
    color: ${({ theme }) => theme.list1};
`;

//위탁수하물 금지물품 상세텍스트
const Item_icon_txt = styled.span`
    font-size: 19px;
    display: flex;
    margin: auto auto auto 70px;
    color: gray;
`;

//닫기 버튼
const No_travel_close_btn = styled.div`
    margin: 20px 5px 25px auto;
    border: none;
    padding-bottom: 20px;
    font-size: 19px;
    font-weight: 500;
    color: gray;
    background-color: ${({ theme }) => theme.headerBackground};
    width: 100px;
    border-radius: 20px;
    cursor: pointer;
    text-align: center;
`;

function ProhibitedItems() {

    //박스 열림 상태
    const [isOpen_pItem, setIsOpen_pItem] = useState(false);

    function onClick_prohibitedItem(){
        if(isOpen_pItem === false)
            setIsOpen_pItem(true);
        else
            setIsOpen_pItem(false);
    }

    const prohibitedItem_img 
    = ["https://www.koreanair.com/content/dam/koreanair/ko/airport/baggage/restricted-items/checked/ap-limit-goods-icon-broken-m.png",
        "https://www.koreanair.com/content/dam/koreanair/ko/airport/baggage/restricted-items/checked/ap-limit-goods-icon-money-m.png",
        "https://www.koreanair.com/content/dam/koreanair/ko/airport/baggage/restricted-items/checked/ap-limit-goods-icon-battery-m.png",
        "https://www.koreanair.com/content/dam/koreanair/ko/airport/baggage/restricted-items/checked/ap-limit-goods-icon-battery-m.png"];
    const prohibitedItem_title 
    = ["파손 또는 손상되기 쉬운 물품", 
        "고가품 및 귀중품",
        "여객기로 운송 가능한 휴대용 전자기기의 보조/여분 배터리는 휴대만 가능",
        "보조/여분 리튬배터리"];

    const prohibitedItem_list = [
        "도자기, 액자, 유리제품 등", 
        "화폐, 보석, 현금, 유가증권, 견본, 서류, 전자제품 등",
        "예) 니켈수소, 니켈카드뮴, 알카라인, 망간 등", 
        "배터리 용량이 160Wh 이하이며 단락 방지 포장된 여분/보조 배터리"];
      
    return (
        <div>
            {isOpen_pItem ? (
            <ProhibitedItems_openBox>
                <ProhibitedItems_openBox_header>
                    <No_travel_icon_box><No_travel_icon src={no_travel_icon }></No_travel_icon></No_travel_icon_box>
                    <No_travel_text>위탁수하물 금지 물품</No_travel_text>
                </ProhibitedItems_openBox_header>  
                <Open_box_main>
                    <Item_listBox>
                        {prohibitedItem_list.map(function(a,i){
                        return(
                            <Item_box>
                                <Item_icon_box>
                                    <Item_icon src={prohibitedItem_img[i]}></Item_icon>
                                    <Item_icon_text>{prohibitedItem_title[i]}</Item_icon_text>
                                </Item_icon_box>
                                <Item_icon_txt>{prohibitedItem_list[i]}</Item_icon_txt>
                            </Item_box>)
                        })}
                    </Item_listBox>
                </Open_box_main>
                <No_travel_close_btn onClick={onClick_prohibitedItem}>닫기</No_travel_close_btn> 
            </ProhibitedItems_openBox>):
            (<EssentialItems_closeBox>
                <No_travel_icon_box><No_travel_icon src={no_travel_icon }></No_travel_icon></No_travel_icon_box>
                <No_travel_text>위탁수하물 금지 물품</No_travel_text>
                <No_travel_btn onClick={onClick_prohibitedItem}>열기</No_travel_btn>
            </EssentialItems_closeBox>)}
        </div>
    );
  }

  export default ProhibitedItems;
  