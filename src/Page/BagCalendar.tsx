import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

type Bag = {
  bagId: number;
  bagName: string;
  startDate: string;
  endDate: string;
  status: string;
};

function MyBagCalendar() {
  const [bagList, setBagList] = useState<Bag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const kakaoId = localStorage.getItem('kakaoId');
    axios
      .get('/bag/list', {
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
  }, []);

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Your Font, sans-serif' }}>
      <h1 style={{ fontSize: '40px', fontWeight: 'bold', paddingTop: '40px' }}>나의 여행 달력</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <BagCalendar bagList={bagList} />
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
