import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function NavList (props) {
    const location = useLocation();
    const pathname = location.pathname;
    const search = location.search;
    const hash = location.hash;

    return (
        <div className="flexed col centered justified">
            <div className="flexed navList">
                {props.links.map(link => 
                    pathname !== link.route || link.route === "/Logistics" && 
                    <a href={link.route}
                        className="flexed col centered justified navListItem">
                        <div>{link.component}</div>
                        <div>{link.text}</div>
                    </a>
                )}
            </div>
            </div>
        
    );

} export default NavList;