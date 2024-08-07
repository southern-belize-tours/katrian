import { AppBar, Box, Drawer, IconButton, Toolbar, Tooltip } from '@mui/material';
import './BobsBurger.css';
import { useState } from 'react';
import { Close, MenuOpen } from '@mui/icons-material';

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
                    // pathname !== link.route || link.route === "/Logistics" && 
                        <a href={link.route}
                            key={`mobile-navbar-${link.route}`}
                            target={`${link.text === "Registry" ? "" : ""}`}
                            className="bobsBurgerItem">
                            <div className="bobsBurgerItemContent">
                                <div>{link.component}</div>
                                <div className="bobsBurgerLinkText">{link.text}</div>
                            </div>
                        </a>
                    )}
                    </div>
                </Box>
            </Drawer>
        </Toolbar>
    </AppBar>
    )
}