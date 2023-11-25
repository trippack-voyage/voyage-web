import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";

type Bag = {
  bagId: number;
  bagName: string;
  startDate: string;
  endDate: string;
  status: string;
};

type TripInfo = {
  numberOfLocations: number;
  totalTripDuration: number;
  uniqueLocations: string[];
};

function MyBagCalendar() {
  const [bagList, setBagList] = useState<Bag[]>([]);
  const [tripInfo, setTripInfo] = useState<TripInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const kakaoId = localStorage.getItem('kakaoId');
    axios
      .get('/bag/triplist', {
        params: {
          kakaoId: kakaoId,
        },
      })
      .then((response) => {
        setBagList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('AxiosError:', error);
        setLoading(false);
      });

    axios
      .get(`/bag/trip-info/${kakaoId}`)
      .then((response) => {
        setTripInfo(response.data);
      })
      .catch((error) => {
        console.error('AxiosError:', error);
      });
  }, []);

  //메인화면 이동
  const navigate = useNavigate();
  const onClickBack = () => {
    navigate("/bag-list");
  };


  return (
    <div style={{ textAlign: 'center', fontFamily: 'S-CoreDream-3Light' }}>
      <IoArrowBack
        size="50"
        style={{ position: 'absolute', left: '100px', top: '20px', cursor: 'pointer' }}
        onClick={onClickBack}
      />
      <h1 style={{ fontSize: '40px', fontWeight: 'bold', paddingTop: '100px' }}>나의 여행 달력</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <p style={{ fontSize: '20px', fontFamily: 'S-CoreDream-3Light' }}>
            총 여행기간 {tripInfo?.totalTripDuration}일 🌍
          </p>
          <p style={{ fontSize: '20px', fontFamily: 'S-CoreDream-3Light', marginTop: '10px' }}>
            지금까지 총 {tripInfo?.numberOfLocations}개 도시를 여행하였습니다 ✈️
          </p>
          <p style={{ fontSize: '20px', fontFamily: 'S-CoreDream-3Light', marginTop: '10px' }}>
            방문한 도시: {tripInfo?.uniqueLocations.join(', ')}
          </p>
          <BagCalendar bagList={bagList} />
        </div>
      )}
    </div>
  );
}

const BagCalendar = ({ bagList }: { bagList: Bag[] }) => {
  const localizer = momentLocalizer(moment);

  // 달력에 표시할 이벤트 데이터로 변환
  const events = bagList.map((bag) => {
    const startDate = new Date(bag.startDate);
    const endDate = new Date(bag.endDate);

    return {
      id: bag.bagId,
      title: bag.bagName,
      start: startDate,
      end: endDate,
      allDay: true,
      status: bag.status,
    };
  });

  return (
    <div style={{ margin: '20px auto', width: '90%', fontFamily: 'Your Font, sans-serif' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={(event, start, end, isSelected) => {
          const color = event.status === 'confirmed' ? '#ffff' : '#EA5028';
          return {
            style: {
              backgroundColor: color,
            },
          };
        }}

      />
    </div>

  );
};

export default MyBagCalendar;