
'use client'

//hook
import { useAppDispatch } from "../lib/hook";
import Link from "next/link";
import Image from "next/image";
//action
import { AddToCart } from "../lib/features/cartSlice";
import { cartItem } from "@/app/types/SliceTypes";

interface demoType {
  data: cartItem,
  productInCart: boolean,
  hasSize: boolean,
  selectedSize: string
}

const AddToCartButton: React.FC<demoType> = ({ data, productInCart, hasSize, selectedSize }) => {


  //destructure the product object
  const { _id, discountPrice, productQuantity, title, slug, images } = data;

  const dispatch = useAppDispatch();

  //add product to the cart in the redux store 
  const AddProductToCart = () => {
    if (hasSize && selectedSize.length === 0) {
      return alert("please select a size");
    }
    dispatch(AddToCart({ _id, discountPrice, productQuantity, title, slug, images, selectedSize }))
  }


  return (
    <>
      {/*if the current singleproduct is aleready on cart render link if not then AddToCart component*/}
      {productInCart ?
        <>
          <Link href={`/checkout/cart`}> <button className="go-to-cart" >GO TO CART</button> </Link>
          <Link className="whatsapp-btn" href="https://api.whatsapp.com/send?phone=8801600930467" target="blank"> <Image src="/whatsapp.png" alt="" width={30} height={30} /> Whatsapp us</Link>
        </>
        :
        <>
          <button className="add-to-cart" onClick={AddProductToCart}>ADD TO CART</button>
          <Link className="whatsapp-btn" href="https://api.whatsapp.com/send?phone=8801600930467" target="blank"> <Image src="/whatsapp.png" alt="" width={30} height={30} /> Whatsapp us</Link>
        </>

      }

    </>
  )
}

export default AddToCartButton