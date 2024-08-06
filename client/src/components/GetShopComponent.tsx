
//markets
import FashionShop from "../pages/markets/FashionShop";
import MedicineShop from "../pages/markets/MedicineShop";
import ElectronicsShop from "../pages/markets/ElectronicsShop";
import FurnitureShop from "../pages/markets/FurnitureShop";
import PetShop from "../pages/markets/PetShop";
import GroceryShop from "../pages/markets/GroceryShop";


export default function getShopComponent(shopName: any) {
    switch (shopName) {
        case "fashion-shop":
            return <FashionShop />;
        case "medicine-shop":
            return <MedicineShop />;
        case "electronics-shop":
            return <ElectronicsShop />;
        case "furniture-shop":
            return <FurnitureShop />;
        case "pet-shop":
            return <PetShop />;
        case "grocery-shop":
            return <GroceryShop />;
        default:
            return null;
    }
}