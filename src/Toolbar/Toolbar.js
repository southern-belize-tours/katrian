import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
// import MenuItemLink from './MenuItemLink.js'
import MenuItem from '@mui/material/MenuItem';
// import { Link } from 'react-router-dom'; // Import Link from React Router


export default function WeddingToolbar({links}) {
  // const [open, setOpen] = React.useState(false);
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    // setOpen(!open);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    // setOpen(false);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="weddingToolbar">
          <IconButton
            className="white"
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
            id="hamburger-button"
            aria-controls={open ? 'toolbar-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MenuIcon/>
          </IconButton>
          <Menu
            id="toolbar-menu"
            aria-labelledby="hamburger-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {links.map(link => 
              <a href={link.route} className="no-decorate black" key={`menu-item-${link.text}`}>
              <MenuItem to={link.route}>
                  <span className="no-decorate">{link.text}</span>
                  {/* <a href={link.route}>{link.text}</a> */}
              </MenuItem>
              </a>
            )}
          </Menu>
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography> */}
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}