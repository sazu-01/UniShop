
/*auth slice types*/

//define user interface
export interface User {
    _id: string,
    name: string,
    email: string,
    phone: number,
    image: string,
    address: string,
    isAdmin: boolean,
    isBanned: boolean
}

//define auth state interface
export interface authState {
    user: User | null,
    isLoading: boolean,
    error: null | string,
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
    quantity : number,
  }
  
export interface stateType {
    cart : cartItem[],
    shipping : string
  }


/*product slice types */
  
//define product interface
export interface ProductType {
    _id : string,
    title : string,
    slug : string | undefined,
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


//product quantity slice type

export interface productQuantity {
    productQuantity: number;
}