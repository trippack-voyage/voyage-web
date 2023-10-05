import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BackArrow from '../svg/back_arrow.svg'
//import axios from 'axios';
//border: 2px solid #000;

const ProfileCover = styled.div`
  text-align: center;
`;
const ProfileBox = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
`;
const BackIcon = styled.img`
  width: 70px;
`;
const ProfileText = styled.span`
  font-size: 50px;
  font-weight: 700;
  line-height: 65px;
`;
const LogoutText = styled.span`
  font-size: 15px;
  font-weight: 700;
  line-height: 65px;
`;
const InputImgIc1 = styled.div<{ img: string }>`
  border: 2px solid #000;
  width: 280px;
  height: 280px;
  flex-shrink: 0;
  border-radius: 50%;
  background-image: URL(${(props) => props.img});
  background-repeat: no-repeat;
  background-size: cover;
  margin: 40px auto;
`;
const InputImgIc2 = styled.div`
  border: 2px solid #000;
  width: 280px;
  height: 280px;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: #D9D9D9;
  margin: 40px auto;
`;
const InputImg = styled.input`
  display: none;
  border: 2px solid #000;
`;
const InputName = styled.input`
  border: none;
  border-bottom: 2px solid #000;
  width: 350px;
  height: 50px;
  font-family: Inter;
  font-size: 25px;
  font-weight: 500;
  line-height: 36px;
  letter-spacing: 0em;
  text-align: center;
`;
const ClearBtn = styled.button`
  border: none;
  width: 300px;
  height: 80px;
  margin: 50px auto 10px auto;
  border-radius: 20px;
  background-color: #f18851;
  font-family: Inter;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  color: white;
`;

function MyPage() {
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState<File>();
  const [name, setName] = useState<String>();
  const viewName = '닉네임';

  const updateProfile = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImg(e.target.files[0]);

    } else {
      setProfileImg(undefined);
    }
  };
  const updateName = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setName(e.target.value);
  };
  
  const onBack = () => {
    navigate('/bag-list', { replace: true });
  }
  const onLogout = () => {
    //로그아웃 전송
    navigate('/', { replace: true });
  }
  const ProfileEdit = () => {
    //수정사항 전송 (닉네임과 사진)
    /*
    const formData = new FormData();
    formData.append("name", name);

    if (profileImg !== null) {
      formData.append("profile",  profileImg);
    }
    axios({
        url: '/user/join',
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        console.log(response.data);
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error('AxiosError:', error);
          e.preventDefault();
        });
    */
    //navigate('', { replace: true });
  }

  return (
    <ProfileCover>
      
      <form method="post" encType="multipart/form-data">
        <ProfileBox>
          <BackIcon src={BackArrow} onClick={onBack}/>
          <ProfileText>프로필 수정</ProfileText>
          <LogoutText onClick={onLogout}>로그아웃</LogoutText>
        </ProfileBox>
        {profileImg? (
          <label htmlFor="profile"><InputImgIc1 id="profileImg" img={URL.createObjectURL(profileImg)} /></label>
        ): (
          <label htmlFor="profile"><InputImgIc2 id="profileImg" /></label>
        )} 
        <InputImg type="file" id="profile" accept="image/*" onChange={updateProfile} />
        <InputName type="text" id="name" placeholder={viewName} autoComplete="off" onChange={updateName} />
      </form>
      <ClearBtn onClick={ProfileEdit}>완료</ClearBtn>
    </ProfileCover>
  );
}
export default MyPage;
