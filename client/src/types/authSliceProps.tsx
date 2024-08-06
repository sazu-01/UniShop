
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
}


//define login credentials interface
export interface loginCredentilas {
    email: string,
    password: string
}