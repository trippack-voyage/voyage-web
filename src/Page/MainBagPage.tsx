import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import axios from 'axios';
//아이콘
import {BsBagPlus} from 'react-icons/bs';
import {IoIosSearch} from 'react-icons/io';
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
  margin-top: 10px;
  z-index: 7;
  text-align: center;
`;

//내 여행 가방들-제목
const Main_title = styled.div`
  font-size: 40px;
  font-weight: 500;
  margin: 0px auto;
  margin-top: 50px;
  color:${({ theme }) => theme.button1};
  font-family: 'TAEBAEKfont';

  @media screen and (max-width: 500px){
    font-size: 25px;
    margin-top: 30px;
  }
`;

//완료 가방만 보기 버튼(하얀색)
const Bag_select_container1 = styled.div`
  display: flex;
  border: 2px solid black;
  border-radius: 30px;
  padding: 10px 20px;
  margin-right: 20px;
  width: 290px;
  box-shadow: 3px 3px lightgray;
  cursor: pointer;
  
  &:hover {
    background: #ea5028;
    color: white;
  }

  @media screen and (max-width:500px){
    width: 190px;
    margin-left: -15px;
  }
`
//완료 가방만 보기 버튼(주황색)
const Complete_bag_btn = styled.div`
  display: flex;
  border: 2px solid black;
  border-radius: 30px;
  padding: 10px 20px;
  margin-right: 20px;
  width: 290px;
  box-shadow: 3px 3px lightgray;
  cursor: pointer;
  background-color: #ea5028;
  color: white;

  &:hover {
    background: white;
    color: black;
  }

  @media screen and (max-width:500px){
    width: 190px;
  }
`;

//등록순/마감순 가방 보기 버튼 컨테이너
const Bag_select_container2 = styled.div`
  display: flex;
  border: 2px solid black;
  border-radius: 30px;
  padding: 10px 0px;
  width: 150px;
  box-shadow: 3px 3px lightgray;
  
  @media screen and (max-width:500px){
    width: 100px;
    padding: 10px 7px;
  }
`

//완료 가방만 보기 버튼 문구
const Bag_select_text = styled.div`
  font-family: 'S-CoreDream-3Light';
  font-size: 25px;
  margin: 5px auto;
  font-weight: bold;

  @media screen and (max-width: 500px){
    font-size: 15px;
  }
`;

//등록순/마감순 보기 버튼 문구
const Bag_select_text2 = styled.div`
  font-family: 'S-CoreDream-3Light';
  font-size: 25px;
  margin: 5px 15px;
  font-weight: bold;
  cursor: pointer;

  @media screen and (max-width: 500px){
    font-size: 15px;
    margin: auto 5px;
  }
`;

//구분선
const Main_title_line = styled.div`
  border: 2px solid #1a1919;
  width: 100px;
  margin: 20px auto;

  @media screen and (max-width: 500px){
    width: 70px;
  }
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
  display: flex;
  width: 125px;
  height: 45px;
  font-size: 0.8rem;
  background-color: white;
  border: none;
  position: fixed;
  right: 1.5rem;
  bottom: 5.5rem;
  border-radius: 30px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  z-index: 10000;
  flex-direction: row;
  align-items: center;
  color: black;

  @media screen and (max-width:500px){
    width: 100px;
    height: 40px;
    font-size: 0.7rem;
    bottom: 4.5rem;
    right: 1rem;
  }
`;

//날씨 버튼 박스
const Weather_btn_box = styled.div`
  width: 70px;
  height: 70px;
  margin: auto 30px auto auto;
`;

//날씨 버튼
const Weather_btn = styled.button`
  display: flex;
  width: 125px;
  height: 45px;
  font-size: 0.8rem;
  background-color: white;
  border: none;
  position: fixed;
  right: 1.5rem;
  bottom: 9.5rem;
  border-radius: 30px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  z-index: 10000;
  flex-direction: row;
  align-items: center;
  color: black;

  @media screen and (max-width:500px){
    width: 100px;
    height: 40px;
    font-size: 0.7rem;
    bottom: 8rem;
    right: 1rem;
  }
`;

//가방 정렬
const SortingOptions = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
`;

const Bag_container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

//베너 이미지
const Banner_img = styled.img`
  
  @media screen and (max-width: 500px){
    width: 400px;
  }
`;

//이모지
const Emoji = styled.figure`
  width: 40px;
  height: 33px;
  border-radius: 100%;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width:500px){
    font-size: 1.1rem;
    width: 25px;
    margin-right: 4px;
  }
`;

const List_option = styled.div`
  display: flex;
  margin: 30px auto 50px 50px;
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

  //가방 정렬 선언
  const [sortByLatest, setSortByLatest] = useState(true); // 날짜정렬

  const toggleSortingOrder = () => {
    setSortByLatest((prevState) => !prevState);
  };

  /*가방 리스트 가져오기(구현 완료)*/
  const kakaoId = localStorage.getItem("kakaoId");
  const [bag_list , SetBag_list] = useState<IList[]>([],);

  useEffect(()=> {
    axios({
      url: sortByLatest ? '/bag/latestlist' : '/bag/list',
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
  }, [sortByLatest, kakaoId]);
 

  const [isOn, setisOn] = useState(false);

  const toggleHandler = () => {
    // isOn의 상태를 변경하는 메소드를 구현
    setisOn(!isOn)
  };

  return (
    <div>
      <GlobalStyle/> 

      <Main_header>
        <Swiper
          className="banner"
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
        >
          <SwiperSlide><Banner_img className="banner" alt="banner_01" src="/banner1.png" /></SwiperSlide>
          <SwiperSlide><Banner_img className="banner" alt="banner_02" src="/banner2.png" /></SwiperSlide>
          <SwiperSlide><Banner_img className="banner" alt="banner_03" src="/banner3.png" /></SwiperSlide>
          <SwiperSlide><Banner_img className="banner" alt="banner_04" src="/banner4.png" /></SwiperSlide>
        </Swiper>

        <Main_title>내 여행 가방들</Main_title>
        <Main_title_line></Main_title_line>

        <List_option>
         {isOn ? (<Complete_bag_btn onClick={toggleHandler}>
                  <Bag_select_text>👀 완료 가방만 보기</Bag_select_text></Complete_bag_btn>):
                (<Bag_select_container1 onClick={toggleHandler}>
                  <Bag_select_text>👀 완료 가방만 보기</Bag_select_text></Bag_select_container1>)}
        
          <Bag_select_container2>
              <SortingOptions>
                {sortByLatest ? (
                  <Bag_select_text2 onClick={toggleSortingOrder}>✏️ 등록순</Bag_select_text2>) : 
                  (<Bag_select_text2 onClick={toggleSortingOrder}>⏰ 마감순</Bag_select_text2>
                )}
              </SortingOptions>
          </Bag_select_container2>
        </List_option>
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
                    bagId={item.bagId}/>):
                    (null)}
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
                    bagId={item.bagId}/> ):
                    (null)}
                </div>
              )}
            )}
          </Bag_container>)
          }
        </Bag_container>
        <Bag_add_btn_box>
          <Bag_add_btn onClick={openModalHandler}>
            <Emoji><BsBagPlus></BsBagPlus></Emoji>
            가방 추가
          </Bag_add_btn>
        </Bag_add_btn_box>
        
        <Weather_btn_box>
          <Weather_btn onClick={openWeatherModalHandler}>
            <Emoji><IoIosSearch></IoIosSearch></Emoji>
            날씨 검색
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