export const lightTheme = {
    body: '#f6f8f9',
    list: '#f6f8f9',
    text: '#1a1919',
    toggleBackground: '#fcfcfc',
    mainColor: '#FF541E',
    navBar: '#fcfcfc',
    headerBackground: '#ffffff',
  };
  
  export const darkTheme = {
    body: '#252424',
    list: '#000000',
    text: '#fcfcfc',
    toggleBackground: '#3b3b3b',
    mainColor: '#fcfcfc',
    navBar: '#303030',
    headerBackground: '#000000',
  };
  
  export const theme = {
    lightTheme,
    darkTheme,
  };

  export type Theme = typeof lightTheme;