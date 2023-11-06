export const lightTheme = {
    body: '#f6f8f9',
    text: '#363537',
    toggleBackground: '#fcfcfc',
    mainColor: '#e6328d',
    navBar: '#fcfcfc',
  };
  
  export const darkTheme = {
    body: '#252424',
    text: '#fcfcfc',
    toggleBackground: '#3b3b3b',
    mainColor: '#fcfcfc',
    navBar: '#303030',
  };
  
  export const theme = {
    lightTheme,
    darkTheme,
  };

  export type Theme = typeof lightTheme;