import { useLocation } from 'react-router-dom/cjs/react-router-dom.js';
import NavListItem from './NavListItem.js'
import { Tooltip } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

/**
 * Helper function to avoid excessive computation and rerenders when detecting overflow
 * It will only be called once ever ms milliseconds
 * 
 * @param {callback function} fn 
 * @param {interval for the computational function to be called} ms 
 * @returns 
 */
function debounce(fn, ms) {
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
        timer = null;
        fn.apply(this, arguments);
        }, ms);
    };
}

function NavList (props) {
    const ref = useRef(null);
    const location = useLocation();
    const [isOverflowing, setIsOverflowing] = useState(false);
    // Compute the size of the wedding logos based on the screen width
    const [iconSize, setIconSize] = useState(100);
    // How far to move the list when the arrows are clicked
    const [translate, setTranslate] = useState(0);
    const [initialWidth, setInitialWidth] = useState(0);

    /**
     * When component is initialized it starts checking for overflow
     */
    useEffect(() => {
        const checkOverflow = () => {
            const element = ref.current;
            if (element) {
              // Check for horizontal overflow
              const hasHorizontalOverflow = element.scrollWidth > element.clientWidth;
              // Check for vertical overflow
              const hasVerticalOverflow = element.scrollHeight > element.clientHeight;
              // Set state based on overflow status
              setIsOverflowing(hasHorizontalOverflow || hasVerticalOverflow);
              setTranslate(0);
            //   if (hasHorizontalOverflow || hasVerticalOverflow) {
            //     setTranslate(0);
            //   }
            }
          };

        // Wrap checkOverflow with debounce
        const debouncedCheckOverflow = debounce(checkOverflow, 100);
      
        // Run once and whenever the window resizes
        debouncedCheckOverflow();
        window.addEventListener('resize', debouncedCheckOverflow);
      
        // Cleanup listener
        return () => window.removeEventListener('resize', debouncedCheckOverflow);
      }, [ref]);

    const getRefTranslate = () => {
        const element = ref.current;
        if (element) {
            if (initialWidth == 0) {
                setInitialWidth(element.scrollWidth);
            }
            // console.log("Translating right...");
            // console.log(initialWidth);
            // console.log(element.clientWidth);
            // console.log(element.scrollWidth);
            // console.log(translate);
            // return element.clientWidth + translate < element.scrollWidth;
            return element.clientWidth + translate < initialWidth;
        }
        return false;
    }

    return (
        <div className="flexed col centered justified">
            <div className="navListContainer">
                {isOverflowing &&
                    <Tooltip title = {`${translate > 0 ? "Previous Item" : "No Previous Items"}`}> 
                        <div className={`leftNavArrow ${translate > 0 ? "" : "disabled"}`}
                            onClick = {() => {setTranslate(translate - iconSize - 10)}}>

                        </div>
                    </Tooltip>
                }
                <div className={`navListBox`}
                    ref={ref}>
                    <div className="flexed navList"
                        style={{transform: `translateX(-${translate}px)`}}>
                        {props.links.map(link =>
                            location.pathname !== link.route &&
                            <NavListItem key={`nav-list-item-${link.route}`} 
                                link={link}></NavListItem>
                        )}
                    </div>
                </div>
                {isOverflowing &&
                <Tooltip title = {`${getRefTranslate() ? "Next Item" : "No Further Items"}`}>
                        <div className = {`rightNavArrow ${getRefTranslate() ? "" : "disabled"}`}
                            onClick = {() => {
                                if (translate == 0) {
                                    setInitialWidth(ref.current.scrollWidth);
                                }
                                if (getRefTranslate()) {
                                    setTranslate(translate + iconSize + 10)};
                                }
                            }>
                        </div>
                    </Tooltip>
                }
            </div>
            
        </div>
    );

} export default NavList;