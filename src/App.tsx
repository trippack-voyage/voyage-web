import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './Components/Mainpage/Header';
import MainBagPage from './Page/MainBagPage';

import Bagpack from './Page/Bagpack';
import FriendSet from './Page/FriendSet';
import ChatGPT from './Page/ChatGPT';
import { GlobalStyle } from './GlobalStyle';
import StartPage from './Page/StartPage';
import MyPage from './Page/MyPage';
import OAuth2RedirectHandeler from './Page/OAuth2RedirectHandeler';

function App() {
  return (
    <>
      <GlobalStyle />
      <RecoilRoot>
        <Routes>
          {/* Header,Footer를 보여주고 싶은 컴포넌트 */}
          <Route element={<Header />}>
            <Route path="/bag-list" element={<MainBagPage />} /> {/*내 가방 리스트(추가)*/}
            <Route path="/mypage" element={<MyPage />} /> {/*프로필 수정*/}
          </Route>
        </Routes>
        <Routes>
          {/* Header,Footer를 안 보여주고 싶은 컴포넌트 */}
          <Route path="/bagpack/:bagId" element={<Bagpack />} /> {/*짐 설정*/}
          <Route path="/friend-set" element={<FriendSet />} /> {/*친구 설정*/}
          <Route path="/chat-gpt" element={<ChatGPT />} /> {/*chat gpt*/}
          <Route path="/" element={<StartPage />} /> {/*시작페이지 */}
          <Route path="api/oauth/token" element={<OAuth2RedirectHandeler />}></Route>
        </Routes>
      </RecoilRoot>
    </>
  );
}

export default App;