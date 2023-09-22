import React, {useState} from 'react';
import styled from "styled-components";
import suitcase_icon from '../../img/suitcases-icon.png';

//물품 닫힌 박스
const EssentialItems_closeBox = styled.div`
    background-color: white;
    height: 80px;
    width: 950px;
    border-radius: 15px;
    display: flex;
    margin-top: 15px;
`;

//물품 아이콘 박스
const No_travel_icon_box = styled.div`
    margin: 15px 0 auto 15px;
`;

//물품 아이콘
const No_travel_icon = styled.img`
    width: 50px;
    height: 50px;
`;

//물품 텍스트
const No_travel_text = styled.div`
    margin: 23px auto auto 23px;
    font-size: 30px;
    font-weight: 900;
`;

//물품 열기 버튼
const No_travel_btn = styled.button`
    margin: auto 20px 25px auto;
    font-size: 20px;
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
    border: 2px solid black;
    width: 250px;
    height: 70px;
    margin: 10px auto;
    display: flex;
    border-radius: 20px;
`;

const Item_name = styled.div`
    font-size: 25px;
    margin: auto 0 auto 25px;
    width: 150px;
    text-align: left;
`;

const CheckBox = styled.input`
    appearance: none;
    margin: auto auto auto 20px;
    border-radius: 10px;
    background-color: #E6E6E6;
    width: 35px;
    height: 35px;

    &:checked {
        border-color: transparent;
        background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
        background-size: 100% 100%;
        background-position: 50%;
        background-color: #fcaf85;
    }
`;

//닫기 버튼
const No_travel_close_btn = styled.div`
    margin: 20px 5px 25px auto;
    border: none;
    padding-bottom: 20px;
    font-size: 20px;
    font-weight: 500;
    color: gray;
    background-color: white;
    width: 100px;
    border-radius: 20px;
    cursor: pointer;
    text-align: center;
`;

function EssentialItems() {

    //박스 열림 상태
    const [isOpen_pItem, setIsOpen_pItem] = useState(false);

    function onClick_prohibitedItem(){
        if(isOpen_pItem === false)
            setIsOpen_pItem(true);
        else
            setIsOpen_pItem(false);
    }

    //체크 된 필수 용품
    const [checkItems, setCheckItems] = useState(new Set)
    const checkItemHandler = (id:any, isChecked:any) => {
        if (isChecked) {
          checkItems.add(id) 
          setCheckItems(checkItems)
        } else if (!isChecked) {
          checkItems.delete(id)
          setCheckItems(checkItems)
        }
        console.log(checkItems);
    }
      

    //필수 용품 리스트
    const [essenitem_list, setEssentitem_list] = useState([
        "여권", "E-ticket", "지갑", "충전기", "보조배터리", "USIM", "멀티탭", "카메라", "양치도구",
        "세안용품", "샤워용품", "스킨케어", "화장품", "선크림",
        "면도기", "고데기", "헤어롤", "속옷", "의류", "양말", "수영복", "우산, 우비", 
        "안경, 렌즈", "선글라스", "신발, 슬리퍼", "악세사리", "머리끈", "비상약", "물티슈", "여성용품"]);

    return (
        <div>
            {isOpen_pItem ? (
            <ProhibitedItems_openBox>
                <ProhibitedItems_openBox_header>
                    <No_travel_icon_box><No_travel_icon src={suitcase_icon}></No_travel_icon></No_travel_icon_box>
                    <No_travel_text>필수 물품</No_travel_text>
                </ProhibitedItems_openBox_header>  
                <Open_box_main>
                    {essenitem_list.map(function(a,i){
                        return(
                            <Item_listBox>
                                <Item_name>{essenitem_list[i]}</Item_name>
                                <CheckBox 
                                    id={essenitem_list[i]}
                                    type="checkbox" 
                                    onChange={(e) => {
                                        checkItemHandler(e.target.id, e.target.checked);
                                      }}></CheckBox>
                            </Item_listBox>
                        )
                    })}
                </Open_box_main>
                <No_travel_close_btn onClick={onClick_prohibitedItem}>닫기</No_travel_close_btn> 
            </ProhibitedItems_openBox>):
            (<EssentialItems_closeBox>
                <No_travel_icon_box><No_travel_icon src={suitcase_icon}></No_travel_icon></No_travel_icon_box>
                <No_travel_text>필수 물품</No_travel_text>
                <No_travel_btn onClick={onClick_prohibitedItem}>열기</No_travel_btn>
            </EssentialItems_closeBox>)}
        </div>
    );
  }
  
  export default EssentialItems;
  