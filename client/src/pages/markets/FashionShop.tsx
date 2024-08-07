//layout
import TopHeader from "../../layouts/TopHeader";
import MiddleHeader from "../../layouts/MiddleHeader";
import BottomHeader from "../../layouts/BottomHeader";
import FashionCover from "../../layouts/FashionCover";
import FashionProducts from "../../components/FashionProducts";


const FashionShop = () => {
  
  return (
    <>
      <TopHeader bgColor="#111" color="#fff" />
      <MiddleHeader />
      <BottomHeader />
      <FashionCover />
      <FashionProducts />
    </>
  );
};

export default FashionShop;
