import { useState } from 'react';
import './NavList.css';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function NavListItem ({link}) {
    let history = useHistory();

    const [anchorEl, setAnchorEl] = useState(null);
    
    const open = Boolean(anchorEl);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <>
        <a href={link.items && link.items.length > 0 ? null : link.route}
            id={`nav-submenu-button-${link.route}`}
            aria-controls = {open ? `nav-submenu-${link.route}` : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={(e) => {
                if (link.items && link.items.length > 0) {
                    handleClick(e);
                }
            }}
            className="flexed col centered spacedBetween navListItem">
            <div className="navListItemIcon">{link.component}</div>
            <div className="navListItemText">
                {link.text}

            </div>
        </a>
        {(link.items && link.items.length > 0) &&
                        <Menu 
                        id={`nav-submenu-${link.route}`}
                        anchorEl = {anchorEl}
                        open = {open}
                        onClose = {() => {handleClose()}}
                        MenuListProps = {{
                            'aria-labelledby': `nav-submenu-button-${link.route}`
                        }}
                        >
                        {link.items.map(item =>
                                <MenuItem key={`nav-submenu-item-${item.route}`}
                                    onClick = {() => {
                                        handleClose();
                                        history.push(item.route);
                                    }}>
                                    <ListItemIcon>
                                        {item.component}
                                    </ListItemIcon>
                                    <ListItemText>
                                        {item.text}
                                    </ListItemText>
                                </MenuItem>
                        )}
                    </Menu>}
        </>
    );
} export default NavListItem;