
/*auth slice types*/

//define user interface
export interface User {
    _id: string,
    name: string,
    email: string,
    phone: number,
    password : string,
    image: string,
    isAdmin: boolean,
    isBanned: boolean
}

//define auth state interface
export interface authState {
    user: any | null,
    isLoading: boolean,
    error: null | string | any,
    isLoggedIn  : boolean,
}


//define login credentials interface
export interface loginCredentilas {
    email: string,
    password: string
}


/*cart slice types */
export interface cartItem {
    _id : string,
    price : number,
    productQuantity : number,
    title : string,
    slug : any,
    images: string[],
  }
  
export interface stateType {
    cart : cartItem[],
    shipping : string
  }


/*category types*/
export interface Category {
    _id : string,
    name : string,
    slug : string
}
  
//define product interface
export interface ProductType {
    _id : string,
    title : string,
    slug : string | undefined,
    images : string[],
    category : Category,
    brand : string,
    inStock : number,
    price : number,
    status : boolean,
    productQuantity : number
}

//define initialState interface
export interface Products {
    isLoading : boolean,
    products : ProductType[] | null,
    error : string | null
}


//product quantity slice type

export interface productQuantity {
    productQuantity: number;
}