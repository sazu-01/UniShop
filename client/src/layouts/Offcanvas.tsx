
//packages
import { Link } from 'react-router-dom';

//icons
import { MdOutlineClose } from "react-icons/md";

//css
import "../css/Offcanvas.css";

//component
import HomeHeaderMenu from '../components/HomeHeaderMenu';

const Offcanvas = () => {
    return (
        <>

            <div id='offcanvas'>

                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" className="toggle" data-src="/assets/images/icons/menu.svg" xmlnsXlink="http://www.w3.org/1999/xlink" role="img"
                    data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"
                >
                    <path d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z" fill={`#CA7430`}></path>
                    <path d="M2 12.0322C2 11.4799 2.44772 11.0322 3 11.0322H21C21.5523 11.0322 22 11.4799 22 12.0322C22 12.5845 21.5523 13.0322 21 13.0322H3C2.44772 13.0322 2 12.5845 2 12.0322Z" fill={`#CA7430`}></path>
                    <path d="M3 17.0645C2.44772 17.0645 2 17.5122 2 18.0645C2 18.6167 2.44772 19.0645 3 19.0645H21C21.5523 19.0645 22 18.6167 22 18.0645C22 17.5122 21.5523 17.0645 21 17.0645H3Z" fill={`#CA7430`}></path>
                </svg>


                <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex={-1} id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                    <div className="offcanvas-header">
                        <Link to={`/`} className="offcanvas-title" id="offcanvasWithBothOptionsLabel">unishop</Link>
                        <MdOutlineClose className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />

                    </div>
                    <div className="offcanvas-body">
                        <HomeHeaderMenu />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Offcanvas