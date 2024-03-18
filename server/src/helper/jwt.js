
import jwt from "jsonwebtoken";


const CreateJsonWebToken = (payload,jwtPrivateKey,expiresIn) => {

    if(typeof payload !== "object" || payload === null){
        throw Error("payload cannot be empty , you have to submit value");
    }

    if(typeof jwtPrivateKey !== "string" || jwtPrivateKey === ""){
        throw Error("jsonkey type have to be a string and cannot be a empty string");
    }

    const options = {expiresIn:expiresIn};

    console.log(payload);

    const jsonwebtoken = jwt.sign(payload,jwtPrivateKey,options);

    return jsonwebtoken;

}

export {CreateJsonWebToken}