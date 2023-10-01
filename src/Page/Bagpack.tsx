import React from 'react';
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import BagPackSide from '../Components/BagPack/BagPackSide';
import ProhibitedItmes from '../Components/BagPack/ProhibitedItems';
import EssentialItmes from '../Components/BagPack/EssentialItems';
import AddItmes from '../Components/BagPack/AddItems';
import FriendItmes from '../Components/BagPack/FriendItems';
import { useNavigate } from 'react-router-dom';

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

function Backpack() {

    const navi = useNavigate();
    function onClickBack(){
        navi("/bag-list");
    }
    return (
        <div>
            <GlobalStyle/>
            <Bagpack_main>
                <BagPackSide/>
                <Bagpack_main_box>
                    <IoArrowBack size="50" onClick={onClickBack}/>
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
        </div>
    );
  }
  
  export default Backpack;
  