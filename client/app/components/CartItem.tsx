'use client'

//packages
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
//action
import { useAppDispatch } from '../lib/hook';
import { DeletToCart } from '../lib/features/cartSlice';

//css
import "../../css/CartItem.css"

//icons
import { IoClose } from "react-icons/io5";

//types
import { cartItem } from '@/app/types/SliceTypes';

const CartItem: React.FC<{ product: cartItem }> = ({ product }) => {

    //destructure the product properties
    const { _id, images, title, discountPrice, productQuantity } = product;

    const dispatch = useAppDispatch();

    //delete the product from cart
    const deleteItem = () => {
        dispatch(DeletToCart(_id));
    }

    return (
        <>

            <div id="cart-item">
                {/*product image*/}
                <Image src={images[0]} alt="" width={500} height={500} />
                <div className="product-details">
                    
                    {/*product title */}
                    <Link className="title" href={``}><div>{title}</div></Link>

                     {/*product delete buton */}
                    <div className="delete-item">
                        <button className="delete-item-btn" onClick={deleteItem}>
                            <div><IoClose style={{ fontSize: "2rem" }} /></div>
                        </button>
                    </div>

                     {/*quantity & price section */}
                    <div className="cart-quantity-price">
                        <div className="price">
                            <div>= {discountPrice * productQuantity}</div>
                        </div>
        

                         <div className=''><p>quantity: {productQuantity}</p></div>
                    </div>
                  {/*quantity & price section end*/}
                </div>
            </div>


        </>
    )
}

export default CartItem