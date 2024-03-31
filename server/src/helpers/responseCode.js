
const ErrorResponse = (res,{statusCode=500 , message="internal server error"}) => {
    return res.status(statusCode).json({
       success: false,
       message: message
    })
}

const SuccessResponse = (res,{statusCode=200 , message="success response" , ...rest}) => {

    // Extract any additional payload data, or use an empty object
    const payload = rest.payload || {};

    return res.status(statusCode).json({
        message,
        success: true,
        payload
    })
}

export {ErrorResponse,SuccessResponse}