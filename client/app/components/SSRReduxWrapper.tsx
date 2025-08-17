

"use client";

import { useEffect } from "react";
import { useAppDispatch } from "../lib/hook";
import { setProductsFromSSR } from "../lib/features/productSlice";
import { ProductType } from "../types/SliceTypes";

type Props = {
  products: ProductType[];
  children: React.ReactNode;
};

const SSRReduxWrapper = ({ products, children }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Hydrate Redux with SSR data
    if (products && products.length > 0) {
      dispatch(setProductsFromSSR(products));
    }
  }, [products, dispatch]);

  return <>{children}</>;
};

export default SSRReduxWrapper;