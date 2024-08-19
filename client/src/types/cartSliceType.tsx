

export interface cartItem {
    _id : string,
    price : number,
    quantity : number,
    title : string,
    slug : string | undefined,
    images: string[]
  }
  
export interface stateType {
    cart : cartItem[],
    shipping : string
  }