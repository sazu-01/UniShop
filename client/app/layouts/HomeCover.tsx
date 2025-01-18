
//packages
import Image from "next/image";

//css
import "@/css/HomeCover.css";

import cover1 from "@/public/cover1.png";
import cover3 from "@/public/cover3.png";
import responsive2 from "@/public/responsive2.png";



const HomeCover = () => {
  return (
    <>

      <section id="home-cover">

        <div className="scroll-container">
          <div className="scrolling">
            <div className="">
              <Image className="img-fluid" src={cover1} alt="" />
              <Image className="img-fluid" src={cover3} alt="" />
              <Image className="img-fluid" src={responsive2} alt="" />
            </div>

          </div>
        </div>
      </section>


    </>
  )
}

export default HomeCover

