
//packages
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

//utilities
import { api } from "../utili/axiosConfig";

//component
import Images from "../components/Images";
import AddToCart from "../components/AddToCartButton";
import Quantity from "../components/Quantity";

//icons
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

//css
import "../css/SingleProduct.css";

//types
import { singleProductType } from "../types/productTypes";

//hooks
import { useAppSelector } from "../app/hook";

const SingleProduct = () => {

    const { slug } = useParams();

    //state to store single product data
    const [SingleProduct, setSingleProduct] = useState<singleProductType | null>(null);

    //state to store boolean result of current singleproduct in cart or not 
    const [productInCart, setProductInCart] = useState(false);

    //get productQuantity of user select 
    const {productQuantity} = useAppSelector((state)=> state.productQuantity);

    //get the cart object from slices
    const { cart } = useAppSelector((state) => state.cart);

    //function to fetch single product data from api 
    const getSingleProduct = async () => {
        try {
            const fetchSingleProduct = await api.get(`/products/${slug}`);
            setSingleProduct(fetchSingleProduct.data?.payload?.singleProduct);

        } catch (error: any) {
            console.log(error.response?.data?.message);
        }
    }
    
    //fetch the getSingleProduct function whenever reload the page 
    useEffect(()=>{
      getSingleProduct();
    },[])


    //fetch the product data when component mount
    useEffect(() => {
        if (SingleProduct) {
            let isProductInCart = cart.some((item) => item._id === SingleProduct._id)
            setProductInCart(isProductInCart);
        }
    }, [SingleProduct,cart])

    //show loading state while fetching data
    if (!SingleProduct) {
        return <div>loading...</div>
    }

    //destructure single product data 
    const { _id, title, price, brand, category, images, quantity } = SingleProduct;

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
                        {/*Quantity component for select quantity of product*/}
                        <Quantity />
                        <div className="single-product-button">
                            {/*AddToCart component for add product in cart*/}
                            {<AddToCart productInCart={productInCart} data={{ _id, price, productQuantity, title, slug, images, quantity }}  />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleProduct