import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import suitcase_icon from '../../img/suitcases-icon.png';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
`;

//물품 열기 버튼
const No_travel_btn = styled.button`
    margin: auto 20px 25px auto;
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
    border: 3px solid #FF541E;
    width: 250px;
    height: 70px;
    margin: 10px auto;
    display: flex;
    border-radius: 20px;
    box-shadow: rgba(245, 105, 60, 0.18) 0px 0px 15px;
`;

const Item_name = styled.div`
    font-size: 22px;
    margin: auto 0 auto 25px;
    width: 150px;
    text-align: left;
`;

const CheckBox = styled.input`
    appearance: none;
    margin: auto auto auto 20px;
    border-radius: 10px;
    background-color: #e0e0e0;
    width: 35px;
    height: 35px;

    &:checked {
        border-color: transparent;
        background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
        background-size: 100% 100%;
        background-position: 50%;
        background-color: #1a1919;
    }
`;

//닫기 버튼
const No_travel_close_btn = styled.div`
    margin: 25px 5px 20px auto;
    border: none;
    padding-bottom: 20px;
    font-size: 19px;
    font-weight: 500;
    color: gray;
    background-color: white;
    width: 100px;
    border-radius: 20px;
    cursor: pointer;
    text-align: center;
`;

export interface PList {
    packId: number;
    packName: string;
    completed: boolean;
    isRequired: boolean;
  }

function EssentialItems() {

    //bagId 가져오기
    const bag_id = useParams().bagId;

    // 필수 용품 리스트
    const [essenitem_list, setEssentitem_list] = useState([
        "여권", "E-ticket", "지갑", "충전기", "보조배터리", "USIM", "멀티탭", "카메라", "양치도구",
        "세안용품", "샤워용품", "스킨케어", "화장품", "선크림",
        "면도기", "고데기", "헤어롤", "속옷", "의류", "양말", "수영복", "우산, 우비",
        "안경, 렌즈", "선글라스", "신발, 슬리퍼", "악세사리", "머리끈", "비상약", "물티슈", "여성용품"]);

    // 필수 용품의 체크 상태 배열
    const [checkItems, setCheckItems] = useState(new Array(essenitem_list.length).fill(false));

    //물품 가져오기
    const [packEssList, setPackEssList] = useState<PList[]>([]);

    useEffect(() => {
        
        axios({
            url: `/pack/list/${bag_id}`,
            method: 'GET',
    
            }).then((response) => {
            setPackEssList(response.data);
    
            }).catch((error) => {
            console.error('AxiosError:', error);
            });

    }, [])

    // 박스 열림 상태
    const [isOpen_pItem, setIsOpen_pItem] = useState(false);

    function onClick_prohibitedItem() {
        if (isOpen_pItem === false){
            setIsOpen_pItem(true);
            //필수물품만 추려서 체크 판별
            for(let i = 0; i < packEssList.length; i++){
                for(let j = 0; j < essenitem_list.length; j++){
                    if(packEssList[i].packName === essenitem_list[j]){
                        checkItems[j] = true;              
                    }
                }
            }
        }
        else
            setIsOpen_pItem(false);
    }
    
    // 체크된 항목 처리 함수
    const checkItemHandler = (index: number) => {
        const updatedCheckItems = [...checkItems];
        updatedCheckItems[index] = !updatedCheckItems[index];
        setCheckItems(updatedCheckItems);

        //체크하면 백엔드로 필수물품 이름 전달(추가)
        if(updatedCheckItems[index] === true){
            
            const data = {
                bagId: `${Number(bag_id)}`,
                isRequired: true,
                packName: essenitem_list[index],
                completed: true
            };

            axios
            .post('/pack', data)
            .then((response) => {
                console.log('서버 응답:', response.data);
            })
            .catch((error) => {
                console.error('Axios 에러:', error);
            });

            //console.log(data);
        }

        //체크해제하면 백엔드로 필수물품 이름 전달(삭제)
        if(updatedCheckItems[index] === false){
    
            console.log(updatedCheckItems[index]);
            
            let packId = 0;

            for(let i = 0; i < packEssList.length; i++){
                if(packEssList[i].packName === essenitem_list[index])
                    packId = packEssList[i].packId;
            }
            //console.log(packId);
            axios.delete(`/pack/delete/${Number(packId)}`, {   
            })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            })
            .then(function () {
            });  
        }
    }

    return (
        <div>
            {isOpen_pItem ? (
                <ProhibitedItems_openBox>
                    <ProhibitedItems_openBox_header>
                        <No_travel_icon_box><No_travel_icon src={suitcase_icon}></No_travel_icon></No_travel_icon_box>
                        <No_travel_text>필수 물품</No_travel_text>
                    </ProhibitedItems_openBox_header>
                    <Open_box_main>
                        {essenitem_list.map(function (item, index) {
                            return (
                                <Item_listBox key={index}>
                                    <Item_name>{item}</Item_name>
                                    <CheckBox
                                        type="checkbox"
                                        checked={checkItems[index]}
                                        onChange={() => checkItemHandler(index)}
                                    />
                                </Item_listBox>
                            )
                        })}
                    </Open_box_main>
                    <No_travel_close_btn onClick={onClick_prohibitedItem}>닫기</No_travel_close_btn>
                </ProhibitedItems_openBox>) :
                (<EssentialItems_closeBox>
                    <No_travel_icon_box><No_travel_icon src={suitcase_icon}></No_travel_icon></No_travel_icon_box>
                    <No_travel_text>필수 물품</No_travel_text>
                    <No_travel_btn onClick={onClick_prohibitedItem}>열기</No_travel_btn>
                </EssentialItems_closeBox>)}
        </div>
    );
}

export default EssentialItems;
