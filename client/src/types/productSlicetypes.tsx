
//define product interface
export interface ProductType {
    _id : string,
    title : string,
    slug : string,
    images : string[],
    description : string,
    category : string,
    brand : string,
    quantity : number,
    price : number,
    status : boolean,
}

//define initialState interface
export interface Products {
    isLoading : boolean,
    products : ProductType[] | null,
    error : string | null
}