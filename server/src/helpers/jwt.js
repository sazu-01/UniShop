"use strict";

//import packages
import jwt from "jsonwebtoken";


const CreateJsonWebToken = (payload,jwtPrivateKey,expiresIn) => {

    //if payload type is not an onject null throw an error
    if(typeof payload !== "object" || payload === null){
        throw Error("payload cannot be empty , you have to submit value");
    }

    //if jwtPrivateKey type is not a string or empty throw an error
    if(typeof jwtPrivateKey !== "string" || jwtPrivateKey === ""){
        throw Error("jsonkey type have to be a string and cannot be a empty string");
    }

    const options = {expiresIn:expiresIn};

    //generate a jwt using sign method
    const jsonwebtoken = jwt.sign(payload,jwtPrivateKey,options);

    //return the jwt
    return jsonwebtoken;

}

export {CreateJsonWebToken}