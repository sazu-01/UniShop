
//packages
import { Link } from "react-router-dom";

//hook
import { useAppDispatch } from "../app/hook";

//action
import { AddToCart } from "../features/cartSlice";
import { cartItem } from "../types/SliceTypes";



const AddToCartButton: React.FC<{ product: cartItem }> = ({ product }) => {

  //destructure the product object
  const { _id, price, quantity, title, slug, images } = product;

  const dispatch = useAppDispatch();

  //add product to the cart in the redux store 
  const AddProductToCart = () => {
    dispatch(AddToCart({ _id, price, quantity, title, slug, images }))
  }
  return (
    <>
      <Link to={`/checkout/cart`}>
        <button className="add-to-cart" onClick={AddProductToCart}>add to cart</button>
      </Link>
    </>
  )
}

export default AddToCartButton