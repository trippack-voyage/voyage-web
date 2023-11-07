import React, { createContext } from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './Components/Mainpage/Header';
import MainBagPage from './Page/MainBagPage';

import Bagpack from './Page/Bagpack';
import FriendSet from './Page/FriendSet';
import BagCalendar from './Page/BagCalendar';
import ChatGPT from './Page/ChatGPT';
import { GlobalStyle } from './GlobalStyle';
import StartPage from './Page/StartPage';
import OAuth2RedirectHandeler from './Page/OAuth2RedirectHandeler';

import DarkModeToggle from './Components/DarkModeToggle'; 

import { lightTheme, darkTheme, Theme } from './theme';
import { useDarkMode } from './hooks/useDarkMode';
import { ThemeProvider } from 'styled-components';


interface ContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ContextProps>({
  theme: lightTheme,
  toggleTheme: () => {
    return null;
  },
});

function App() {
const isStartPage = window.location.pathname === '/'; 
const isVisible = !isStartPage; // StartPage인 경우에만 isVisible을 false로 지정

const { theme, toggleTheme } = useDarkMode(isVisible);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme === lightTheme ? lightTheme : darkTheme}>
      <GlobalStyle />
        <DarkModeToggle isVisible={isVisible} /> 
      <RecoilRoot>
        <Routes>
          <Route element={<Header />}>
            <Route path="/bag-list" element={<MainBagPage />} />
          </Route>
          <Route path="/bagpack/:bagId" element={<Bagpack />} />
          <Route path="/friend-set" element={<FriendSet />} />
          <Route path="/bag-calendar" element={<BagCalendar />} />
          <Route path="/chat-gpt" element={<ChatGPT />} />
          <Route path="/" element={<StartPage />} />
          <Route path="api/oauth/token" element={<OAuth2RedirectHandeler />}></Route>
        </Routes>  
      </RecoilRoot>

      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

<Route path="api/oauth/token" element={<OAuth2RedirectHandeler />}></Route>

export default App;
