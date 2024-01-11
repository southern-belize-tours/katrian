import NavListItem from './NavListItem.js'

function NavList (props) {

    return (
        <div className="flexed col centered justified padded-top-bottom">
            <div className="flexed navList">
                {props.links.map(link =>
                    <NavListItem link={link}></NavListItem>
                )}
            </div>
        </div>
    );

} export default NavList;