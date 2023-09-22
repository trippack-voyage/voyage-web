import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './Components/Mainpage/Header';
import MainBagPage from './Pages/MainBagPage';

import Backpack from './Pages/Bagpack';
import FriendSet from './Pages/FriendSet';
import { GlobalStyle } from './GlobalStyle';
import StartPage from './Page/StartPage';
import ProfilePage from './Page/ProfilePage';
import MainPage from './Page/MainPage';
import MyPage from './Page/MyPage';

function App() {
  return (
    <>
      <GlobalStyle />
      <RecoilRoot>
        <Router>
          <Routes>
            {/* Header,Footer를 보여주고 싶은 컴포넌트 */}
            <Route element={<Header />}>
              <Route path="/main-bag" element={<MainBagPage />} /> {/*내 가방 설정*/}
              <Route path="/MyPage" element={<MyPage />} />
              <Route path="/MainPage" element={<MainPage />} />
            </Route>
          </Routes>
          <Routes>
            {/* Header,Footer를 안 보여주고 싶은 컴포넌트 */}
            <Route path="/ProfilePage" element={<ProfilePage />} /> {/*시작 프로필 설정*/}
            <Route path="/bagpack" element={<Backpack />} />
            <Route path="/friend-set" element={<FriendSet />} />
            <Route path="/" element={<StartPage />} /> {/*시작페이지 */}
          </Routes>
        </Router>
      </RecoilRoot>
    </>
  );
}

export default App;
