//packages
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

//utilities
import { api } from "../utili/axiosConfig";

//component
import Images from "../components/Images";
import AddToCart from "../components/AddToCartButton";

//icons
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

//css
import "../css/SingleProduct.css";

//types
import { singleProductType } from "../types/productTypes";
import { useAppSelector } from "../app/hook";

const SingleProduct = () => {


    //state to store single product data
    const [SingleProduct, setSingleProduct] = useState<singleProductType | null>(null);

    const [productInCart, setProductInCart] = useState(false);

    const { cart } = useAppSelector((state) => state.cart);

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
        if (SingleProduct) {
            let isProductInCart = cart.some((item) => item._id === SingleProduct._id)
            setProductInCart(isProductInCart);
        }
    }, [SingleProduct, cart])

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
                        <div className="single-product-button">
                            {/*if the current singleproduct is aleready on cart render link if not then AddToCart component*/}
                            {productInCart ? <Link to={`/checkout/cart`}>
                                <button className="add-to-cart" >go to cart</button>
                            </Link> : <AddToCart product={{ _id, price, quantity, title, slug, images }} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleProduct