
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
    discountPrice : number,
    productQuantity : number,
    title : string,
    slug : any,
    images: string[],
    size : string[],
    color : string[],
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
    suplr : string,
    retailPrice : number,
    salePrice : number,
    discountPrice: number,
    discount: number,
    status : boolean,
    pId: string,
    pType: string,
    size: string[],
    color: string[],
    ytLink: string,
    featured: boolean,
    description: string,
    productQuantity : number,
    specification : {
        key : string,
        value : string
    }[]
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