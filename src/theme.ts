export const lightTheme = {
    body: '#f6f8f9',
    text: '#1a1919',
    text1: '#696969',
    toggleBackground: '#fcfcfc',
    mainColor: '#FF541E',
    navBar: '#fcfcfc',
    button: '#ffffff',
    button1:'#1a1919',
    button2:'#1a1919',
    list: '#f6f8f9',
    list1: '#1a1919',
    headerBackground: '#ffffff',
    Background1: '#fcfcfc',
    Background2: '#fcfcfc',
    Background3: '#fcfcfc',
    Background4: '#fcfcfc',
  };
  
  export const darkTheme = {
    body: '#252424',
    text: '#fcfcfc',
    text1: '#ffffff',
    toggleBackground: '#3b3b3b',
    mainColor: '#fcfcfc',
    navBar: '#303030',
    button: '#1a1919',
    button1: '#ffffff',
    button2:'#3b3b3b',
    list: '#000000',
    list1: '#fcfcfc',
    headerBackground: '#000000',
    Background1: '#121212',
    Background2: '#1E1E1E',
    Background3: '#252525',
    Background4: '#2E2E2E',

  };
  
  export const theme = {
    lightTheme,
    darkTheme,
  };

  export type Theme = typeof lightTheme;