import { AppBar, Box, Drawer, IconButton, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Tooltip } from '@mui/material';
import './BobsBurger.css';
import { useState } from 'react';
import { Close, MenuOpen } from '@mui/icons-material';
import BobsBurgerItem from './BobsBurgerItem';

export default function BobsBurger (props) {

    const [open, setOpen] = useState(false);

    const toggleDrawer = (toggle) => {
        setOpen(toggle);
    }

    return (
    <AppBar position="fixed">
        <Toolbar>
            <IconButton 
            edge="start"
            aria-label="open drawer"
            onClick={() => toggleDrawer(true)}>
            <MenuOpen className="bobsBurger"></MenuOpen>
            </IconButton>
            <h1 className="bobsBurgerTitle">Katrina + Ian</h1>
            <Drawer
                anchor="left"
                variant="temporary"
                open={open}
                onClose={() => toggleDrawer(false)}
                id="bobsBurgerBox">
                <Box>
                    <div className="bobsBurgerClose">
                        <Tooltip title="Close Menu">
                            <IconButton onClick = {() => {toggleDrawer(false);}}>
                                <Close className="bobsCloseIcon"></Close>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className="bobsBurgerItemList">
                    {props.links.map(link => 
                        <BobsBurgerItem link = {link}></BobsBurgerItem>
                        // <a href={link.route}
                        //     key={`mobile-navbar-${link.route}`}
                        //     target={`${link.text === "Registry" ? "" : ""}`}
                        //     className="bobsBurgerItem">
                        //     <div className="bobsBurgerItemContent">
                        //         <div>{link.component}</div>
                        //         <div className="bobsBurgerLinkText">{link.text}</div>
                        //     </div>

                        //             {(link.items && link.items.length > 0) &&
                        //                             <Menu 
                        //                             id={`nav-submenu-${link.route}`}
                        //                             anchorEl = {anchorEl}
                        //                             open = {open}
                        //                             onClose = {() => {handleClose()}}
                        //                             MenuListProps = {{
                        //                                 'aria-labelledby': `nav-submenu-button-${link.route}`
                        //                             }}
                        //                             >
                        //                             {link.items.map(item =>
                        //                                     <MenuItem key={`nav-submenu-item-${item.route}`}
                        //                                         onClick = {() => {
                        //                                             handleClose();
                        //                                             history.push(item.route);
                        //                                         }}>
                        //                                         <ListItemIcon>
                        //                                             {item.component}
                        //                                         </ListItemIcon>
                        //                                         <ListItemText>
                        //                                             {item.text}
                        //                                         </ListItemText>
                        //                                     </MenuItem>
                        //                             )}
                        //                         </Menu>}

                        // </a>
                    )}
                    </div>
                </Box>
            </Drawer>
        </Toolbar>
    </AppBar>
    )
}