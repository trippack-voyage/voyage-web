import React, { useEffect, useState } from 'react';
import Logo from '../../img/logo_info.png';

declare global {
  interface Window {
    Kakao: any;
  }
}

const KakaoShare = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initKakao = async () => {
    if (window.Kakao) {
      const kakao = window.Kakao;

      if (!kakao.isInitialized()) {
        await new Promise((resolve) => {
          kakao.init('40003c9e649398766b7dc9c19e696bef', resolve);
        });
        setInitialized(true);
      }
    }
  };

  useEffect(() => {
    initKakao();
    console.log('Kakao SDK Initialized');
  }, []);

  const kakaoButton = async () => {
    if (window.Kakao) {
      const kakao = window.Kakao;

      if (!kakao.isInitialized()) {
        await initKakao();
      }

      kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '여행 파트너로 가방에 초대합니다!\n함께 멋진 여행을 떠나볼까요? ',
          description: '함께. 쉽게, 똑똑하게 찜 싸는 방법',
          imageUrl: 'https://source.unsplash.com/featured/?travel',
          link: {
            mobileWebUrl: 'http://localhost:3000',
            webUrl: 'http://localhost:3000',
          },
        },
        social: {
          likeCount: 286,
          commentCount: 45,
          sharedCount: 845,
        },
        buttons: [
          {
            title: '초대가방 가기',
            link: {
              mobileWebUrl: 'http://localhost:3000',
              webUrl: 'http://localhost:3000',
            },
          },
          {
            title: '회원가입 가기',
            link: {
              mobileWebUrl: 'http://localhost:3000',
              webUrl: 'http://localhost:3000',
            },
          },
        ],
      });
    }
  };

  return (
    <button
      style={{
        fontSize: '22px',
        fontWeight: '700',
        color: 'white', 
        height: '20px',
      }}
      onClick={kakaoButton}
    >
      KAKAO 링크공유
    </button>
  );
};

export default KakaoShare;
