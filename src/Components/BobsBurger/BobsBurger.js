import { AppBar, Box, Drawer, IconButton, Menu, MenuItem, MenuList, Toolbar, Tooltip } from '@mui/material';
import './BobsBurger.css';
import { useState } from 'react';
import { Close, MenuOpen } from '@mui/icons-material';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

export default function BobsBurger (props) {
    const location = useLocation();
    const pathname = location.pathname;

    const [open, setOpen] = useState(false);

    const toggleDrawer = (toggle) => {
        setOpen(toggle);
    }

    return (
        <AppBar position="fixed">
            <Toolbar>

                {/* hamburger icon shows the drawer on click */}
                <IconButton 
                edge="start"
                // color="inherit"
                // color="secondary"
                aria-label="open drawer"
                onClick={() => toggleDrawer(true)}>
                {/* sx={{ mr: 2, display: { xs: 'block', sm: 'none',}, }}>    */}
                {/* <Menu /> */}
                {/* <MenuList></MenuList> */}
                <MenuOpen className="bobsBurger"></MenuOpen>
                {/* <Close></Close> */}
                </IconButton>

                {/* The outside of the drawer */}
                <Drawer
                    anchor="left" //from which side the drawer slides in
                    variant="temporary" //if and how easily the drawer can be closed
                    open={open} //if open is true, drawer is shown
                    onClose={() => toggleDrawer(false)} //function that is called when the drawer should close
                    onOpen={() => toggleDrawer(true)} //function that is called when the drawer should open
                    id="bobsBurgerBox"
                >
                    
                    <Box>
                    {/* The inside of the drawer */}
                    {/* Bar */}
                        <div className="bobsBurgerClose">
                            <Tooltip title="Close Menu">
                                <IconButton onClick = {() => {toggleDrawer(false);}}>
                                    <Close className="bobsCloseIcon"></Close>
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div className="bobsBurgerItemList">
                        {props.links.map(link => 
                        // pathname !== link.route || link.route === "/Logistics" && 
                            <a href={link.route}
                                className="bobsBurgerItem">
                                <div className="bobsBurgerItemContent">
                                    <div>{link.component}</div>
                                    <div className="bobsBurgerLinkText">{link.text}</div>
                                </div>
                                {/* className="flexed col centered justified navListItem"> */}
                            </a>
                        )}
                        </div>
                    </Box>
                </Drawer>

            </Toolbar>
        </AppBar>
    )
}