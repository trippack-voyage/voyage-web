import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import BagPackSide from '../Components/BagPack/BagPackSide';
import { useNavigate, useParams } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import axios from 'axios';

export const GlobalStyle = createGlobalStyle`
    #root,
    html,
    body {
        width: 100%;
        background-color: ${({ theme }) => theme.body};
    }
`

const Bagpack_main = styled.div`
    display: flex;
`;

const Bagpack_main_box = styled.div`
    margin: 0 auto;
    margin-top: 50px;
`;

//헤더
const Bagpack_main_header = styled.div`
    display: flex;
    margin-top: 10px;
    margin-bottom: 30px;
    font-size: 35px;
    font-weight: 700;
`;

const Header_text = styled.text<{ color?: boolean }>`
    border-bottom: 3px solid black;
    padding: 25px 0px;
    width: 350px;
    color: ${(props) => props.color ? 'black' : 'gray'};
    border-bottom:  ${(props) => props.color ? '3px solid black' : '3px solid gray'};
    cursor: pointer;
    text-align: center;
`;

//친구관리, 친구찾기 박스 컨테이너
const Friend_main = styled.div`
    display: flex;
    margin: 0 auto;
    width: 1000px;
    margin-bottom: 30px;
`;

//친구 관리 박스
const Friend_list_box = styled.div`
    height: 600px;
    width: 1000px;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: ${({ theme }) => theme.toggleBackground};
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

const Find_friend_container = styled.div`
    margin: 0 auto;
    width: 800px;
`;
//친구 검색창
const Find_friend = styled.input`
    border: 3px solid #FF541E;
    box-shadow: rgba(245, 105, 60, 0.18) 0px 0px 15px;
    width: 800px;
    height: 70px;
    background-color: ${({ theme }) => theme.navBar};
    font-size: 22px;
    padding: 15px;
    border-radius: 12px;
    outline: none;
    margin: 10px auto;
`;

//친구 찾기 친구 리스트 박스
const Find_Friend_box = styled.div`
    display: flex;
    border-radius: 12px;
    margin-top: 20px;
    padding: 10px 20px;
    width: 800px;
    margin-right: auto;
    margin-left: auto;
    background-color: ${({ theme }) => theme.list};

`;

//친구 찾기 친구 리스트 프로필
const Find_friend_prifile = styled.img`
    border: none;
    display: flex;
    border-radius: 50px;
    width: 60px;
    height: 60px;
    margin-left: 30px;
`;

//친구 찾기 친구 리스트 이름
const Find_friend_name = styled.div`
    font-size: 20px;
    margin-left: 40px;
    font-weight: 700;
    margin-top: auto;
    margin-bottom: auto;
    width: 100px;
`;

const Find_frined_btn = styled.button`
    margin: auto 0px auto auto;
    font-size: 20px;
    font-weight: 700;
    background-color: ${({ theme }) => theme.headerBackground};
    border-radius: 12px;
    width: 105px;
    height: 55px;
    border: 3px solid #FF541E;
    color: #FF541E;
    box-shadow: rgba(245, 105, 60, 0.18) 0px 0px 15px;
`;

const Delete_frined_btn = styled.button`
    margin: auto 0px auto auto;
    font-size: 20px;
    font-weight: 700;
    background-color: ${({ theme }) => theme.headerBackground};
    border-radius: 12px;
    width: 75px;
    height: 55px;
    border: 3px solid #FF541E;
    color: #FF541E;
    box-shadow: rgba(245, 105, 60, 0.18) 0px 0px 15px;
`;

//친구 수락 버튼
const Accept_frined_btn = styled.button`
    margin: auto 0px auto auto;
    font-size: 20px;
    font-weight: 700;
    background-color: ${({ theme }) => theme.headerBackground};
    border-radius: 12px;
    width: 75px;
    height: 55px;
    border: 3px solid #FF541E;
    color: #FF541E;
    box-shadow: rgba(245, 105, 60, 0.18) 0px 0px 15px;
`;

const Friend_list_text = styled.div`
    font-size: 25px;
    text-align: center;
    margin-top: 50px;
    font-weight: 700;
`;

function FriendSet() {

    interface IList {
        kakaoProfileImg: string,
        kakaoNickname: string,
        userCode: number
    }

    interface PList {
        kakaoProfileImg: string,
        kakaoNickname: string,
        userCode: number,
        isFriend: boolean
    }

    //사용자 유저코드 조회(완성)
    const [userCode, setUserCode] = useState("");
    useEffect(() => {
        axios({
            url: `kakao/find-usercode/${localStorage.getItem("userName")}`,
            method: 'GET'

        }).then((response) => {
            setUserCode(response.data);
            localStorage.setItem("userCode", userCode);
        }).catch((error) => {
            console.error('AxiosError:', error);
        });
    }, [])

    //사용자 전체 목록(구현완료)
    const [friend_list, SetFriend_list] = useState<IList[]>([],);
    useEffect(() => {
        axios({
            url: '/kakao/all-users',
            method: 'GET'

        }).then((response) => {
            SetFriend_list(response.data);
        }).catch((error) => {
            console.error('AxiosError:', error);
        });
    }, [])

    //내 친구리스트(완성)
    const [myfriendlist, Setmyfriendlist] = useState<PList[]>([],);
    useEffect(() => {
        axios({
            url: `/friend/friendList/${Number(userCode)}`,
            method: 'GET'

        }).then((response) => {
            Setmyfriendlist(response.data.result);
            //console.log(response.data.result);

        }).catch((error) => {
            console.error('AxiosError:', error);
        });
    }, [userCode])

    //userCode로 사용자 정보 조회
    const [flist_info, Setf_list_info] = useState([""]);
    const [flist_info2, Setf_list_info2] = useState([""]);
    const [name, setName] = useState("");
    function findUserCode(user: number) {
        axios({
            url: `kakao/find/${Number(user)}`,
            method: 'GET'

        }).then((response) => {
            setName(name);
            Setf_list_info([response.data.kakaoNickname, ...flist_info]);
            Setf_list_info2([response.data.kakaoProfileImg, ...flist_info2]);
            //console.log(flist_info);
            //console.log(flist_info2);
        }).catch((error) => {
            console.error('AxiosError:', error);
        });
    }

    //친구수락 확정 대기 목록
    const [friend_receive, setFriend_receive] = useState<PList[]>([],);
    useEffect(() => {
        axios({
            url: `/friend/acceptRequest/${Number(userCode)}`,
            method: 'GET'

        }).then((response) => {
            console.log(response.data.result);
            setFriend_receive(response.data.result);

            for (let i = 0; i < response.data.result.length; i++) {
                findUserCode2(response.data.result[i]);
            }
        }).catch((error) => {
            console.error('AxiosError:', error);
        });
    }, [userCode])

    //userCode로 사용자 정보 조회
    const [flist_info3, Setf_list_info3] = useState([""]);
    const [flist_info4, Setf_list_info4] = useState([""]);
    function findUserCode2(user: number) {
        axios({
            url: `kakao/find/${Number(user)}`,
            method: 'GET'

        }).then((response) => {
            setName(name);
            Setf_list_info([response.data.kakaoNickname, ...flist_info3]);
            Setf_list_info4([response.data.kakaoProfileImg, ...flist_info4]);
            //console.log(flist_info3);
            //console.log(flist_info4);

        }).catch((error) => {
            console.error('AxiosError:', error);
        });
    }

    //메인화면 이동(구현 완료)
    const navi = useNavigate();
    function onClickBack() {
        navi("/bag-list");
    }

    //친구 요청(구현 완료)
    const [find_result, setFind_result] = useState("");
    const [find_request, setFind_request] = useState(false);
    function friend_request(friendCode: number) {

        if (find_request === false)
            setFind_request(true);
        else
            setFind_request(false);

        axios({
            url: `/friend/add`,
            method: 'POST',
            headers: { "Content-Type": "Application/json;charset=UTF-8" },
            data: {
                friendId: friendCode,
                isFriend: false,
                userId: userCode
            },
        }).then((response) => {
            //console.log(response);
            window.location.replace("/friend-set");
        }).catch((error) => {
            console.error('AxiosError:', error);
        });
    }

    //친구 삭제(구현 완료)
    function friend_delete(friendcode: number) {

        axios.delete(`/friend/delete/${Number(userCode)}/${Number(friendcode)}`, {
        })
            .then(function (response) {
                //console.log(response);
                alert("친구가 삭제되었습니다!");
                axios({
                    url: `/friend/friendList/${Number(userCode)}`,
                    method: 'GET'
        
                }).then((response) => {
                    Setmyfriendlist(response.data.result);
                    //console.log(response.data.result);
        
                }).catch((error) => {
                    console.error('AxiosError:', error);
                });
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                //console.log(userCode);
                //console.log(friendcode);
            });
    }

    //친구 수락
    function friend_accept(friendcode: number) {

        console.log(userCode);
        console.log(friendcode);
        axios.patch(`/friend/accept/${Number(friendcode)}/${Number(userCode)}`, {
        })
            .then(function (response) {
                //console.log(response);
                window.location.replace("/friend-set");
                alert("친구 요청을 수락했습니다!");
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                //console.log(userCode);
                //console.log(friendcode);
            });
    }

    // 친구 요청 취소
    function cancel_friend_request(friendcode: number) {
        axios
            .delete(`/friend/delete/${Number(userCode)}/${Number(friendcode)}`)
            .then(function (response) {
                // console.log(response);
                window.location.replace("/friend-set");
                alert("친구 요청이 취소되었습니다!");
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            });
    }


    const [friendRequests, setFriendRequests] = useState<PList[]>([],); // 대기 중인 친구 요청 목록

    useEffect(() => {
        axios({
            url: `/friend/friendRequests/${userCode}`, // 사용자의 userCode로 대기 중인 친구 요청 가져오기
            method: 'GET'
        }).then((response) => {
            setFriendRequests(response.data.result);
            console.log("친구요청");
            console.log(response.data.result);
        }).catch((error) => {
            console.error('AxiosError:', error);
        });
    }, [userCode]);

    //친구 관리, 추가, 요청 박스 변경(구현 완료)
    const [header_text1 , setHeader_text1] = useState(true);
    const [header_text2 , setHeader_text2] = useState(false);
    const [header_text3 , setHeader_text3] = useState(false);
    function onClickHeader(index:number){
        if(index === 1){
            setHeader_text1(true);
            setHeader_text2(false);
            setHeader_text3(false);
        }

        else if(index === 2){
            setHeader_text1(false);
            setHeader_text2(true);
            setHeader_text3(false);
        }

        else{
            setHeader_text1(false);
            setHeader_text2(false);
            setHeader_text3(true);
        }
    }

    return (
        <div>
            <GlobalStyle />
            <Bagpack_main>
                <Bagpack_main_box>
                    <IoArrowBack size="50" onClick={onClickBack} />
                    <Bagpack_main_header>
                        <Header_text onClick={()=>{onClickHeader(1)}} color={header_text1}>친구 관리</Header_text>
                        <Header_text onClick={()=>{onClickHeader(2)}} color={header_text2}>친구 추가</Header_text>
                        <Header_text onClick={()=>{onClickHeader(3)}} color={header_text3}>친구 요청</Header_text>
                    </Bagpack_main_header>

                    <Friend_main>
                        {header_text1 ? 
                            (<div>{myfriendlist.length === 0 ?
                                (<Friend_list_box><Friend_list_text>친구가 아직 없어요!</Friend_list_text></Friend_list_box>) :
                                (<Friend_list_box>
                                    {myfriendlist.map(function (a, i) {
                                        return (
                                            <Find_Friend_box>
                                                <Find_friend_prifile 
                                                    src={`${a.kakaoProfileImg}`} 
                                                    height="100" 
                                                    width="100">
                                                </Find_friend_prifile>
                                                <Find_friend_name>{a.kakaoNickname}</Find_friend_name>
                                                <Delete_frined_btn onClick={() => friend_delete(a.userCode)}>
                                                    삭제
                                                </Delete_frined_btn>
                                            </Find_Friend_box>)
                                    })}
                                </Friend_list_box>)}
                            </div>):(<div></div>)}

                        {header_text2 ? 
                            (<div>
                                <Friend_list_box>
                                    <Find_friend_container>
                                        <Find_friend 
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setFind_result(e.target.value);}}
                                            placeholder='사용자 이름 검색'>
                                        </Find_friend>
                                    </Find_friend_container>
                                    {friend_list.map(function (a, i) {
                                    return (
                                        <div>
                                            {find_result === `${a.kakaoNickname}` ?
                                                (<Find_Friend_box>
                                                    <Find_friend_prifile src={a.kakaoProfileImg} 
                                                        height="100" 
                                                        width="100">
                                                    </Find_friend_prifile>
                                                    <Find_friend_name>{a.kakaoNickname}</Find_friend_name>
                                                    {find_request === false ?
                                                        (<Find_frined_btn onClick={() => friend_request(a.userCode)}>친구요청</Find_frined_btn>) :
                                                        (<Find_frined_btn onClick={() => friend_request(a.userCode)}>요청완료</Find_frined_btn>)
                                                    }
                                                </Find_Friend_box>) : (<div></div>)}
                                        </div>)})}
                                        
                                    {friendRequests.map(function (a, i) {
                                    return (
                                        <div>
                                            <Find_Friend_box>
                                                <Find_friend_prifile src={a.kakaoProfileImg} height="100" width="100"></Find_friend_prifile>
                                                <Find_friend_name>{a.kakaoNickname}</Find_friend_name>
                                                <Find_frined_btn onClick={() => cancel_friend_request(a.userCode)}>대기중</Find_frined_btn>
                                            </Find_Friend_box>
                                        </div>
                                    )})}
                                </Friend_list_box>
                            </div>):(<div></div>)}

                        {header_text3 ?   
                            (<div>         
                                {friend_receive.length === 0 ? (
                                    <Friend_list_box><Friend_list_text>친구요청이 없어요!</Friend_list_text></Friend_list_box>)
                                    :(<Friend_list_box>
                                        {friend_receive.map((friend, i) => (
                                            <Find_Friend_box key={i}>
                                                <Find_friend_prifile src={friend.kakaoProfileImg} height="100" width="100" />
                                                <Find_friend_name>{friend.kakaoNickname}</Find_friend_name>
                                                <Accept_frined_btn onClick={() => friend_accept(friend.userCode)}>수락</Accept_frined_btn>
                                            </Find_Friend_box>
                                        ))}
                                    </Friend_list_box>
                                )}
                            </div>):(<div></div>)}
                    </Friend_main>
                </Bagpack_main_box>
            </Bagpack_main>
        </div>
    );

}

export default FriendSet;
