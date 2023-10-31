import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from "recoil";
import { bagId } from "../../recoil/atoms";
import axios from 'axios';

const Side_box = styled.div`
    width: 450px;
    height: 830px;
    border-radius: 20px;
    background-color: white;
    margin: 17px 0px 17px 20px;
    border: 1px solid #c1c1c1;
`;

//친구 박스
const Friend_list_box = styled.div`
    height: 580px;
`;

//친구 리스트 박스
const Friend_inside_box = styled.div`
    border: 2px solid #1a1919;
    font-size: 22px;
    font-weight: 700;
    margin: 20px auto;
    width: 350px;
    padding: 15px;
    border-radius: 15px;
    cursor: pointer;
    text-align: center;
    color: #1a1919;
`;

const Set_box = styled.div`
    margin-top: 70px;
    position: relative; /* 컨테이너를 relative로 설정 */
`;

const LinkCopyContainer = styled.div`
    display: flex; /* 부모 컨테이너를 플렉스 컨테이너로 설정 */
    justify-content: center; /* 가로 방향 가운데 정렬 */
    align-items: center; /* 세로 방향 가운데 정렬 */
    position: absolute;
    top: -120px;
    width: 100%; /* 부모 컨테이너의 너비를 100%로 설정하여 자식 요소를 가로로 가운데 정렬 */

    position: absolute; /* Link 복사 컨테이너를 absolute로 설정 */
    top: -120px; /* 원하는 높이로 조정 */
`;

//친구 관리, GPT 박스
const Set_inside_box = styled.div`
    border: 2px solid #1a1919;
    font-size: 22px;
    font-weight: 700;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    width: 350px;
    padding: 15px;
    border-radius: 15px;
    cursor: pointer;
    text-align: center;
    background-color: #1a1919;
    color: white;
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

    margin: 0 auto; /* 수평 가운데 정렬 */
    display: block; /* 블록 수준 요소로 설정하여 가운데 정렬이 먹히도록 합니다. */
`;

const Message = styled.div`
  text-align: center;
  margin-top: 10px;
  font-size: 18px;
  font-weight: 500;
  color: #FF541E;
  white-space: pre-line; /* 줄 바꿈을 보존합니다. */
`;


function BackpackSide() {

    //아이디 클릭시
    const navigate = useNavigate();
    const bag_id = useParams().bagId;
    function onClick_main(){
        navigate("/bagpack/" + `${bag_id}`);
    }

    //CHAT GPT
    function onClick_chatgpt(){
        navigate("/chat-gpt");
    }

    //링크복사 클릭시
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
            console.log("slug:" + response.data.result.slug); //slug값 추출
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


    const [generatedLink, setGeneratedLink] = useState(''); // Initialize with an empty string

    // 클릭 이벤트 핸들러
    async function onClickLink() {
        const hasClipboardPermission = await requestClipboardPermission();

        if (hasClipboardPermission) {
            axios({
                url: `/invitations/${slug}`,
                method: 'GET',
        }).then((response) => {
            console.log("bagId획득:" + response.data.result.bagId);
            console.log(`http://localhost:3000/bagpack/${response.data.result.bagId}`);

            const link = `http://localhost:3000/bagpack/${response.data.result.bagId}`;
            setGeneratedLink(link); // Set the generated link


            // 링크를 클립보드에 복사
            navigator.clipboard.writeText(`http://localhost:3000/bagpack/${response.data.result.bagId}`)
                .then(() => {
                    alert(" 초대링크가 복사되었습니다! ");
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

    //가방 만든 사람 카카오 정보 조회(구현 완료)
    const [user_name, setUser_name] = useState("");
    useEffect(()=> {
        axios({
            url: `/bag/${Number(bag_id)}`,
            method: 'GET'
    
        }).then((response) => {
            let bagUser = response.data.kakaoId;

            axios({
                url: `/kakao/all-users`,
                method: 'GET'
        
            }).then((response) => {
                console.log(response.data);

                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].kakaoId === bagUser){
                        setUser_name(response.data[i].kakaoNickname);
                    }
                }
            }).catch((error) => {
                console.error('AxiosError:', error);
            });

        }).catch((error) => {
            console.error('AxiosError:', error);
        });

    },[])

    return (
        <Side_box>
            <Friend_list_box>
                <Friend_inside_box onClick={onClick_main}>{user_name}</Friend_inside_box>
            </Friend_list_box>
            <Set_box>
            <LinkCopyContainer> {/* Link 복사 컨테이너 */}
                {link && (
                <div>
                    <Link_box onClick={() => { onClickLink(); setLink(false); }}>링크 복사하기</Link_box>
                    <Message>{`${slug}로 입장  \n 초대링크를 공유하세요!`}</Message>
                </div>
                )}
            </LinkCopyContainer>
            <Set_inside_box onClick={onClick_addBtn}>링크복사</Set_inside_box>
            <Set_inside_box onClick={onClick_chatgpt}>짐도우미(GPT)</Set_inside_box>
            </Set_box>
        </Side_box>
    );
  }
  
  export default BackpackSide;
  