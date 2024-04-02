
import { validationResult } from "express-validator";
import { ErrorResponse } from "../helpers/responseCode.js";

const RunValidation = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return ErrorResponse(res,{
                statusCode: 422,
                message: errors.array()[0].msg
            })
        }
       return next();
    } catch (error) {
         next(error)
    }
}

export default RunValidation;