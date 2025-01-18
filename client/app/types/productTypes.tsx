
//define single product interface
export interface singleProductType {
    _id : string,
    title : string,
    slug : string | undefined,
    price : number,
    brand : string,
    category : {slug : string},
    images : string[],
    quantity : number
}