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
    const { _id, images, title, discountPrice, productQuantity, selectedColor } = product;
    
    const dispatch = useAppDispatch();

    //finding the image matiching the selected color 
    const selectedImageObj = images.find((img) => img.color === selectedColor);

    // Use fallback if no matching color found
    const displayImage = selectedImageObj?.url?.[0] || images?.[0]?.url?.[0] || "/fallback.png";


    //delete the product from cart
    const deleteItem = () => {
        dispatch(DeletToCart(_id));
    }
    
   console.log(product);
   
    return (
        <>

            <div id="cart-item">
                {/*product image*/}
                <Image src={displayImage} alt="" width={500} height={500} />
                <div className="product-details">
                    
                    {/*product title */}
                    <Link className="title" href={``}><div>{title} - {selectedColor}</div></Link>

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
        

                         <div className='quantity'><p>quantity: {productQuantity}</p></div>
                    </div>
                  {/*quantity & price section end*/}
                </div>
            </div>


        </>
    )
}

export default CartItem