import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';

//아이콘
import {IoLocationOutline , IoCalendarOutline} from 'react-icons/io5'; 
import {BsBookmark} from 'react-icons/bs';
import {HiOutlineDotsHorizontal} from 'react-icons/hi';
import {AiOutlineCheckSquare} from 'react-icons/ai';

import { useNavigate } from 'react-router-dom';
import ticket from '../../img/Component 1.png';
import ticket2 from '../../img/Component 2.png';

export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'S-CoreDream-3Light';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: 'TAEBAEKfont';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKfont.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
      }
`;

const SuitCase_container = styled.div`
    width: 300px;
    margin-left: 60px;
    margin-bottom: 50px;
`;

//가방 정보 컨테이너
const Bag_info_container = styled.div<{ status: string }>`
    margin-top: -350px;
    height: 285px;
    margin-right: 15px;
    cursor: pointer;

    margin-top: ${(props) => (props.status === 'FINISHED' ? '-375px;' : '-350px;')};
`;

// 가방 상태가 변경될 때 스타일 변경
const Bag_info_box = styled.div`
    display: flex;
    font-family: 'S-CoreDream-3Light';
    margin-top: 5px;
    cursor: pointer;
`;


//가방 정보 박스(가방 이름)
const Bag_info_box1 = styled.div`
    font-family: 'TAEBAEKfont';
    margin-top: 90px;
    margin-left: 90px;
    margin-bottom: 18px;
    font-size: 25px
`;

//가방 정보 박스(날짜)
const Bag_info_box2 = styled.div`
    font-family: 'S-CoreDream-3Light';
    margin-top: 19px;
    margin-left: 150px;
    font-size: 25px
`;

const Bag_info_box3 = styled.div`
    display: flex;
    font-family: 'S-CoreDream-3Light';
    margin-top: 30px;
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

const Ticket = styled.img`
`;
interface IProps {
    bagName: string;
    location: string;
    start_date: string;
    end_date: string;
    status: string;
    bagId: number;
  }
  
function SuitCase( {
    bagName,
    location,
    start_date,
    end_date,
    status,
    bagId
  }: IProps){

    const navi = useNavigate();

    //캐리어 클릭 시
    function onClickSuitCase(){
        navi(`/bagpack/${bagId}`);
    }

    return (
        <SuitCase_container>
            {status === "AVAILABLE" ? (<Ticket src={ticket} onClick={onClickSuitCase}/>):
            (<Ticket src={ticket2} onClick={onClickSuitCase}/>)}
            <GlobalStyle/>
                <Bag_info_container onClick={onClickSuitCase}  status={status}>
                    <Bag_info_box1>{bagName}</Bag_info_box1>

                    <Bag_info_box>
                        <Bag_icon><IoLocationOutline size="20"/></Bag_icon>
                        <Bag_info>{location}</Bag_info>
                    </Bag_info_box>
                    
                    <Bag_info_box2>
                        <Bag_info>{start_date}</Bag_info>
                    </Bag_info_box2>
                    <Bag_info_box>
                        <Bag_icon><HiOutlineDotsHorizontal size="15"/></Bag_icon>
                        <Bag_info>{end_date}</Bag_info>
                    </Bag_info_box>

                    <Bag_info_box3>
                        <Bag_icon><AiOutlineCheckSquare size="15"/></Bag_icon>
                        <Bag_info>{status==="AVAILABLE" ? "짐 싸는 중" : "짐 싸기 완료"}</Bag_info>
                    </Bag_info_box3>
                </Bag_info_container>
        </SuitCase_container>
        
    );
}

export default SuitCase;