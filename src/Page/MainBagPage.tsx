import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import axios from 'axios';
//아이콘
import {FaPlus} from 'react-icons/fa';
import {TiWeatherPartlySunny} from 'react-icons/ti';
//recoil
import { useRecoilState } from "recoil";
import { bagAddModalState, weatherModalState } from "../recoil/atoms";
//component 가져오기
import SuitCase from '../Components/Mainpage/SuitCase';
import Bag_add_modal from '../Components/Mainpage/Bag_add_modal';
import Weather_modal from '../Components/Mainpage/Weather_modal';

//swipper 추가
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from "swiper";
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'


export const GlobalStyle = createGlobalStyle`
    #root,
    html,
    body {
        width: 100%;
    }

    @font-face {
      font-family: 'TAEBAEKfont';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKfont.woff2') format('woff2');
      font-weight: normal;
      font-style: normal;
    }

    @font-face {
      font-family: 'S-CoreDream-3Light';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
      font-weight: normal;
      font-style: normal;
  }
`
const Main_header = styled.div`
  margin-top: 60px;
  z-index: 7;
  text-align: center;
`;

const Main_title = styled.div`
  font-size: 40px;
  font-weight: 500;
  margin: 0px auto;
  margin-top: 50px;
  color: #1a1919;
  font-family: 'TAEBAEKfont';
`;

const Bag_select_container = styled.div`
  display: flex;
`
const Bag_select_text = styled.div`
  font-family: 'S-CoreDream-3Light';
  font-size: 30px;
  margin: auto 10px auto auto;
  width: 250px;
`;

const ToggleContainer = styled.div`
  position: relative;
  cursor: pointer;
  margin-right: 50px;

  > .toggle-container {
    width: 80px;
    height: 42px;
    border-radius: 30px;
    background-color: gray;
  }

    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  > .toggle--checked {
    background-color: #ea5028;
    transition : 0.5s
  }

  > .toggle-circle {
    position: absolute;
    top: 1.5px;
    left: 2px;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: rgb(255,254,255);
    transition : 0.5s
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현

  } >.toggle--checked {
    left: 40px;
    transition : 0.5s
  }
`;

const Main_title_line = styled.div`
  border: 2px solid #1a1919;
  width: 100px;
  margin: 30px auto;
`;

const Main_main = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  z-index: -1;
`;

//가방 추가 버튼 박스
const Bag_add_btn_box = styled.div`
  width: 70px;
  height: 70px;
  margin: auto 30px auto auto;
`;

//가방 추가 버튼
const Bag_add_btn = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  font-size: 50px;
  background-color: #1a1919;
  border: none;
  color: white;
  position: fixed;
  right : 3rem;
  bottom : 10%;
`;

//날씨 버튼 박스
const Weather_btn_box = styled.div`
  width: 70px;
  height: 70px;
  margin: auto 30px auto auto;
`;

//날씨 버튼
const Weather_btn = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  font-size: 50px;
  background-color: #1a1919;
  border: none;
  color: white;
  position: fixed;
  right : 3rem;
  bottom : 22%;
`;

//가방 없을 때 문구
const Bag_none = styled.div`
  margin: 100px auto;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

//가방 없을 때 문구
const Bag_none1 = styled.div`
  margin: 100px auto 300px auto;
  width: 1000%;
`;

const Bag_none_text = styled.div`
  font-size: 20px;
  margin-top: 20px;
  font-family: S-CoreDream-3Light;
  text-align: center;
`;

const Bag_container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

SwiperCore.use([Navigation, Pagination])

function MainBagPage() {
  interface IList {
    bagName: string,
    location: string,
    startDate: string,
    endDate: string,
    status: string,
    bagId: number
  }

  //가방 추가 버튼 클릭 시
  const [isOpen, setIsOpen] = useRecoilState(bagAddModalState);

  const openModalHandler = () => {
    setIsOpen(true);
  };

  //날씨 버튼 클릭 시
  const [isOpenWeather, setIsOpenWeather] = useRecoilState(weatherModalState);
  const openWeatherModalHandler = () => {
    setIsOpenWeather(true);
  };

  /*가방 리스트 가져오기*/
  const kakaoId = localStorage.getItem("kakaoId");
  const [bag_list , SetBag_list] = useState<IList[]>([],);
  const [bag_list_end , SetBag_list_end] = useState<IList[]>([],);

  useEffect(()=> {
    axios({
      url: '/bag/list',
      method: 'GET',
      params:{
        kakaoId: `${kakaoId}`
      }

    }).then((response) => {
      //console.log(response.data);
      SetBag_list(response.data);
    }).catch((error) => {
      console.error('AxiosError:', error);
    });
  },[]) 

  const [isOn, setisOn] = useState(false);

  const toggleHandler = () => {
    // isOn의 상태를 변경하는 메소드를 구현
    setisOn(!isOn)
  };

  

  return (
    <div>
      <div>
    </div>
      <GlobalStyle/>
      
      <Main_header>
      <Swiper
        className="banner"
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        <SwiperSlide><img className="banner" alt="banner_01" src="/banner1.png" /></SwiperSlide>
        <SwiperSlide><img className="banner" alt="banner_02" src="/banner2.png" /></SwiperSlide>
        <SwiperSlide><img className="banner" alt="banner_03" src="/banner3.png" /></SwiperSlide>
        <SwiperSlide><img className="banner" alt="banner_04" src="/banner4.png" /></SwiperSlide>
      </Swiper>
        <Main_title>내 여행 가방들</Main_title>
        <Main_title_line></Main_title_line>
        <Bag_select_container>
          <Bag_select_text>완료 가방만 보기</Bag_select_text>
          <ToggleContainer onClick={toggleHandler}>
            <div className={`toggle-container ${isOn ? "toggle--checked" : null}`}/>
            <div className={`toggle-circle ${isOn ? "toggle--checked" : null}`}/>
          </ToggleContainer>
        </Bag_select_container>
      </Main_header>
      <Main_main>
          <Bag_container>
            {isOn === false? 
            (<Bag_container>
              {bag_list.map(function(item,i){
                return(
                  <div>
                    {item.status === 'AVAILABLE' ? (
                    <SuitCase
                      bagName={item.bagName}
                      location={item.location}
                      start_date={item.startDate}
                      end_date={item.endDate}
                      status={item.status}
                      bagId={item.bagId}/> ):(null)}
                  </div>
                )}
              )}
            </Bag_container>): 
            (<Bag_container>
              {bag_list.map(function(item,i){
                return(
                  <div>
                    {item.status === 'FINISHED' ? (
                    <SuitCase
                      bagName={item.bagName}
                      location={item.location}
                      start_date={item.startDate}
                      end_date={item.endDate}
                      status={item.status}
                      bagId={item.bagId}/> ):(<Bag_none1>

                      </Bag_none1>)}
                  </div>
                )}
              )}
            </Bag_container>)
            }
          </Bag_container>
        <Bag_add_btn_box>
          <Bag_add_btn onClick={openModalHandler}>
            <FaPlus size="40"></FaPlus>
          </Bag_add_btn>
        </Bag_add_btn_box>
        <Weather_btn_box>
          <Weather_btn onClick={openWeatherModalHandler}>
            <TiWeatherPartlySunny size="40"></TiWeatherPartlySunny>
          </Weather_btn>
        </Weather_btn_box>
      </Main_main>
      {isOpen ? 
        <Bag_add_modal></Bag_add_modal>
      : null}
      {isOpenWeather ? 
        <Weather_modal></Weather_modal>
      : null}
    </div>
  );
}

export default MainBagPage;