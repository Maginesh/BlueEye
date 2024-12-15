import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// ==============================|| AUTH BACKGROUND ||============================== //

export default function AuthBackground() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh', // Full screen height
        backgroundColor: '#E0ECFA', // Hex background color
        zIndex: -1,
        filter: 'blur(18px)', // Optional: if you want to keep the blur effect
      }}
    />
  );
}
