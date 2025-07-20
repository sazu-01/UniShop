
'use client'

//hook
import { useAppDispatch } from "../lib/hook";

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
  const { _id, price, productQuantity, title, slug, images } = data;

  const dispatch = useAppDispatch();

  //add product to the cart in the redux store 
  const AddProductToCart = () => {
    if (hasSize && selectedSize.length === 0) {
      return alert("please select a size");
    }
    dispatch(AddToCart({ _id, price, productQuantity, title, slug, images, selectedSize }))
  }


  return (
    <>
      {/*if the current singleproduct is aleready on cart render link if not then AddToCart component*/}
      {productInCart ?
        <button className="add-to-cart" >GO TO CART</button>
        : <button className="add-to-cart" onClick={AddProductToCart}>ADD TO CART</button>
      }

    </>
  )
}

export default AddToCartButton