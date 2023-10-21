import React, {useState} from 'react';
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import BagPackSide from '../Components/BagPack/BagPackSide';
import { useNavigate, useParams } from 'react-router-dom';
import {IoArrowBack} from "react-icons/io5";
import axios from 'axios';

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
    margin-bottom: 30px;
    font-size: 40px;
    font-weight: 700;
`;

const Friend_list_box = styled.div`
    display: flex;
    margin-top: 10px;
    margin-bottom: 10px;
    height: 500px;
    width: 1000px;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: white;
    border-radius: 20px;
    padding: 20px;
    border: 1px solid #c1c1c1;

    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      width: 5px;
      height: 108px;
      border-radius: 12px;
      background: #d9d9d9;
    }
`;

//footer
const FriendSet_main_footer = styled.div`
    display: flex;
    margin-top: 30px;
`;

//친구 삭제 버튼
const Friend_delete_btn = styled.button`
    width: 300px;
    height: 60px;
    font-size: 22px;
    font-weight: 700;
    margin-left: 20px;
    border-radius: 20px;
    border: none;
    background-color: #1a1919;
    color: white;
`;

//친구 추가 버튼
const Friend_add_btn = styled.button`
    width: 300px;
    height: 60px;
    font-size: 22px;
    font-weight: 700;
    margin: auto 0 auto auto;
    border-radius: 20px;
    border: none;
    background-color: #1a1919;
    color: white;
`;

//프로필
const Prifile_box = styled.div`
    margin-right: 40px;
    height: 170px;
    border: 3px solid #FF541E;
    box-shadow: rgba(245, 105, 60, 0.18) 0px 0px 15px;
    border-radius: 10px;
    padding: 10px 20px;

    &.active{
        border: none;
        box-shadow: none;
    }
`;

const Profile_img = styled.div`
    background-color: lightgray;
    width: 100px;
    height: 100px;
    border-radius: 60px;
`;

const Profile_name = styled.div`
    margin-top: 20px;
    font-size: 20px;
    font-weight: 500;
    text-align: center;
`;

const Link_box = styled.button`
    width: 200px;
    height: 60px;
    font-size: 22px;
    font-weight: 700;
    margin: auto -80px auto auto;
    color: #FF541E;
    background-color: white;
    border: 3px solid #FF541E;
    box-shadow: rgba(245, 105, 60, 0.18) 0px 0px 15px;
    border-radius: 20px;
`;

function FriendSet() {

    function onClick_deleteBtn(){
        alert("친구가 삭제되었습니다.");
    }

    //친구 추가 버튼 클릭시
    const bag_id = useParams().bagId;
    const [slug, setSlug] = useState("");
    const [link, setLink] = useState(false);
    function onClick_addBtn(){
        //초대링크 생성
        axios({
            url: '/invitations',
            method: 'POST',
            data:{
                bagId: Number(bag_id)
            },
        }).then((response) => {
            console.log("slug:" + response.data.result.slug); //slag값 추출
            setSlug(response.data.result.slug); 
            setLink(true);
        }).catch((error) => {
            console.error('AxiosError:', error);
        });
    }

    
// 클립보드 권한 요청 함수
async function requestClipboardPermission() {
    try {
        if ('permissions' in navigator) {
            const clipboardPermissionName = 'clipboard-write' as PermissionName;
            const permissionStatus = await navigator.permissions.query({ name: clipboardPermissionName });
            return permissionStatus.state === 'granted';
        } else {
            console.error('navigator.permissions.query is not supported in this environment.');
            return false;
        }
    } catch (error) {
        console.error('Error requesting clipboard permission:', error);
        return false;
    }
}

// 클릭 이벤트 핸들러
async function onClickLink() {
    const hasClipboardPermission = await requestClipboardPermission();

    if (hasClipboardPermission) {
        axios({
            url: `/invitations/${slug}`,
            method: 'GET',
        }).then((response) => {
            console.log("bagId획득:" + response.data.result.bagId); // bagId 획득
            console.log(`http://localhost:3000/bagpack/${response.data.result.bagId}`);

            navigator.clipboard.writeText(`http://localhost:3000/bagpack/${response.data.result.bagId}`)
                .then(() => {
                    alert("링크가 복사되었습니다!");
                    setLink(false);
                })
                .catch((error) => {
                    console.error('클립보드 액세스 에러:', error);
                });
        }).catch((error) => {
            console.error('AxiosError:', error);
        });
    } else {
        alert('클립보드 액세스 권한을 허용해야 합니다.');
    }
}


    const [friend_list, setFriend_list] = useState([1, 2, 3]);
    const [friend_state, setFriend_state] = useState([false, false, false]);

    let [btnActive, setBtnActive] = useState();

    const toggleActive = (e:any) => {

    };

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
                    <Bagpack_main_header>친구 관리</Bagpack_main_header>
                    <Friend_list_box>
                        {friend_list.map(function(a,i){
                            return(    
                            <Prifile_box 
                                onClick={() => toggleActive(i)} 
                                className={(friend_state[i] === false ? " active" : "")}
                            >
                                <Profile_img></Profile_img>
                                <Profile_name>닉네임</Profile_name>
                            </Prifile_box>
                            )
                        })}
                    </Friend_list_box>
                    <FriendSet_main_footer>
                        {link ? <Link_box onClick={onClickLink}>링크 복사하기</Link_box> : <div></div>}
                        <Friend_add_btn onClick={onClick_addBtn}>친구 추가하기</Friend_add_btn>
                        <Friend_delete_btn onClick={onClick_deleteBtn}>친구 삭제하기</Friend_delete_btn>
                    </FriendSet_main_footer>
                </Bagpack_main_box>
            </Bagpack_main>
        </div>
    );
  }
  
  export default FriendSet;
  