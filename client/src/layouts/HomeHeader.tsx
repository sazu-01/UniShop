
//packages
import { useEffect , useState } from "react";
import { Link } from "react-router-dom";

//components
import HomeHeaderMenu from "../components/HomeHeaderMenu";

//layouts
import Offcanvas from "./Offcanvas";

//css
import "../css/HomeHeader.css"

const HomeHeader = () => {
  
  //declared state variable using useState hook
  const [isSticky, setIsSticky] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {

    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset; //get the current scroll position
      const isScrollingDown = currentScrollPosition > prevScrollPos; //check if scrolling down

      if (isScrollingDown && !isSticky) {
        setIsSticky(true);
      } else if (!isScrollingDown && isSticky && currentScrollPosition === 0) {
        setIsSticky(false);
      }
      setPrevScrollPos(currentScrollPosition); //update previous scroll position
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [isSticky, prevScrollPos]);

  return (
    <>
      <section id="header" className={isSticky ? "sticky" : ""}>
        <div className="inner">
          <div className="content">
            <div className="logo-div" >
              <Link to={`/`}>unishop</Link>
            </div>
            <HomeHeaderMenu />
            <Offcanvas />
          </div>
        </div>
      </section>
    </>
  )
}

export default HomeHeader