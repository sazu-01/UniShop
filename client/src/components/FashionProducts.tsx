//packages
import { Link } from 'react-router-dom'
import Slider from "react-slick";

//hook
import { useAppSelector } from '../app/hook';

//type
import { ProductType } from '../types/productSlicetypes';

//css
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

//icons 
import { BsArrowRightShort, BsArrowLeftShort } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';


const FashionProducts = () => {
  
  function SampleNextArrow(props:any) {
    const {className , style , onClick} = props;
    return (
      <BsArrowLeftShort
      className={className}
      style={{...style}}
      onClick={onClick}
      />
    )
  }

  function SamplePrevArrow(props:any){
    const {className,style,onClick} = props;
    return (
      <BsArrowRightShort
      className={className}
      style={{...style}}
      onClick={onClick}
      />
    )
  }

  var settings = {
    dots: false,
    infinite: false,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    responsive: [
      {
        breakpoint: 1115,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: false,
          speed: 800,
          dots: false,
        },
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          speed: 800,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 1,
          speed: 800,
          dots: false,
          infinite: false,
        },
      },
      {
       breakpoint : 670,
       settings: {
        slidesToShow : 2,
        slidesToScroll : 2,
        initialSlide : 1,
        speed: 800,
        dots : false,
        infinit : false,
       }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          speed: 800,
          dots: false,
          infinit : false,
        },
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 800,
          dots: false,
          infinit : false,
        },
      },
      {
        breakpoint: 300,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 800,
          dots: false,
          infinit:false,
        },
      },
    ],
  };

    const {products} = useAppSelector((state)=>state.products);
    
  return (
    <>
    <div className="slide-header">
      <p>categroy name</p>
      <Link to={`/`}>see all</Link>
    </div>

    <Slider {...settings} className="">

     { products && products.length > 0 ? (
            products.map((pro:ProductType)=>{
              const {_id,title,slug,images,price} = pro;
              return (
                <div key={_id} className="product">
                  <Link to={`/product/${slug}`}>

                   <div className="product-img">
                    <img src={`${images[0]}`} alt="" className="home-pro-img" />
                   </div>

                   <div className="pro-content">
                    <p className="title">{title}</p>
                    <p className="rating"><FaStar /><FaStar/></p>
                  </div>

                  </Link>

                <div className="addcart">
                  <p className='price'>{price}</p>
                  <button>add to cart</button>
                </div>
                 

                  
                </div>
              )
            })
        ) : ( 
        <div>no products loading</div>
        )}
      
    </Slider>

    </>
  )
}

export default FashionProducts