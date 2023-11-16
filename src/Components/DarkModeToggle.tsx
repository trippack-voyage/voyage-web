import React, { ReactElement, useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../App';
import { lightTheme, Theme } from '../theme';
//아이콘
import {HiOutlineMoon} from 'react-icons/hi';
import {BsSun} from 'react-icons/bs';

interface ToggleProps {
  theme: Theme;
  isVisible: boolean; 
}

const ToggleButton = styled('button')<ToggleProps>`
  position: fixed;
  width: 125px;
  height: 45px;
  right: 1.5rem;
  bottom: 1.5rem;
  border-radius: 30px;
  cursor: pointer;
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: ${({ theme }) => theme.toggleBackground};
  color: ${({ theme }) => theme.text};
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  z-index: 10000;

  &:hover {
    filter: brightness(
      ${({ theme }) => (theme === lightTheme ? '0.9' : '1.13')}
    );
  }

  @media screen and (max-width:500px){
    width: 100px;
    height: 40px;
    bottom: 1rem;
    right: 1rem;
  }
`;

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

const ModeContent = styled.p`
  font-size: 0.8rem;

  @media screen and (max-width:500px){
    font-size: 0.7rem;
  }
`;

export default function DarkModeToggle({
  isVisible, 
}: {
  isVisible: boolean; 
})  {
  const { theme, toggleTheme } = useContext(ThemeContext);
  if (!isVisible) {
    return null; // isVisible이 false이면 null을 반환하여 아무것도 렌더링하지 않음
  }
  return (
    <ToggleButton onClick={toggleTheme} theme={theme} isVisible={isVisible}>
      {isVisible && (
        <>
          {theme === lightTheme ? (
            <>
              <Emoji>
                  <HiOutlineMoon></HiOutlineMoon>
              </Emoji>
              <ModeContent>다크 모드</ModeContent>
            </>
          ) : (
            <>
              <Emoji>
                <BsSun></BsSun>
              </Emoji>
              <ModeContent>라이트 모드</ModeContent>
            </>
          )}
        </>
      )}
    </ToggleButton>
  );
}
