

//css
import "../css/HomeCover.css";


const HomeCover = () => {
  return (
    <>

      <section id="home-cover">

        <div className="scroll-container">
          <div className="scrolling">
            <div className="">
              <img className="img-fluid" src={`../assets/cover1.png`} />
              <img className="img-fluid" src={`../assets/cover3.png`} />
              <img className="img-fluid" src={`../assets/responsive2.png`} />
            </div>

          </div>
        </div>
      </section>


    </>
  )
}

export default HomeCover

