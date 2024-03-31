

export const SetAccessTokenCookie = (res, accessToken) => {
    return res.cookie("accessToken", accessToken, {
        maxAge: 1 * 60 * 1000, //1 minutes
        httpOnly: true,
        //secure: true,
        sameSite: false
    });
}

export const SetRefreshTokenCookie = (res, refreshToken) => {
    return res.cookie("refreshToken", refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
        httpOnly: true,
        //secure: true,
        sameSite: "none",
    });
}