
'use client'

//packages
import Link from "next/link";


//hook
import { useAppDispatch } from "../lib/hook";

//action
import { AddToCart } from "../lib/features/cartSlice";
import { cartItem } from "@/app/types/SliceTypes";

interface demoType {
  data: cartItem,
  productInCart : boolean
}

const AddToCartButton: React.FC<demoType> = ({ data, productInCart }) => {


  //destructure the product object
  const { _id, price, productQuantity, title, slug, images, quantity } = data;

  const dispatch = useAppDispatch();

  //add product to the cart in the redux store 
  const AddProductToCart = () => {
    dispatch(AddToCart({ _id, price, productQuantity, title, slug, images, quantity }))
  }
  
  return (
    <>
      {/*if the current singleproduct is aleready on cart render link if not then AddToCart component*/}
      {productInCart ? <Link href={`/checkout/cart`}>
        <button className="add-to-cart" >go to cart</button>
      </Link> : <Link href={`/checkout/cart`}>
        <button className="add-to-cart" onClick={AddProductToCart}>add to cart</button>
      </Link>
      }

    </>
  )
}

export default AddToCartButton