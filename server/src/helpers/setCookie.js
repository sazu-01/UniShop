

export const SetAccessTokenCookie = (res, accessToken) => {
    const isProduction = process.env.NODE_ENV === "production";
    return res.cookie("accessToken", accessToken, {
        maxAge: 15 * 60 * 1000, //15 minutes
        httpOnly: true,
        secure: true,
        sameSite: isProduction ? "none" : "lax"
    });
}

export const SetRefreshTokenCookie = (res, refreshToken) => {
    const isProduction = process.env.NODE_ENV === "production";
    return res.cookie("refreshToken", refreshToken, {
        maxAge: 10 * 24 * 60 * 60 * 1000, //10 days
        httpOnly: true,
        secure: true,
        sameSite: isProduction ? "none" : "lax",
    });
}