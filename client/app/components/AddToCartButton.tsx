
// 'use client'

// //hook
// import { useAppDispatch } from "../lib/hook";
// import Link from "next/link";
// //action
// import { AddToCart } from "../lib/features/cartSlice";
// import { cartItem } from "@/app/types/SliceTypes";

// interface demoType {
//   data: cartItem,
//   productInCart: boolean,
//   hasSize: boolean,
//   selectedSize: string
// }

// const AddToCartButton: React.FC<demoType> = ({ data, productInCart, hasSize, selectedSize }) => {


//   //destructure the product object
//   const { _id, discountPrice, productQuantity, title, slug, images } = data;

//   const dispatch = useAppDispatch();

//   const createFlyingImage = (e: React.MouseEvent<HTMLButtonElement>) => {
//     // Get the clicked button position
//     const button = e.currentTarget;
//     const buttonRect = button.getBoundingClientRect();
    
//     // Find ONLY the fixed cart icon
//     const fixedCart = document.querySelector('#fixed-cart');
//     if (!fixedCart) return;
    
//     const cartRect = fixedCart.getBoundingClientRect();
    
//     // Create flying image element
//     const flyingImg = document.createElement('img');
//     flyingImg.src = images[0].url[0];
//     flyingImg.style.cssText = `
//       position: fixed;
//       width: 80px;
//       height: 80px;
//       object-fit: cover;
//       border-radius: 8px;
//       z-index: 9999;
//       pointer-events: none;
//       transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//       left: ${buttonRect.left}px;
//       top: ${buttonRect.top}px;
//       opacity: 1;
//       box-shadow: 0 4px 12px rgba(0,0,0,0.3);
//     `;
    
//     document.body.appendChild(flyingImg);
    
//     // Trigger animation after a small delay
//     setTimeout(() => {
//       flyingImg.style.left = `${cartRect.left + cartRect.width / 2 - 40}px`;
//       flyingImg.style.top = `${cartRect.top + cartRect.height / 2 - 40}px`;
//       flyingImg.style.opacity = '0';
//       flyingImg.style.transform = 'scale(0.2)';
//     }, 10);
    
//     // Remove element after animation completes
//     setTimeout(() => {
//       document.body.removeChild(flyingImg);
      
//       // Add bounce animation to fixed cart
//       if (fixedCart) {
//         fixedCart.classList.add('cart-bounce-animation');
//         setTimeout(() => fixedCart.classList.remove('cart-bounce-animation'), 500);
//       }
//     }, 850);
//   };

//   //add product to the cart in the redux store 
//   const AddProductToCart = () => {
//     if (hasSize && selectedSize.length === 0) {
//       return alert("please select a size");
//     }
//      // Trigger flying animation
//     createFlyingImage(e);
    
//     // Add to cart after a small delay
//     setTimeout(() => {
//       dispatch(AddToCart({ _id, discountPrice, productQuantity, title, slug, images, selectedSize }));
//     }, 400);
//   }


//   return (
//     <>
//       {/*if the current singleproduct is aleready on cart render link if not then AddToCart component*/}
//       {productInCart ?
//         <>
//           <div className="demo">
//             <Link href={`/checkout/cart`}> <button className="go-to-cart" >GO TO CART</button> </Link>
//           </div>
//         </>
//         :
//         <>
//           <div className="demo">
//             <button className="add-to-cart" onClick={AddProductToCart}>ADD TO CART</button>
//           </div>
//         </>

//       }

//     </>
//   )
// }

// export default AddToCartButton




'use client'
import { useState } from "react";
import { useAppDispatch } from "../lib/hook";
import Link from "next/link";
import { AddToCart } from "../lib/features/cartSlice";
import { cartItem } from "@/app/types/SliceTypes";

interface demoType {
  data: cartItem,
  productInCart: boolean,
  hasSize: boolean,
  selectedSize: string
}

const AddToCartButton: React.FC<demoType> = ({ data, productInCart, hasSize, selectedSize }) => {

    
  const [showMessage, setShowMessage] = useState(false);

  const { _id, discountPrice, productQuantity, title, slug, images, selectedColor } = data;
  const dispatch = useAppDispatch();

const createFlyingImage = (e: React.MouseEvent<HTMLButtonElement>) => {
  const fixedCart = document.querySelector('#fixed-cart');
  if (!fixedCart) return;

  // Try to find the main zoom image (react-inner-image-zoom uses .iiz__img)
  let productImg = document.querySelector('.iiz__img') as HTMLImageElement | null;

  // Fallback to closest product-card image if needed
  if (!productImg) {
    const productCard = e.currentTarget.closest('.product-card');
    productImg = productCard ? (productCard.querySelector('img') as HTMLImageElement | null) : null;
  }

  // Fallback again if still missing
  const imgSrc = productImg ? productImg.src : images[0].url[0];
  const imgRect = productImg
    ? productImg.getBoundingClientRect()
    : e.currentTarget.getBoundingClientRect();

  const cartRect = fixedCart.getBoundingClientRect();

  // Create flying image element
  const flyingImg = document.createElement('img');
  flyingImg.src = imgSrc;
  flyingImg.style.cssText = `
    position: fixed;
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 8px;
    z-index: 9999;
    pointer-events: none;
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    left: ${imgRect.left}px;
    top: ${imgRect.top}px;
    opacity: 1;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  `;
  document.body.appendChild(flyingImg);

  // Animate it toward the cart
  setTimeout(() => {
    flyingImg.style.left = `${cartRect.left + cartRect.width / 2 - 20}px`;
    flyingImg.style.top = `${cartRect.top + cartRect.height / 2 - 20}px`;
    flyingImg.style.opacity = '0';
    flyingImg.style.transform = 'scale(0.2)';
  }, 10);

  // Remove after animation
  setTimeout(() => {
    document.body.removeChild(flyingImg);
    fixedCart.classList.add('cart-bounce-animation');
    setTimeout(() => fixedCart.classList.remove('cart-bounce-animation'), 500);
  }, 850);
};



  const AddProductToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (hasSize && selectedSize.length === 0) {
      return alert("please select a size");
    }
    
    // Trigger flying animation
    createFlyingImage(e);
    
    // Add to cart after a small delay
    setTimeout(() => {
      dispatch(AddToCart({ _id, discountPrice, productQuantity, title, slug, images, selectedSize, selectedColor }));
      setShowMessage(true);
      // Hide message after 2 seconds
      setTimeout(() => setShowMessage(false), 2000);
    }, 400);
  };

  return (
    <>
    {showMessage && (
        <div className="added-to-cart-message">✅ Added to Cart</div>
      )}

      {productInCart ? (
        <div className="demo">
          <Link href={`/checkout/cart`}>
            <button className="go-to-cart">GO TO CART</button>
          </Link>
        </div>
      ) : (
        <div className="demo">
          <button className="add-to-cart" onClick={AddProductToCart}>
            ADD TO CART
          </button>
        </div>
      )}
    </>
  );
};

export default AddToCartButton;