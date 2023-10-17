import React, {useEffect} from 'react';
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import BagPackSide from '../Components/BagPack/BagPackSide';
import ProhibitedItmes from '../Components/BagPack/ProhibitedItems';
import EssentialItmes from '../Components/BagPack/EssentialItems';
import AddItmes from '../Components/BagPack/AddItems';
import FriendItmes from '../Components/BagPack/FriendItems';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from "recoil";
import { bagDelState, bagState, bagUpdateState  } from "../recoil/atoms";
//아이콘
import {IoLocationOutline , IoCalendarOutline} from 'react-icons/io5'; 
import {BsBookmark, BsTrash3} from 'react-icons/bs';
import {HiOutlineDotsHorizontal} from 'react-icons/hi';
import {AiOutlineCheckSquare} from 'react-icons/ai';
import {RxPencil2} from 'react-icons/rx';
import {PiAirplaneTilt} from 'react-icons/pi';

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
    margin-left: 120px;
    margin-top: 50px;
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
    margin-left: 15px;
`;

//가방 삭제 아이콘
const Del_icon = styled.div`
    margin-left: 20px;
`;

function Backpack() {

    const navi = useNavigate();

    function onClickBack(){
        navi("/bag-list");
    }

    const [isbagDel, setIsbagDel] = useRecoilState(bagDelState);
    function onClick_del(){
        setIsbagDel(true);
    }

    const [isbagUpdate, setIsbagUpdate] = useRecoilState(bagUpdateState);
    function onClick_update(){
        setIsbagUpdate(true);
    }

    
    const [isbagState, setIsbagState] = useRecoilState(bagState);
    function onClick_airplain(){
        setIsbagState(true);
    }

    return (
        <div>
            <GlobalStyle/>
            <Bagpack_main>
                <BagPackSide/>
                <Bagpack_main_box>
                    <IoArrowBack size="50" onClick={onClickBack}/>
                    <Bag_icon_box>
                        <Del_icon onClick={onClick_del}><BsTrash3 size="20"/></Del_icon>                    
                        <Edit_icon onClick={onClick_update}><RxPencil2 size="20"/></Edit_icon>
                        <Del_icon onClick={onClick_airplain}><PiAirplaneTilt size="21"/></Del_icon>
                    </Bag_icon_box>
                    <Bagpack_main_header>
                        <Bagpack_main_header_text1>이미지</Bagpack_main_header_text1>
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
  