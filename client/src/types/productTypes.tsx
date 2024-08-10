
//define single product interface
export interface singleProductType {
    title : string,
    price : number,
    brand : string,
    category : {slug : string},
    images : string[],
    quantity : number
}