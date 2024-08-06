//layout
import TopHeader from "../layouts/TopHeader";
import MiddleHeader from "../layouts/MiddleHeader";
import BottomHeader from "../layouts/BottomHeader";
import FashionCover from "../layouts/FashionCover";


const FashionShop = () => {
  
  return (
    <>
      <TopHeader bgColor="#111" color="#fff" />
      <MiddleHeader />
      <BottomHeader />
      <FashionCover />
    </>
  );
};

export default FashionShop;
