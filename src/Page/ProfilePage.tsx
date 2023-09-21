import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
//import axios from 'axios';
//border: 2px solid #000;

const ProfileCover = styled.div`
  text-align: center;
`;
const LogoImg = styled.div`
  border: 2px solid #000;
  width: 400px;
  height: 80px;
  background-color: #D9D9D9;
  margin: 20px auto 10px auto;
`;
const ProfileText = styled.div`
  border: 2px solid #000;
  font-family: Inter;
  font-size: 60px;
  font-weight: 700;
  line-height: 65px;
  letter-spacing: 0em;
`;
const InputImgIc1 = styled.div<{ img: string }>`
  border: 2px solid #000;
  width: 350px;
  height: 350px;
  flex-shrink: 0;
  border-radius: 50%;
  background-image: URL(${(props) => props.img});
  background-repeat: no-repeat;
  background-size: cover;
  margin: 40px auto;
`;
const InputImgIc2 = styled.div`
  border: 2px solid #000;
  width: 350px;
  height: 350px;
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
  font-size: 20px;
  font-weight: 500;
  line-height: 36px;
  letter-spacing: 0em;
  text-align: center;
`;
const ClearBtn = styled.button`
  border: none;
  width: 300px;
  height: 80px;
  margin: 100px auto 10px auto;
  border-radius: 20px;
  background-color: #D9D9D9;
  font-family: Inter;
  font-size: 30px;
  font-weight: 700;
  line-height: 48px;
  letter-spacing: 0em;
  text-align: center;
`;

function ProfilePage() {
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState<File>();
  const [name, setName] = useState<String>();
  
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
  
  const startService = () => {
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
    //navigate('/SignUp3', { replace: true });
  }

  return (
    <ProfileCover>
      <form method="post" encType="multipart/form-data">
        <LogoImg>로고</LogoImg>
        <ProfileText>프로필</ProfileText>
        {profileImg? (
          <label htmlFor="profile"><InputImgIc1 id="profileImg" img={URL.createObjectURL(profileImg)} /></label>
        ): (
          <label htmlFor="profile"><InputImgIc2 id="profileImg" /></label>
        )} 
        <InputImg type="file" id="profile" accept="image/*" onChange={updateProfile} />
        <InputName type="text" id="name" placeholder="닉네임" autoComplete="off" onChange={updateName} />
      </form>
      <ClearBtn onClick={startService}>완료</ClearBtn>
    </ProfileCover>
  );
}
export default ProfilePage;
