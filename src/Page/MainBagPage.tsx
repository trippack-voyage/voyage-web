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

//완료 가방만 보기 버튼 컨테이너
const Bag_select_container = styled.div`
  display: flex;
`

//완료 가방만 보기 버튼 문구
const Bag_select_text = styled.div`
  font-family: 'S-CoreDream-3Light';
  font-size: 30px;
  margin: auto 10px auto auto;
  width: 250px;

  @media screen and (max-width: 500px){
    font-size: 19px;
    width: 200px;
    margin: 5px -20px auto auto;
  }
`;

//완료 가방만 보기 슬라이더 버튼
const ToggleContainer = styled.div`
  position: relative;
  cursor: pointer;
  margin-right: 50px;

  > .toggle-container {
    width: 80px;
    height: 42px;
    border-radius: 30px;
    background-color: gray;

    @media screen and (max-width: 500px){
      width: 50px;
      height: 28px;
    }
  }

  > .toggle--checked {
    background-color: #ea5028;
    transition : 0.5s
  }

  > .toggle-circle {
    position: absolute;
    top: 1.7px;
    left: 2px;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: rgb(255,254,255);
    transition : 0.5s

  } >.toggle--checked {
    left: 40px;
    transition : 0.5s
  }

  @media screen and (max-width: 500px){
    margin-right: 20px;

    > .toggle-circle {
      position: absolute;
      top: 1.5px;
      left: 2px;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: rgb(255,254,255);
      transition : 0.5s

    } >.toggle--checked {
      left: 23px;
      transition : 0.5s
    }
  
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
  width: 115px;
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
  width: 115px;
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

//가방 정렬
const SortingOptions = styled.div`
  display: flex;
  align-items: center;
`;

const SortingLabel = styled.label`
  font-size: 24px;
  margin-right: 10px;
`;

const SortingButton = styled.button`
  font-size: 24px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.button1};

  &:hover {
    text-decoration: underline;
  }
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

//베너 이미지
const Banner_img = styled.img`
  
  @media screen and (max-width: 500px){
    width: 400px;
  }
`;

//이모지
const Emoji = styled.figure`
  width: 33px;
  height: 33px;
  border-radius: 100%;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;


SwiperCore.use([Navigation, Pagination])

const SelectedSortingOption = styled(SortingButton)`
  color: #ff5733; /* Change to your desired color */
  font-weight: bold;
`;

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

  /*가방 리스트 가져오기*/
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
        <SwiperSlide><Banner_img className="banner" alt="banner_01" src="/banner1.png" /></SwiperSlide>
        <SwiperSlide><Banner_img className="banner" alt="banner_02" src="/banner2.png" /></SwiperSlide>
        <SwiperSlide><Banner_img className="banner" alt="banner_03" src="/banner3.png" /></SwiperSlide>
        <SwiperSlide><Banner_img className="banner" alt="banner_04" src="/banner4.png" /></SwiperSlide>
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

      <Bag_select_container>
        <Bag_select_text>
        <SortingOptions>
          <SortingLabel>
            {sortByLatest ? '시간순' : '최신순'}:
          </SortingLabel>
          {sortByLatest ? (
            <SelectedSortingOption onClick={toggleSortingOrder}>
              최신순
            </SelectedSortingOption>
          ) : (
            <SelectedSortingOption onClick={toggleSortingOrder}>
              시간순
            </SelectedSortingOption>
          )}
        </SortingOptions>
        </Bag_select_text>
      </Bag_select_container>

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
            <Emoji>💼</Emoji>
            가방 추가
          </Bag_add_btn>
        </Bag_add_btn_box>
        <Weather_btn_box>
          <Weather_btn onClick={openWeatherModalHandler}>
            <Emoji>🔍</Emoji>
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