
//packages
import React from 'react';
import { Link } from 'react-router-dom';

//action
import { DeletToCart } from '../features/cartSlice';
import { useAppDispatch } from '../app/hook';

//css
import "../css/CartItem.css";

//icons
import { IoClose, IoAdd } from "react-icons/io5";
import { AiOutlineMinus } from "react-icons/ai";

//types
import { cartItem } from '../types/SliceTypes';


const CartItem: React.FC<{ product: cartItem }> = ({ product }) => {

    //destructure the product properties
    const { _id, images, title, price, quantity } = product;

    const dispatch = useAppDispatch();

    //delete the product from cart
    const deleteItem = () => {
        dispatch(DeletToCart(_id));
    }

    return (
        <>

            <div id="cart-item">
                {/*product image*/}
                <img src={images[0]} alt="" />
                <div className="product-details">
                    
                    {/*product title */}
                    <Link className="title" to={``}><div>{title}</div></Link>

                     {/*product delete buton */}
                    <div className="delete-item">
                        <button className="delete-item-btn" onClick={deleteItem}>
                            <div><IoClose style={{ fontSize: "2rem" }} /></div>
                        </button>
                    </div>

                     {/*quantity & price section */}
                    <div className="cart-quantity-price">
                        <div className="price">
                            <div>{price} * {quantity} </div>
                            <div>= {price * quantity}</div>
                        </div>
                        <div className="quantity">
                            <button><div><IoAdd style={{ fontSize: "2rem" }} /></div></button>
                            <div>{quantity}</div>
                            <button><div><AiOutlineMinus style={{ fontSize: "2rem" }} /></div></button>
                        </div>
                    </div>
                  {/*quantity & price section end*/}
                </div>
            </div>


        </>
    )
}

export default CartItem