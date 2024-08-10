//packages
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

//utilities
import { api } from "../utili/axiosConfig";

//component
import Images from "../components/Images";

//icons
import { AiOutlineStar , AiFillStar} from 'react-icons/ai';

//css
import "../css/SingleProduct.css";

//types
import { singleProductType } from "../types/productTypes";

const SingleProduct = () => {
    
    
    //state to store single product data
    const [SingleProduct, setSingleProduct] = useState<singleProductType | null>(null);

    const { slug } = useParams();

    //function to fetch single product data from api 
    const getSingleProduct = async () => {
        try {
            const fetchSingleProduct = await api.get(`/products/${slug}`);
            setSingleProduct(fetchSingleProduct.data?.payload?.singleProduct);

        } catch (error: any) {
            console.log(error.response?.data?.message);
        }
    }

    //fetch the product data when component mount
    useEffect(() => {
        getSingleProduct();
    }, [])

    //show loading state while fetching data
    if(!SingleProduct){
        return <div>loading...</div>
    }

    //destructure single product data 
    const { title, price, brand, category, images, quantity } = SingleProduct;
       console.log(images);
       
    //render single product details
    return (
        <>
            <div id="single-product-page">
                <div className="single-product">
                    {/*component for images*/}
                    <Images imgs={images} />
                     
                     {/*render single product details */}
                    <div className="single-product-details">
                        <p className="title">{title}</p>
                        <div className="brand">brand : {brand}</div>
                        <p>see more : <Link to={`/`}>{category?.slug}</Link></p>
                        <p>in stock : {quantity}</p>
                        <div className="star">
                            <AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiOutlineStar />
                        </div>
                        <div className="price">price: ${price}</div>
                        <div className="single-product-button">
                          <Link to={`/cart`}><button className="add-to-cart">add to cart</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleProduct