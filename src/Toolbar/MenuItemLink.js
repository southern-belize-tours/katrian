import React from 'react';
// import { Link } from '@mui/material/Menu';
// import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import { Link } from '@mui/material';
import { useHistory } from 'react-router-dom/';


const MenuItemLink = ({ to }) => {
//   const navigate = useNavigate();
    // const history = useHistory();

  return (
    <MenuItem component={Link} to={to}>
    </MenuItem>
  );
};

export default MenuItemLink;