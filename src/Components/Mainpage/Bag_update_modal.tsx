import React, {useState, useEffect} from 'react';
import styled, {createGlobalStyle} from "styled-components";
import { ReactComponent as Bag_add_arrow } from '../../svg/bag_add_arrow.svg';
import { bagUpdateState, user_id } from "../../recoil/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'TAEBAEKfont';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
`

export const ModalContainer = styled.div`
  display: flex;
  flex-flow: row wrep;
  justify-content: center;
  align-items: center;
  margin-top: -670px;
`;

export const ModalView = styled.div.attrs(props => ({
  role: 'dialog'
}))`
  text-align: center;
  text-decoration: none;
  padding: 40px 20px;
  background-color: white;
  border-radius: 30px;
  width: 500px;
  height: 580px;
  box-shadow: gray 0px 0px 15px;
  z-index: 1;
  margin-bottom: 90px;
`;

//모달 헤더
const Bag_add_modal_header = styled.div`
  display: flex;
  position: relative;
`;
//뒤로가기 화살표
const Bag_add_modal_backarrow = styled.span`
  margin: auto auto auto 20px;
`;
//모달 헤더 제목(가방추가하기)
const Bag_add_modal_header_text = styled.span`
  font-size: 30px;
  font-weight: 700;
  width: 260px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'TAEBAEKfont';
`;
//모달 메인
const Bag_add_modal_main = styled.div`
  margin-top: 50px;
`;

const Bag_add_modal_input_box = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

//입력창
const Bag_add_modal_input = styled.input`
  border: 2px solid #1a1919;
  border-radius: 8px;
  width: 400px;
  height: 60px;
  padding: 5px 20px;
  font-size: 19px;
  font-weight: 700;

  &::placeholder{
    color: #c1c1c1;
  }
`;

//시작날짜, 끝날짜
const Bag_add_modal_input_text = styled.div`
  width: 110px;
  font-size: 19px;
  font-weight: 700;
  margin-left: 40px;
  margin-right: auto;
  text-align: left;

  &::placeholder{
    color: #c1c1c1;
  }
`;
//년도 입력
const Bag_add_modal_input_year = styled.input`
  border: 2px solid #1a1919;
  border-radius: 8px;
  width: 120px;
  height: 50px;
  padding: 5px 20px;
  font-size: 19px;
  font-weight: 700;
  text-align: center;

  &::placeholder{
    color: #c1c1c1;
  }
`;
//달, 일 입력
const Bag_add_modal_input_month_day = styled.input`
  border: 2px solid #1a1919;
  border-radius: 8px;
  width: 100px;
  height: 50px;
  padding: 5px 20px;
  font-size: 19px;
  font-weight: 700;
  text-align: center;

  &::placeholder{
    color: #c1c1c1;
  }
`;

//날짜 구분선
const Bag_add_modal_input_date_line = styled.div`
  border: 1px solid #1a1919;
  width: 10px;
  margin: 0 10px 0 10px;
`;

//가방 수정하기 버튼
const Bag_add_modal_btn = styled.button`
  border: none;
  background-color: #1a1919;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 700;
  margin-top: 10px;
  width: 400px;
  height: 60px;
  color: white;
  font-family: 'TAEBAEKfont';

  &:hover{
    color: #ea5028;
  }
`;

function Bag_update_modal() {

  //닫기 버튼 클릭 시
  const [isbagUpdate, setIsbagUpdate] = useRecoilState(bagUpdateState);

   const openModalHandler = () => {
    setIsbagUpdate(false);
  };

  const [bagName, setBagName] = useState(""); //가방이름
  const [location, setLocation] = useState(""); //여행 지역

  //여행 시작 년,월,일
  const [sYear, setSyear] = useState("")
  const [sMonth, setSmonth] = useState("")
  const [sDay, setSday] = useState("")
  //여행 끝 년,월,일
  const [eYear, setEyear] = useState("")
  const [eMonth, setEmonth] = useState("")
  const [eDay, setEday] = useState("")

  const startDate = sYear + "-" + sMonth + "-" + sDay; //시작 날짜
  const endDate = eYear + "-" + eMonth + "-" + eDay; //끝 날짜

  const bag_id = useParams().bagId; //주소에서 bagId가져오기

  //가방 정보 가져오기
  useEffect(()=> {
    axios({
      url: `/bag/${bag_id}`,
      method: 'GET'
    }).then((response) => {
      console.log(response.data);
      setBagName(response.data.bagName);
      setLocation(response.data.location);
      setSyear(response.data.startDate.substr(0, 4));
      setSmonth(response.data.startDate.substr(5, 2));
      setSday(response.data.startDate.substr(8, 2));
      setEyear(response.data.endDate.substr(0, 4));
      setEmonth(response.data.endDate.substr(5, 2));
      setEday(response.data.endDate.substr(8, 2));   
    }).catch((error) => {
      console.error('AxiosError:', error);
    });
  },[])  

  //수정 완료 버튼 클릭시
  function onClick_updateBag(){   
    axios({
      url: `/bag/${Number(bag_id)}`,
      method: 'PUT',
      data: {
        bagName: bagName,
        location: location,
        startDate: startDate,
        endDate: endDate,
      },
    }).then((response) => {
      console.log(response.data);

    }).catch((error) => {
      console.error('AxiosError:', error);
    });
    setIsbagUpdate(false);
  }

  return (
      <ModalContainer>
        <GlobalStyle/>
        <ModalView>
            <Bag_add_modal_header>
                <Bag_add_modal_backarrow>
                    <Bag_add_arrow width="20" height="20" onClick={openModalHandler}/>
                </Bag_add_modal_backarrow>
                <Bag_add_modal_header_text>가방 수정하기</Bag_add_modal_header_text>
            </Bag_add_modal_header>
            <Bag_add_modal_main>
                <Bag_add_modal_input_box>
                    <Bag_add_modal_input 
                      placeholder={`${bagName}`}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setBagName(e.target.value); }}>                        
                    </Bag_add_modal_input>
                </Bag_add_modal_input_box>
                <Bag_add_modal_input_box>
                    <Bag_add_modal_input 
                      placeholder={`${location}`}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setLocation(e.target.value); }}>
                    </Bag_add_modal_input>
                </Bag_add_modal_input_box>
                <Bag_add_modal_input_text>시작 날짜</Bag_add_modal_input_text>
                <Bag_add_modal_input_box>
                    <Bag_add_modal_input_year 
                      placeholder={`${sYear}`}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSyear(e.target.value); }}>
                    </Bag_add_modal_input_year>
                    <Bag_add_modal_input_date_line></Bag_add_modal_input_date_line>
                    <Bag_add_modal_input_month_day 
                      placeholder={`${sMonth}`}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSmonth(e.target.value); }}>                      
                    </Bag_add_modal_input_month_day>
                    <Bag_add_modal_input_date_line></Bag_add_modal_input_date_line>
                    <Bag_add_modal_input_month_day 
                      placeholder={`${sDay}`}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSday(e.target.value); }}>
                    </Bag_add_modal_input_month_day>
                </Bag_add_modal_input_box>
                <Bag_add_modal_input_text>끝 날짜</Bag_add_modal_input_text>
                <Bag_add_modal_input_box>
                    <Bag_add_modal_input_year 
                      placeholder={`${eYear}`}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEyear(e.target.value); }}>
                    </Bag_add_modal_input_year>
                    <Bag_add_modal_input_date_line></Bag_add_modal_input_date_line>
                    <Bag_add_modal_input_month_day 
                      placeholder={`${eMonth}`}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmonth(e.target.value); }}>
                    </Bag_add_modal_input_month_day>
                    <Bag_add_modal_input_date_line></Bag_add_modal_input_date_line>
                    <Bag_add_modal_input_month_day 
                      placeholder={`${eDay}`}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEday(e.target.value); }}>
                    </Bag_add_modal_input_month_day>
                </Bag_add_modal_input_box>
                <Bag_add_modal_btn onClick={onClick_updateBag}>수정완료</Bag_add_modal_btn>
            </Bag_add_modal_main>
        </ModalView>
      </ModalContainer>
  );
}

export default Bag_update_modal;
