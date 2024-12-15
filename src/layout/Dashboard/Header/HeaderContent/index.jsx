import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

import Profile from './Profile';
import MobileSection from './MobileSection';

import { GithubOutlined } from '@ant-design/icons';


export default function HeaderContent() {
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <>
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </>
  );
}
