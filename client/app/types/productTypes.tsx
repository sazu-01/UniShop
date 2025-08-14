
//define single product interface
export interface singleProductType {
    _id : string,
    title : string,
    slug : string | undefined,
    size : string[],
    color: string[],
    discountPrice : number,
    discount : number,
    suplr : string, //supplier
    category : {name: string, slug : string},
    images : [ { color : string, url : string[]}],
    quantity : number,
    pId: string,
    ytLink?: string,
    description?: string,
    specification : {
        key : string, 
        value : string
    }[],
  
}