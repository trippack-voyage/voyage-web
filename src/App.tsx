import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
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
            <Route path="/" element={<StartPage />} />
            <Route path="/ProfilePage" element={<ProfilePage />} />
            <Route path="/MainPage" element={<MainPage />} />
            <Route path="/MyPage" element={<MyPage />} />
          </Routes>
        </Router>
      </RecoilRoot>
    </>
  );
}

export default App;
