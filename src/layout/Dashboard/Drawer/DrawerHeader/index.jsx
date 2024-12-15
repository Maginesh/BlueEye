import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';

import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from 'components/logo';
import { Typography } from '@mui/material';
import logo from '../../../../assets/images/logo.png'


export default function DrawerHeader({ open }) {
  const theme = useTheme();

  return (
    <DrawerHeaderStyled theme={theme} open={!!open}>
      <img class="h-12 w-12" src = {logo}></img> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Typography variant="h5">BLUE EYE</Typography>
    </DrawerHeaderStyled>
  );
}

DrawerHeader.propTypes = { open: PropTypes.bool };
