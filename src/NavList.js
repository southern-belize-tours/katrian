
function NavList (props) {

    return (
        <div className="flexed col centered justified">
            <div className="flexed navList">
                {props.links.map(link => 
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