import './NavList.css';

function NavListItem ({link}) {

    return (
        <a href={link.route}
            id={`nav-list-item-${link.route}`}
            className="flexed col centered spacedBetween navListItem">
            {/* {(link.items && link.items.length > 0) &&
                <div className = "nav-submenu">
                    {link.items.map(item =>
                        <div className = "nav-submenu-item">{item.text}</div>    
                    )}
                </div>
            } */}
            <div className="navListItemIcon">{link.component}</div>
            <div className="navListItemText">
                {link.text}
                {(link.items && link.items.length > 0) &&
                <div className = "nav-submenu">
                    {link.items.map(item =>
                        <div className = "nav-submenu-item">{item.text}</div>    
                    )}
                </div>
            }
            </div>
        </a>
    );
} export default NavListItem;