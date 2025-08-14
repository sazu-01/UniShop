"use client";

import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "@/app/lib/hook";
import Image from "next/image";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { MdOutlineShoppingBag } from "react-icons/md";

//css
import "@/css/MiddleHeader.css";

const MiddleHeader = () => {

  const { user } = useAppSelector((state) => state.auth);
  const { cart } = useAppSelector((state) => state.cart);
  const { products } = useAppSelector((state) => state.products);

  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowResults(value.length > 0);
  };

  const filteredProducts = products?.filter((product) => {
    
    const searchWords = searchTerm.toLowerCase().split(" ");
    const titleWords = product.title.toLowerCase().split(" ");

    return searchWords.some((searchWord) =>
      titleWords.some((titleWord) => titleWord.includes(searchWord))
    );
  });

  const handle = () => {
    setSearchTerm("");
    setShowResults(false);
  };

  

  return (
    <div className="middle-header">
      <div className="middle-header-content">
        <div className="middle-header-logo">
          <Link href={`/`}>unishop</Link>
        </div>

        <div className="middle-header-search-wrapper">
          <input
            type="text"
            className=""
            placeholder="search shirt, trouser, bag..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          {showResults && (
            <div className="search-results-dropdown">
              {filteredProducts !== undefined && filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <Link
                    onClick={handle}
                    href={`/product/${product.slug}`}
                    key={index}
                    className="search-result-item"
                  >
                    <div className="img-div">
                      <Image
                        src={product.images[0].url[0]}
                        alt=""
                        width={50}
                        height={50}
                      />
                      <div className="title-brand">
                        <p>{product.title}</p>

                      </div>
                    </div>

                    <div className="price">
                      <p>TK.{product.discountPrice}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="no-results">No results found</div>
              )}
            </div>
          )}
        </div>

        <div className="middle-header-icons">

          <Link href={user !== null ? `/user/dashboard` : `/login`}>
              {" "}
              <div className="middle-header-user">
                {user !== null ?
                    <Image src={user.image} alt="" width={45} height={45} style={{borderRadius:"50%"}}  /> 
                   : 
                   
                   <FontAwesomeIcon icon={faUser} style={{ fontSize: "1.7rem", color: "#000" }} /> 
                  }
              </div>
            </Link>

          <Link href={`/`}>
            <div className="middle-header-notification">
              <FontAwesomeIcon
                icon={faHeart}
                style={{ fontSize: "2rem", color: "#000" }}
              />
            </div>
          </Link>

          <Link href={`/checkout/cart`}>
            <div className="middle-header-cart">
              <MdOutlineShoppingBag
                style={{ fontSize: "2.3rem", color: "#000" }}
              />
              {cart.length > 0 && <span>{cart.length}</span>}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MiddleHeader;
