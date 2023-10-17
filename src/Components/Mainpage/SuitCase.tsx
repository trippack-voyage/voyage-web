import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';

//아이콘
import {IoLocationOutline , IoCalendarOutline} from 'react-icons/io5'; 
import {BsBookmark, BsTrash3} from 'react-icons/bs';
import {HiOutlineDotsHorizontal} from 'react-icons/hi';
import {AiOutlineCheckSquare} from 'react-icons/ai';
import {RxPencil2} from 'react-icons/rx';
import {PiAirplaneTilt} from 'react-icons/pi';

import { useNavigate } from 'react-router-dom';

//recoil
import { useRecoilState } from "recoil";
import { bagUpdateState, bagDelState, bagState } from "../../recoil/atoms";

export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'S-CoreDream-3Light';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
`;

const SuitCase_container = styled.div`
    width: 300px;
    margin-left: 30px;
    margin-bottom: 50px;
`;

//손잡이
const SuitCase_handle = styled.div`
    border: 10px solid black;
    border-radius: 20px;
    height: 90px;
    width: 120px;
    margin: 0 auto;
`;

//캐리어
const SuitCase_box = styled.div`
    border: 1px solid black;
    border-radius: 20px;
    height: 350px;
    width: 280px;
    index: 1;
    background-color: white;
    margin: -20px auto auto auto;
`;

//가방 정보 컨테이너
const Bag_info_container = styled.div`
    margin-top: 5px;
    height: 285px;
    border: 1px solid white;
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

//가방 정보 박스
const Bag_info_box = styled.div`
    display: flex;
    font-family: 'S-CoreDream-3Light';
    margin-top: 5px;
`;

//가방 정보 박스(가방 이름)
const Bag_info_box1 = styled.div`
    display: flex;
    font-family: 'S-CoreDream-3Light';
    margin-top: 115px;
`;

//가방 정보 아이콘
const Bag_icon = styled.div`
    margin: auto 8px auto auto;
`;

//가방 정보
const Bag_info = styled.div`
    font-size: 20px;
    margin-left: 0px;
    margin-right: 20px;
`;

const Bag_line = styled.div`
    border: 1px solid #c3c3c3;
    width: 160px;
    margin: 8px 20px 8px auto;
`;
interface IProps {
    bagName: string;
    location: string;
    start_date: string;
    end_date: string;
    status: string;
  }
  
function SuitCase( {
    bagName,
    location,
    start_date,
    end_date,
    status
  }: IProps){

    const navi = useNavigate();

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

    //캐리어 클릭 시
    function onClickSuitCase(){
        navi("/bagpack");
    }

    return (
        <SuitCase_container>
            <GlobalStyle/>
            <SuitCase_handle/>
            <SuitCase_box>
                <Bag_icon_box>
                    <Del_icon onClick={onClick_del}><BsTrash3 size="20"/></Del_icon>                    
                    <Edit_icon onClick={onClick_update}><RxPencil2 size="20"/></Edit_icon>
                    <Del_icon onClick={onClick_airplain}><PiAirplaneTilt size="21"/></Del_icon>
                </Bag_icon_box>
                <Bag_info_container onClick={onClickSuitCase}>
                    <Bag_info_box1>
                        <Bag_icon><BsBookmark size="15"/></Bag_icon>
                        <Bag_info>{bagName}</Bag_info>
                    </Bag_info_box1>
                    <Bag_line/>
                    <Bag_info_box>
                        <Bag_icon><IoLocationOutline size="15"/></Bag_icon>
                        <Bag_info>{location}</Bag_info>
                    </Bag_info_box>
                    <Bag_line/>
                    <Bag_info_box>
                        <Bag_icon><IoCalendarOutline size="15"/></Bag_icon>
                        <Bag_info>{start_date}</Bag_info>
                    </Bag_info_box>
                    <Bag_info_box>
                        <Bag_icon><HiOutlineDotsHorizontal size="15"/></Bag_icon>
                        <Bag_info>{end_date}</Bag_info>
                    </Bag_info_box>
                    <Bag_line/>
                    <Bag_info_box>
                        <Bag_icon><AiOutlineCheckSquare size="15"/></Bag_icon>
                        <Bag_info>{status==="AVAILABLE" ? "짐 싸는 중" : "짐 싸기 완료"}</Bag_info>
                    </Bag_info_box>
                </Bag_info_container>
            </SuitCase_box>
        </SuitCase_container>
    );
}

export default SuitCase;