
//define single product interface
export interface singleProductType {
    _id : string,
    title : string,
    slug : string | undefined,
    size : string[],
    color: string[],
    price : number,
    suplr : string, //supplier
    category : {slug : string},
    images : string[],
    quantity : number,
    pId: string,
    ytLink?: string,
    description?: string,
    specification : {
        key : string, 
        value : string
    }[],
  
}