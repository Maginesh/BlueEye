import { useTheme } from '@mui/material/styles';


 import logo from 'assets/images/logo.png';


const Logo = () => {
  const theme = useTheme();

  return (
  
   <>
     <img src={logo} alt="logo bg" width="100" />
      <h1>BLUEEYE</h1>
    </>
  );
};

export default Logo;
