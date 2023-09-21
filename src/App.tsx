import React from 'react';
import './App.css';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './Components/Mainpage/Header';
import Mainpage from './Pages/Mainpage';

import Backpack from './Pages/Bagpack';
import FriendSet from './Pages/FriendSet';

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <Router>
          <Routes>
            {/* Header,Footer를 보여주고 싶은 컴포넌트 */}
            <Route element={<Header />}>
              <Route path="/main" element={<Mainpage />} />
            </Route>
          </Routes>
          <Routes>
            {/* Header,Footer를 안 보여주고 싶은 컴포넌트 */}
            <Route path="/bag-pack" element={<Backpack />} />
            <Route path="/friend-set" element={<FriendSet />} />
          </Routes>
        </Router>
      </RecoilRoot>
    </div>
  );
}

export default App;
