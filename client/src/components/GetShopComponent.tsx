
//markets
import FashionShop from "../markets/FashionShop";
import MedicineShop from "../markets/MedicineShop";
import ElectronicsShop from "../markets/ElectronicsShop";
import FurnitureShop from "../markets/FurnitureShop";
import PetShop from "../markets/PetShop";
import GroceryShop from "../markets/GroceryShop";


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
        case "electronics-shop":
            return <ElectronicsShop />;
        case "pet-shop":
            return <PetShop />;
        case "grocery-shop":
            return <GroceryShop />;
        default:
            return null;
    }
}