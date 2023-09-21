import React, {useState} from 'react';
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import BagPackSide from '../Components/BagPack/BagPackSide';

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
    margin-bottom: 50px;
    font-size: 50px;
    font-weight: 700;
`;

const Friend_list_box = styled.div`
    display: flex;
    margin-top: 15px;
    margin-bottom: 15px;
    height: 520px;
    width: 1000px;
    flex-direction: row;
    flex-wrap: wrap;
`;

//footer
const FriendSet_main_footer = styled.div`
    display: flex;
    margin-top: 30px;
`;

const Friend_delete_btn = styled.button`
    border: 1px solid black;
    width: 300px;
    height: 55px;
    font-size: 25px;
    font-weight: 700;
    margin: auto 0 auto auto;
    border-radius: 20px;
    border: none;
    background-color: #f18851;
    color: white;
`;

const Friend_add_btn = styled.button`
    border: 1px solid black;
    width: 300px;
    height: 55px;
    font-size: 25px;
    font-weight: 700;
    margin-left: 20px;
    border-radius: 20px;
    border: none;
    background-color: #f18851;
    color: white;
`;

//프로필
const Prifile_box = styled.div`
    margin-right: 50px;
    height: 150px;
    border: 2px solid #f18851;
    border-radius: 10px;
    padding: 10px;

    &.active{
        border: none;
    }
`;

const Profile_img = styled.div`
    background-color: lightgray;
    width: 110px;
    height: 110px;
    border-radius: 60px;
`;

const Profile_name = styled.div`
    margin-top: 10px;
    font-size: 20px;
    font-weight: 500;
`;

function FriendSet() {

    function onClick_deleteBtn(){
        alert("친구가 삭제되었습니다.");
    }

    function onClick_addBtn(){
        alert("링크가 복사되었습니다.");
    }

    const [friend_list, setFriend_list] = useState([1, 2, 3]);
    const [friend_state, setFriend_state] = useState([false, false, false]);

    let [btnActive, setBtnActive] = useState();

    const toggleActive = (e:any) => {
        let copy = [...friend_state];

        if(copy[e] == false)
            copy[e] = true;
        else
            copy[e] = false;

        setFriend_state(copy);
    };

    return (
        <div>
            <Bagpack_main>
                <BagPackSide/>
                <Bagpack_main_box>
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
                        <Friend_delete_btn onClick={onClick_deleteBtn}>친구 삭제하기</Friend_delete_btn>
                        <Friend_add_btn onClick={onClick_addBtn}>친구 추가하기</Friend_add_btn>
                    </FriendSet_main_footer>
                </Bagpack_main_box>
            </Bagpack_main>
        </div>
    );
  }
  
  export default FriendSet;
  