
//packages
import Link from "next/link";

//css
import "@/css/HomeHeaderMenu.css"


const HomeHeaderMenu = () => {
  return (
    <div className="menu">
      <a className="link" href="#demos">Demos</a>
      <a className="link" href="#feauters">Features</a>
      <a className="link" href="#technologies">Technologies</a>
      <a className="link" href="#documentation">Documentation</a>
      <a className="link" href="#support">Support</a>
      <Link className="purchase" href="/">Buy Now</Link>
    </div>
  );
};

export default HomeHeaderMenu;