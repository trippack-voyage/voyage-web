import React, {useEffect} from 'react';
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import BagPackSide from '../Components/BagPack/BagPackSide';
import ProhibitedItmes from '../Components/BagPack/ProhibitedItems';
import EssentialItmes from '../Components/BagPack/EssentialItems';
import AddItmes from '../Components/BagPack/AddItems';
import FriendItmes from '../Components/BagPack/FriendItems';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { bagDelState, bagState, bagUpdateState, bagId } from "../recoil/atoms";
//아이콘
import {BsTrash3} from 'react-icons/bs';
import {RxPencil2} from 'react-icons/rx';
import {PiAirplaneTilt} from 'react-icons/pi';
//컴포넌트
import Bag_update_modal from '../Components/Mainpage/Bag_update_modal';
import Bag_delete_modal from '../Components/Mainpage/Bag_delete_modal';
import Bag_state_modal from '../Components/Mainpage/Bag_state_modal';

import {
    IoArrowBack
  } from "react-icons/io5";

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
    margin-left: 70px;
    margin-top: 20px;
`;

//헤더
const Bagpack_main_header = styled.div`
    display: flex;
    margin-top: 20px;
    margin-bottom: 50px;
    color: #1a1919;
`;

const Bagpack_main_header_text1 = styled.span`
    font-size: 48px;
    font-weight: 700;
`;

const Bagpack_main_header_text2 = styled.span`
    font-size: 32px;
    font-weight: 700;
    margin-left: 10px;
    padding-top: 15px;
`;

const Bag_icon_box = styled.div`
    display: flex;
    margin-top: 20px;
`

//가방 정보 수정 아이콘
const Edit_icon = styled.div`
    margin-left: auto;
    padding: 15px 0px;
    margin-right: 5px;
`;

//가방 삭제 아이콘
const Del_icon = styled.div`
    margin-left: 25px;
    padding: 15px 0px;
`;

function Backpack() {

    const navi = useNavigate();
    const [bag, setBag] = useRecoilState(bagId);
    setBag(Number(useParams().bagId));

    //뒤로가기 화살표 클릭시 메인으로 이동
    function onClickBack(){
        navi("/bag-list");
    }

    //삭제 모달창
    const [isbagDel, setIsbagDel] = useRecoilState(bagDelState);
    function onClick_del(){
        setIsbagDel(true);
    }

    //수정 모달창
    const [isbagUpdate, setIsbagUpdate] = useRecoilState(bagUpdateState);
    function onClick_update(){
        setIsbagUpdate(true);
    }

    //가방 상태 변경 모달창
    const [isbagState, setIsbagState] = useRecoilState(bagState);
    function onClick_airplain(){
        setIsbagState(true);
    }

    const user_name = localStorage.getItem("userName");

    return (
        <div>
            <GlobalStyle/>
            <Bagpack_main>
                <BagPackSide/>
                <Bagpack_main_box>
                    <Bag_icon_box>
                        <IoArrowBack size="50" onClick={onClickBack}/>
                        <Edit_icon onClick={onClick_update}><RxPencil2 size="25"/></Edit_icon>
                        <Del_icon onClick={onClick_del}><BsTrash3 size="25"/></Del_icon>                    
                        <Del_icon onClick={onClick_airplain}><PiAirplaneTilt size="26"/></Del_icon>
                    </Bag_icon_box>
                    <Bagpack_main_header>
                        <Bagpack_main_header_text1>{user_name}</Bagpack_main_header_text1>
                        <Bagpack_main_header_text2>의 가방</Bagpack_main_header_text2>
                    </Bagpack_main_header>
                    <ProhibitedItmes/>
                    <EssentialItmes/>
                    <AddItmes/>
                    <FriendItmes/>
                </Bagpack_main_box>
            </Bagpack_main>
            {isbagUpdate ? 
                <Bag_update_modal></Bag_update_modal>
            : null}
            {isbagDel ? 
                <Bag_delete_modal></Bag_delete_modal>
            : null}
            {isbagState ? 
                <Bag_state_modal></Bag_state_modal>
            : null}
        </div>
    );
  }
  
  export default Backpack;
  